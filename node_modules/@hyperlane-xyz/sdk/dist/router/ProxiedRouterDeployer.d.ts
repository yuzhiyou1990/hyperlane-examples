import { Router } from '@hyperlane-xyz/core';
import { HyperlaneContracts, HyperlaneFactories } from '../contracts/types.js';
import { DeployerOptions } from '../deploy/HyperlaneDeployer.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainName } from '../types.js';
import { HyperlaneRouterDeployer } from './HyperlaneRouterDeployer.js';
import { ProxiedFactories, ProxiedRouterConfig } from './types.js';
export declare abstract class ProxiedRouterDeployer<Config extends ProxiedRouterConfig, Factories extends HyperlaneFactories> extends HyperlaneRouterDeployer<Config, Factories & ProxiedFactories> {
    constructor(multiProvider: MultiProvider, factories: Factories, options?: DeployerOptions);
    abstract router(contracts: HyperlaneContracts<Factories & ProxiedFactories>): Router;
    /**
     * Returns the contract name
     * @param config Router config
     */
    abstract routerContractName(config: Config): string;
    /**
     * Returns the contract key
     * @param config Router config
     */
    abstract routerContractKey(config: Config): keyof Factories;
    /**
     * Returns the constructor arguments for the proxy
     * @param chain Name of chain
     * @param config Router config
     */
    abstract constructorArgs<RouterKey extends keyof Factories>(chain: ChainName, config: Config): Promise<Parameters<Factories[RouterKey]['deploy']>>;
    /**
     * Returns the initialize arguments for the proxy
     * @param chain Name of chain
     * @param config Router config
     */
    abstract initializeArgs<RouterKey extends keyof Factories>(chain: ChainName, config: Config): Promise<Parameters<Awaited<ReturnType<Factories[RouterKey]['deploy']>>['initialize']>>;
    deployContracts(chain: ChainName, config: Config): Promise<HyperlaneContracts<Factories & ProxiedFactories>>;
}
//# sourceMappingURL=ProxiedRouterDeployer.d.ts.map