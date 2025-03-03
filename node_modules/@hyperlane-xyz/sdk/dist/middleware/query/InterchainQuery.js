import { appFromAddressesMapHelper } from '../../contracts/contracts.js';
import { RouterApp } from '../../router/RouterApps.js';
import { interchainQueryFactories, } from './contracts.js';
export class InterchainQuery extends RouterApp {
    router(contracts) {
        return contracts.interchainQueryRouter;
    }
    static fromAddressesMap(addressesMap, multiProvider) {
        const helper = appFromAddressesMapHelper(addressesMap, interchainQueryFactories, multiProvider);
        return new InterchainQuery(helper.contractsMap, helper.multiProvider);
    }
}
//# sourceMappingURL=InterchainQuery.js.map