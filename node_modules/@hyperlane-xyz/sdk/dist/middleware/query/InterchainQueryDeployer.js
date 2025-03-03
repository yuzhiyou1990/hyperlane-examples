import { ethers } from 'ethers';
import { ProxiedRouterDeployer } from '../../router/ProxiedRouterDeployer.js';
import { interchainQueryFactories, } from './contracts.js';
export class InterchainQueryDeployer extends ProxiedRouterDeployer {
    constructor(multiProvider, contractVerifier, concurrentDeploy = false) {
        super(multiProvider, interchainQueryFactories, {
            contractVerifier,
            concurrentDeploy,
        });
    }
    routerContractName() {
        return 'InterchainQueryRouter';
    }
    routerContractKey() {
        return 'interchainQueryRouter';
    }
    router(contracts) {
        return contracts.interchainQueryRouter;
    }
    async constructorArgs(_, config) {
        return [config.mailbox];
    }
    async initializeArgs(chain, config) {
        const owner = await this.multiProvider.getSignerAddress(chain);
        if (typeof config.interchainSecurityModule === 'object') {
            throw new Error('ISM as object unimplemented');
        }
        return [
            config.hook ?? ethers.constants.AddressZero,
            config.interchainSecurityModule ?? ethers.constants.AddressZero,
            owner,
        ];
    }
}
//# sourceMappingURL=InterchainQueryDeployer.js.map