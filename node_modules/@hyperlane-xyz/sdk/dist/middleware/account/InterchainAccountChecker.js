import { objMap } from '@hyperlane-xyz/utils';
import { ProxiedRouterChecker } from '../../router/ProxiedRouterChecker.js';
export class InterchainAccountChecker extends ProxiedRouterChecker {
    constructor(multiProvider, app, configMap) {
        // The checker does not expect an ISM in it's config.
        // Instead, we set the ISM to match the ISM address from the app.
        const configMapWithIsm = objMap(configMap, (chain, config) => {
            if (config.interchainSecurityModule) {
                throw new Error('Configuration of ISM address not supported in ICA checker');
            }
            return {
                ...config,
                interchainSecurityModule: app.contractsMap[chain].interchainAccountIsm.address,
            };
        });
        super(multiProvider, app, configMapWithIsm);
    }
}
//# sourceMappingURL=InterchainAccountChecker.js.map