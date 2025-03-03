import { constants } from 'ethers';
import { ProxyAdmin__factory, TimelockController__factory, } from '@hyperlane-xyz/core';
import { eqAddress } from '@hyperlane-xyz/utils';
import { HyperlaneRouterDeployer } from './HyperlaneRouterDeployer.js';
import { proxiedFactories, } from './types.js';
export class ProxiedRouterDeployer extends HyperlaneRouterDeployer {
    constructor(multiProvider, factories, options) {
        super(multiProvider, {
            ...factories,
            ...proxiedFactories,
        }, options);
    }
    async deployContracts(chain, config) {
        let proxyAdmin;
        if (config.proxyAdmin?.address) {
            this.logger.debug(`Reusing existing ProxyAdmin at ${config.proxyAdmin.address} for chain ${chain}`);
            proxyAdmin = ProxyAdmin__factory.connect(config.proxyAdmin.address, this.multiProvider.getSigner(chain));
        }
        else {
            this.logger.debug(`A ProxyAdmin config has not been supplied for chain ${chain}, deploying a new contract`);
            proxyAdmin = await this.deployContractFromFactory(chain, this.factories.proxyAdmin, 'proxyAdmin', []);
        }
        let timelockController;
        let adminOwner;
        if (config.timelock) {
            timelockController = await this.deployTimelock(chain, config.timelock);
            adminOwner = timelockController.address;
        }
        else {
            timelockController = TimelockController__factory.connect(constants.AddressZero, this.multiProvider.getProvider(chain));
            adminOwner = config.owner;
        }
        await super.runIfOwner(chain, proxyAdmin, async () => {
            this.logger.debug(`Checking ownership of proxy admin to ${adminOwner}`);
            if (!eqAddress(await proxyAdmin.owner(), adminOwner)) {
                this.logger.debug(`Transferring ownership of proxy admin to ${adminOwner}`);
                return this.multiProvider.handleTx(chain, proxyAdmin.transferOwnership(adminOwner, this.multiProvider.getTransactionOverrides(chain)));
            }
            return;
        });
        const proxiedRouter = await this.deployProxiedContract(chain, this.routerContractKey(config), this.routerContractName(config), proxyAdmin.address, await this.constructorArgs(chain, config), await this.initializeArgs(chain, config));
        return {
            [this.routerContractKey(config)]: proxiedRouter,
            proxyAdmin,
            timelockController,
        };
    }
}
//# sourceMappingURL=ProxiedRouterDeployer.js.map