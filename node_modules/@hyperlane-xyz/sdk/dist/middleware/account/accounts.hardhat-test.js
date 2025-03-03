import { expect } from 'chai';
import { constants } from 'ethers';
import hre from 'hardhat';
import { TestRecipient__factory, } from '@hyperlane-xyz/core';
import { TestChainName } from '../../consts/testChains.js';
import { TestCoreDeployer } from '../../core/TestCoreDeployer.js';
import { HyperlaneProxyFactoryDeployer } from '../../deploy/HyperlaneProxyFactoryDeployer.js';
import { HyperlaneIsmFactory } from '../../ism/HyperlaneIsmFactory.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { InterchainAccount } from './InterchainAccount.js';
import { InterchainAccountChecker } from './InterchainAccountChecker.js';
import { InterchainAccountDeployer } from './InterchainAccountDeployer.js';
describe('InterchainAccounts', async () => {
    const localChain = TestChainName.test1;
    const remoteChain = TestChainName.test2;
    let signer;
    let contracts;
    let local;
    let remote;
    let multiProvider;
    let coreApp;
    let app;
    let config;
    before(async () => {
        [signer] = await hre.ethers.getSigners();
        multiProvider = MultiProvider.createTestMultiProvider({ signer });
        const ismFactoryDeployer = new HyperlaneProxyFactoryDeployer(multiProvider);
        const ismFactory = new HyperlaneIsmFactory(await ismFactoryDeployer.deploy(multiProvider.mapKnownChains(() => ({}))), multiProvider);
        coreApp = await new TestCoreDeployer(multiProvider, ismFactory).deployApp();
        config = coreApp.getRouterConfig(signer.address);
    });
    beforeEach(async () => {
        contracts = await new InterchainAccountDeployer(multiProvider).deploy(config);
        local = contracts[localChain].interchainAccountRouter;
        remote = contracts[remoteChain].interchainAccountRouter;
        app = new InterchainAccount(contracts, multiProvider);
    });
    it('checks', async () => {
        const checker = new InterchainAccountChecker(multiProvider, app, config);
        await checker.check();
        expect(checker.violations.length).to.eql(0);
    });
    it('forwards calls from interchain account', async () => {
        const recipientF = new TestRecipient__factory(signer);
        const recipient = await recipientF.deploy();
        const fooMessage = 'Test';
        const data = recipient.interface.encodeFunctionData('fooBar', [
            1,
            fooMessage,
        ]);
        const icaAddress = await remote['getLocalInterchainAccount(uint32,address,address,address)'](multiProvider.getDomainId(localChain), signer.address, local.address, constants.AddressZero);
        const call = {
            to: recipient.address,
            data,
            value: '0',
        };
        const quote = await local['quoteGasPayment(uint32)'](multiProvider.getDomainId(remoteChain));
        const balanceBefore = await signer.getBalance();
        const config = {
            origin: localChain,
            owner: signer.address,
            localRouter: local.address,
        };
        await app.callRemote({
            chain: localChain,
            destination: remoteChain,
            innerCalls: [call],
            config,
        });
        const balanceAfter = await signer.getBalance();
        await coreApp.processMessages();
        expect(balanceAfter).to.lte(balanceBefore.sub(quote));
        expect(await recipient.lastCallMessage()).to.eql(fooMessage);
        expect(await recipient.lastCaller()).to.eql(icaAddress);
    });
});
//# sourceMappingURL=accounts.hardhat-test.js.map