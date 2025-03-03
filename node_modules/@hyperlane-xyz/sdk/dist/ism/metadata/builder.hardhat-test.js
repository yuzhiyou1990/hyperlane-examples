import hre from 'hardhat';
import { before } from 'mocha';
import sinon from 'sinon';
import { MerkleTreeHook__factory, } from '@hyperlane-xyz/core';
import { BaseValidator, addressToBytes32, eqAddress, objMap, randomElement, } from '@hyperlane-xyz/utils';
import { testChains } from '../../consts/testChains.js';
import { TestCoreDeployer } from '../../core/TestCoreDeployer.js';
import { TestRecipientDeployer } from '../../core/TestRecipientDeployer.js';
import { HyperlaneProxyFactoryDeployer } from '../../deploy/HyperlaneProxyFactoryDeployer.js';
import { EvmHookModule } from '../../hook/EvmHookModule.js';
import { HookType } from '../../hook/types.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { EvmIsmReader } from '../EvmIsmReader.js';
import { randomIsmConfig } from '../HyperlaneIsmFactory.hardhat-test.js';
import { HyperlaneIsmFactory } from '../HyperlaneIsmFactory.js';
import { BaseMetadataBuilder } from './builder.js';
import { decodeIsmMetadata } from './decode.js';
const MAX_ISM_DEPTH = 5;
const MAX_NUM_VALIDATORS = 10;
const NUM_RUNS = 16;
describe('BaseMetadataBuilder', () => {
    let core;
    let ismFactory;
    const merkleHooks = {};
    let testRecipients;
    let proxyFactoryAddresses;
    let factoryContracts;
    let relayer;
    let validators;
    let metadataBuilder;
    before(async () => {
        [relayer, ...validators] = await hre.ethers.getSigners();
        const multiProvider = MultiProvider.createTestMultiProvider({
            signer: relayer,
        });
        const ismFactoryDeployer = new HyperlaneProxyFactoryDeployer(multiProvider);
        const contractsMap = await ismFactoryDeployer.deploy(multiProvider.mapKnownChains(() => ({})));
        ismFactory = new HyperlaneIsmFactory(contractsMap, multiProvider);
        const coreDeployer = new TestCoreDeployer(multiProvider, ismFactory);
        const recipientDeployer = new TestRecipientDeployer(multiProvider);
        testRecipients = objMap(await recipientDeployer.deploy(Object.fromEntries(testChains.map((c) => [c, {}]))), (_, { testRecipient }) => testRecipient);
        core = await coreDeployer.deployApp();
        const hookConfig = objMap(core.chainMap, () => ({
            type: HookType.MERKLE_TREE,
        }));
        // deploy hooks
        for (const chain of Object.keys(hookConfig)) {
            factoryContracts = contractsMap[chain];
            proxyFactoryAddresses = Object.keys(factoryContracts).reduce((acc, key) => {
                acc[key] =
                    contractsMap[chain][key].address;
                return acc;
            }, {});
            const hookModule = await EvmHookModule.create({
                chain,
                config: hookConfig[chain],
                proxyFactoryFactories: proxyFactoryAddresses,
                coreAddresses: core.getAddresses(chain),
                multiProvider,
            });
            const hookAddress = hookModule.serialize().deployedHook;
            const merkleHook = MerkleTreeHook__factory.connect(hookAddress, multiProvider.getProvider(chain));
            merkleHooks[multiProvider.getDomainId(chain)] = merkleHook;
        }
        metadataBuilder = new BaseMetadataBuilder(core);
        sinon
            .stub(metadataBuilder.multisigMetadataBuilder, 'getS3Checkpoints')
            .callsFake(async (multisigAddresses, match) => {
            const merkleHook = merkleHooks[match.origin];
            const checkpoint = {
                root: await merkleHook.root(),
                merkle_tree_hook_address: addressToBytes32(merkleHook.address),
                index: match.index,
                mailbox_domain: match.origin,
            };
            const checkpointWithId = {
                checkpoint,
                message_id: match.messageId,
            };
            const digest = BaseValidator.messageHash(checkpoint, match.messageId);
            const checkpoints = [];
            for (const validator of multisigAddresses) {
                const signature = await validators
                    .find((s) => eqAddress(s.address, validator))
                    .signMessage(digest);
                checkpoints.push({ value: checkpointWithId, signature });
            }
            return checkpoints;
        });
    });
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('#build', () => {
        let origin;
        let destination;
        let context;
        let metadata;
        beforeEach(async () => {
            origin = randomElement(testChains);
            destination = randomElement(testChains.filter((c) => c !== origin));
            const testRecipient = testRecipients[destination];
            const addresses = validators
                .map((s) => s.address)
                .slice(0, MAX_NUM_VALIDATORS);
            const config = randomIsmConfig(MAX_ISM_DEPTH, addresses, relayer.address);
            const deployedIsm = await ismFactory.deploy({
                destination,
                config,
                mailbox: core.getAddresses(destination).mailbox,
            });
            await testRecipient.setInterchainSecurityModule(deployedIsm.address);
            const merkleHookAddress = merkleHooks[core.multiProvider.getDomainId(origin)].address;
            const { dispatchTx, message } = await core.sendMessage(origin, destination, testRecipient.address, '0xdeadbeef', merkleHookAddress);
            const derivedIsm = await new EvmIsmReader(core.multiProvider, destination).deriveIsmConfig(deployedIsm.address);
            context = {
                hook: {
                    type: HookType.MERKLE_TREE,
                    address: merkleHookAddress,
                },
                ism: derivedIsm,
                message,
                dispatchTx,
            };
            metadata = await metadataBuilder.build(context, MAX_ISM_DEPTH);
        });
        for (let i = 0; i < NUM_RUNS; i++) {
            it(`should build valid metadata for random ism config (${i})`, async () => {
                // must call process for trusted relayer to be able to verify
                await core
                    .getContracts(destination)
                    .mailbox.process(metadata, context.message.message);
            });
            it(`should decode metadata for random ism config (${i})`, async () => {
                decodeIsmMetadata(metadata, context);
            });
        }
    });
});
//# sourceMappingURL=builder.hardhat-test.js.map