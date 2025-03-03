import { objFilter, objMap } from '@hyperlane-xyz/utils';
import { IsmType, } from './types.js';
// Convert a MultisigConfig to a MultisigIsmConfig with the specified ISM type
export const multisigConfigToIsmConfig = (type, config) => ({
    type,
    threshold: config.threshold,
    validators: config.validators.map((v) => v.address),
});
// build multisigIsmConfig from multisigConfig
// eg. for { sepolia (local), arbitrumsepolia, scrollsepolia }
// arbitrumsepolia => Ism, scrollsepolia => Ism
export const buildMultisigIsmConfigs = (type, local, chains, multisigConfigs) => {
    return objMap(objFilter(multisigConfigs, (chain, _) => chain !== local && chains.includes(chain)), (_, config) => multisigConfigToIsmConfig(type, config));
};
export const buildAggregationIsmConfigs = (local, chains, multisigConfigs) => {
    return objMap(objFilter(multisigConfigs, (chain, config) => chain !== local && chains.includes(chain)), (_, config) => ({
        type: IsmType.AGGREGATION,
        modules: [
            multisigConfigToIsmConfig(IsmType.MESSAGE_ID_MULTISIG, config),
            multisigConfigToIsmConfig(IsmType.MERKLE_ROOT_MULTISIG, config),
        ],
        threshold: 1,
    }));
};
//# sourceMappingURL=multisig.js.map