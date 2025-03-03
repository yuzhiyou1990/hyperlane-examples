import { HyperlaneAddresses, HyperlaneContracts, HyperlaneContractsMap, HyperlaneFactories } from '../contracts/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainName } from '../types.js';
import { MultiGeneric } from '../utils/MultiGeneric.js';
export declare class HyperlaneApp<Factories extends HyperlaneFactories> extends MultiGeneric<HyperlaneContracts<Factories>> {
    readonly multiProvider: MultiProvider;
    readonly logger: import("pino").default.Logger<never>;
    readonly contractsMap: HyperlaneContractsMap<Factories>;
    constructor(contractsMap: HyperlaneContractsMap<Factories>, multiProvider: MultiProvider, logger?: import("pino").default.Logger<never>);
    getContracts(chain: ChainName): HyperlaneContracts<Factories>;
    getAddresses(chain: ChainName): HyperlaneAddresses<Factories>;
}
//# sourceMappingURL=HyperlaneApp.d.ts.map