import { objMap, rootLogger } from '@hyperlane-xyz/utils';
import { connectContracts, serializeContracts, } from '../contracts/contracts.js';
import { MultiGeneric } from '../utils/MultiGeneric.js';
export class HyperlaneApp extends MultiGeneric {
    multiProvider;
    logger;
    contractsMap;
    constructor(contractsMap, multiProvider, logger = rootLogger.child({ module: 'App' })) {
        const connectedContractsMap = objMap(contractsMap, (chain, contracts) => connectContracts(contracts, multiProvider.getSignerOrProvider(chain)));
        super(connectedContractsMap);
        this.multiProvider = multiProvider;
        this.logger = logger;
        this.contractsMap = connectedContractsMap;
    }
    getContracts(chain) {
        return this.get(chain);
    }
    getAddresses(chain) {
        return serializeContracts(this.get(chain));
    }
}
//# sourceMappingURL=HyperlaneApp.js.map