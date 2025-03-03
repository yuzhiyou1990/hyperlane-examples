import { Router } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneContracts, HyperlaneContractsMap, HyperlaneFactories } from '../contracts/types.js';
import { HyperlaneDeployer } from '../deploy/HyperlaneDeployer.js';
import { RouterConfig } from '../router/types.js';
import { ChainMap } from '../types.js';
export declare abstract class HyperlaneRouterDeployer<Config extends RouterConfig, Factories extends HyperlaneFactories> extends HyperlaneDeployer<Config, Factories> {
    abstract router(contracts: HyperlaneContracts<Factories>): Router;
    configureClients(contractsMap: HyperlaneContractsMap<Factories>, configMap: ChainMap<Config>): Promise<void>;
    enrollRemoteRouters(deployedContractsMap: HyperlaneContractsMap<Factories>, _: ChainMap<Config>, foreignRouters?: ChainMap<Address>): Promise<void>;
    transferOwnership(contractsMap: HyperlaneContractsMap<Factories>, configMap: ChainMap<Config>): Promise<void>;
    deploy(configMap: ChainMap<Config>): Promise<HyperlaneContractsMap<Factories>>;
}
//# sourceMappingURL=HyperlaneRouterDeployer.d.ts.map