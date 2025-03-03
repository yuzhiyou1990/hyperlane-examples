import { Router } from '@hyperlane-xyz/core';
import { HyperlaneContracts } from '../../contracts/types.js';
import { ContractVerifier } from '../../deploy/verify/ContractVerifier.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { ProxiedRouterDeployer } from '../../router/ProxiedRouterDeployer.js';
import { ProxiedRouterConfig, RouterConfig } from '../../router/types.js';
import { ChainName } from '../../types.js';
import { InterchainAccountFactories } from './contracts.js';
export type InterchainAccountConfig = ProxiedRouterConfig;
export declare class InterchainAccountDeployer extends ProxiedRouterDeployer<InterchainAccountConfig, InterchainAccountFactories> {
    constructor(multiProvider: MultiProvider, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    routerContractName(): string;
    routerContractKey<K extends keyof InterchainAccountFactories>(): K;
    router(contracts: HyperlaneContracts<InterchainAccountFactories>): Router;
    constructorArgs<K extends keyof InterchainAccountFactories>(_: string, config: RouterConfig): Promise<Parameters<InterchainAccountFactories[K]['deploy']>>;
    initializeArgs(chain: string, config: RouterConfig): Promise<any>;
    deployContracts(chain: ChainName, config: InterchainAccountConfig): Promise<HyperlaneContracts<InterchainAccountFactories>>;
}
//# sourceMappingURL=InterchainAccountDeployer.d.ts.map