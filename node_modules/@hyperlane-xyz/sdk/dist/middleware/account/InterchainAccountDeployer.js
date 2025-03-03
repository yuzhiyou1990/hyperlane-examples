import { ethers } from 'ethers';
import { assert } from '@hyperlane-xyz/utils';
import { ProxiedRouterDeployer } from '../../router/ProxiedRouterDeployer.js';
import { interchainAccountFactories, } from './contracts.js';
export class InterchainAccountDeployer extends ProxiedRouterDeployer {
    constructor(multiProvider, contractVerifier, concurrentDeploy) {
        super(multiProvider, interchainAccountFactories, {
            contractVerifier,
            concurrentDeploy,
        });
    }
    routerContractName() {
        return 'interchainAccountRouter';
    }
    routerContractKey() {
        return 'interchainAccountRouter';
    }
    router(contracts) {
        return contracts.interchainAccountRouter;
    }
    async constructorArgs(_, config) {
        return [config.mailbox];
    }
    async initializeArgs(chain, config) {
        const owner = await this.multiProvider.getSignerAddress(chain);
        if (config.interchainSecurityModule) {
            assert(typeof config.interchainSecurityModule === 'string', 'ISM objects not supported in ICA deployer');
        }
        return [
            config.hook ?? ethers.constants.AddressZero,
            config.interchainSecurityModule,
            owner,
        ];
    }
    async deployContracts(chain, config) {
        if (config.interchainSecurityModule) {
            throw new Error('Configuration of ISM not supported in ICA deployer');
        }
        const interchainAccountIsm = await this.deployContract(chain, 'interchainAccountIsm', [config.mailbox]);
        const modifiedConfig = {
            ...config,
            interchainSecurityModule: interchainAccountIsm.address,
        };
        const contracts = await super.deployContracts(chain, modifiedConfig);
        return {
            ...contracts,
            interchainAccountIsm,
        };
    }
}
//# sourceMappingURL=InterchainAccountDeployer.js.map