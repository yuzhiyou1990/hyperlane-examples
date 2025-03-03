import { GasRouter } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneContracts, HyperlaneContractsMap, HyperlaneFactories } from '../contracts/types.js';
import { ChainMap } from '../types.js';
import { ProxiedRouterDeployer } from './ProxiedRouterDeployer.js';
import { GasRouterConfig } from './types.js';
export declare abstract class GasRouterDeployer<Config extends GasRouterConfig, Factories extends HyperlaneFactories> extends ProxiedRouterDeployer<Config, Factories> {
    abstract router(contracts: HyperlaneContracts<Factories>): GasRouter;
    enrollRemoteRouters(contractsMap: HyperlaneContractsMap<Factories>, configMap: ChainMap<Config>, foreignRouters?: ChainMap<Address>): Promise<void>;
}
//# sourceMappingURL=GasRouterDeployer.d.ts.map