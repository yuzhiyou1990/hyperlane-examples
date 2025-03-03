import { ChainMap, ChainName } from '../types.js';
import { AggregationIsmConfig, MultisigConfig, MultisigIsmConfig } from './types.js';
export declare const multisigConfigToIsmConfig: (type: MultisigIsmConfig['type'], config: MultisigConfig) => MultisigIsmConfig;
export declare const buildMultisigIsmConfigs: (type: MultisigIsmConfig['type'], local: ChainName, chains: ChainName[], multisigConfigs: ChainMap<MultisigConfig>) => ChainMap<MultisigIsmConfig>;
export declare const buildAggregationIsmConfigs: (local: ChainName, chains: ChainName[], multisigConfigs: ChainMap<MultisigConfig>) => ChainMap<AggregationIsmConfig>;
//# sourceMappingURL=multisig.d.ts.map