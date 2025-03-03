import { Router } from '@hyperlane-xyz/core';
import { HyperlaneContracts } from '../../contracts/types.js';
import { ContractVerifier } from '../../deploy/verify/ContractVerifier.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { ProxiedRouterDeployer } from '../../router/ProxiedRouterDeployer.js';
import { RouterConfig } from '../../router/types.js';
import { InterchainQueryFactories } from './contracts.js';
export type InterchainQueryConfig = RouterConfig;
export declare class InterchainQueryDeployer extends ProxiedRouterDeployer<InterchainQueryConfig, InterchainQueryFactories> {
    constructor(multiProvider: MultiProvider, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    routerContractName(): string;
    routerContractKey<K extends keyof InterchainQueryFactories>(): K;
    router(contracts: HyperlaneContracts<InterchainQueryFactories>): Router;
    constructorArgs<K extends keyof InterchainQueryFactories>(_: string, config: RouterConfig): Promise<Parameters<InterchainQueryFactories[K]['deploy']>>;
    initializeArgs(chain: string, config: RouterConfig): Promise<any>;
}
//# sourceMappingURL=InterchainQueryDeployer.d.ts.map