import { ProxiedRouterDeployer } from './ProxiedRouterDeployer.js';
const DEFAULT_GAS_OVERHEAD = 100000;
export class GasRouterDeployer extends ProxiedRouterDeployer {
    async enrollRemoteRouters(contractsMap, configMap, foreignRouters = {}) {
        await super.enrollRemoteRouters(contractsMap, configMap, foreignRouters);
        this.logger.debug(`Setting enrolled router destination gas...`);
        for (const [chain, contracts] of Object.entries(contractsMap)) {
            const remoteDomains = await this.router(contracts).domains();
            const remoteChains = remoteDomains.map((domain) => this.multiProvider.getChainName(domain));
            const currentConfigs = await Promise.all(remoteDomains.map((domain) => this.router(contracts).destinationGas(domain)));
            const remoteConfigs = remoteDomains
                .map((domain, i) => ({
                domain,
                gas: configMap[remoteChains[i]]?.gas ?? DEFAULT_GAS_OVERHEAD,
            }))
                .filter(({ gas }, index) => !currentConfigs[index].eq(gas));
            if (remoteConfigs.length == 0) {
                continue;
            }
            this.logger.debug(`Set destination gas on ${chain} for ${remoteChains}`);
            await this.multiProvider.handleTx(chain, this.router(contracts)['setDestinationGas((uint32,uint256)[])'](remoteConfigs, this.multiProvider.getTransactionOverrides(chain)));
        }
    }
}
//# sourceMappingURL=GasRouterDeployer.js.map