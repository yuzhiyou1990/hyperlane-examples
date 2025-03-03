import { IPostDispatchHook, Mailbox, TestRecipient, ValidatorAnnounce } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneContracts } from '../contracts/types.js';
import { HyperlaneDeployer } from '../deploy/HyperlaneDeployer.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { HyperlaneHookDeployer } from '../hook/HyperlaneHookDeployer.js';
import { HookConfig } from '../hook/types.js';
import { HyperlaneIsmFactory } from '../ism/HyperlaneIsmFactory.js';
import { IsmConfig } from '../ism/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../types.js';
import { TestRecipientDeployer } from './TestRecipientDeployer.js';
import { CoreAddresses, CoreFactories } from './contracts.js';
import { CoreConfig } from './types.js';
export declare class HyperlaneCoreDeployer extends HyperlaneDeployer<CoreConfig, CoreFactories> {
    readonly ismFactory: HyperlaneIsmFactory;
    hookDeployer: HyperlaneHookDeployer;
    testRecipient: TestRecipientDeployer;
    constructor(multiProvider: MultiProvider, ismFactory: HyperlaneIsmFactory, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean, chainTimeoutMs?: number);
    cacheAddressesMap(addressesMap: ChainMap<CoreAddresses>): void;
    deployMailbox(chain: ChainName, config: CoreConfig, proxyAdmin: Address): Promise<Mailbox>;
    deployValidatorAnnounce(chain: ChainName, mailboxAddress: string): Promise<ValidatorAnnounce>;
    deployHook(chain: ChainName, config: HookConfig, coreAddresses: Partial<CoreAddresses>): Promise<IPostDispatchHook>;
    deployIsm(chain: ChainName, config: IsmConfig, mailbox: Address): Promise<Address>;
    deployTestRecipient(chain: ChainName, interchainSecurityModule?: IsmConfig): Promise<TestRecipient>;
    deployContracts(chain: ChainName, config: CoreConfig): Promise<HyperlaneContracts<CoreFactories>>;
}
//# sourceMappingURL=HyperlaneCoreDeployer.d.ts.map