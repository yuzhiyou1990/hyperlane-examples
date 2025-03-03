import { difference, objMap, promiseObjAll, } from '@hyperlane-xyz/utils';
import { BaseCosmWasmAdapter } from '../../app/MultiProtocolApp.js';
export class CosmWasmMultisigAdapter extends BaseCosmWasmAdapter {
    chainName;
    multiProvider;
    addresses;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
    }
    async queryMultisig(msg) {
        const provider = await this.getProvider();
        const response = await provider.queryContractSmart(this.addresses.multisig, msg);
        return response;
    }
    async getConfig(chain) {
        return this.queryMultisig({
            multisig_ism: {
                enrolled_validators: {
                    domain: this.multiProvider.getDomainId(chain),
                },
            },
        });
    }
    prepareMultisig(msg) {
        return {
            contractAddress: this.addresses.multisig,
            msg,
        };
    }
    async configureMultisig(configMap) {
        const configuredMap = await promiseObjAll(objMap(configMap, (origin, _) => this.getConfig(origin)));
        const validatorInstructions = Object.entries(configMap).flatMap(([origin, config]) => {
            const domain = this.multiProvider.getDomainId(origin);
            const configuredSet = new Set(configuredMap[origin].validators);
            const configSet = new Set(config.validators.map((v) => v.address));
            const unenrollList = Array.from(difference(configuredSet, configSet).values());
            const enrollList = Array.from(difference(configSet, configuredSet).values());
            return unenrollList
                .map((validator) => this.prepareMultisig({
                unenroll_validator: {
                    domain,
                    validator,
                },
            }))
                .concat(enrollList.map((validator) => this.prepareMultisig({
                enroll_validator: {
                    set: {
                        domain,
                        validator,
                    },
                },
            })));
        });
        const setThresholds = Object.entries(configMap)
            .filter(([origin, { threshold }]) => threshold !== configuredMap[origin].threshold)
            .map(([origin, config]) => ({
            domain: this.multiProvider.getDomainId(origin),
            threshold: config.threshold,
        }));
        if (setThresholds.length > 0) {
            const thresholdInstruction = this.prepareMultisig({
                set_thresholds: {
                    set: setThresholds,
                },
            });
            return [...validatorInstructions, thresholdInstruction];
        }
        return validatorInstructions;
    }
}
//# sourceMappingURL=CosmWasmMultisigAdapter.js.map