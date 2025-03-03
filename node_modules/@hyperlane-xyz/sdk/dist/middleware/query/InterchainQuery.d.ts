import { InterchainQueryRouter } from '@hyperlane-xyz/core';
import { HyperlaneAddressesMap, HyperlaneContracts } from '../../contracts/types.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { RouterApp } from '../../router/RouterApps.js';
import { InterchainQueryFactories } from './contracts.js';
export declare class InterchainQuery extends RouterApp<InterchainQueryFactories> {
    router(contracts: HyperlaneContracts<InterchainQueryFactories>): InterchainQueryRouter;
    static fromAddressesMap(addressesMap: HyperlaneAddressesMap<any>, multiProvider: MultiProvider): InterchainQuery;
}
//# sourceMappingURL=InterchainQuery.d.ts.map