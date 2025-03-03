import { ProtocolType, objMap, promiseObjAll, } from '@hyperlane-xyz/utils';
import { HyperlaneApp } from '../app/HyperlaneApp.js';
export class RouterApp extends HyperlaneApp {
    foreignDeployments;
    constructor(contractsMap, multiProvider, logger, foreignDeployments = {}) {
        super(contractsMap, multiProvider, logger);
        this.foreignDeployments = foreignDeployments;
    }
    routerAddress(chainName) {
        if (this.multiProvider.getChainMetadata(chainName).protocol ===
            ProtocolType.Ethereum) {
            return this.router(this.contractsMap[chainName]).address;
        }
        return this.foreignDeployments[chainName];
    }
    // check onchain for remote enrollments
    async remoteChains(chainName) {
        const router = this.router(this.contractsMap[chainName]);
        const onchainRemoteChainNames = (await router.domains()).map((domain) => {
            const chainName = this.multiProvider.tryGetChainName(domain);
            if (chainName === null) {
                throw new Error(`Chain name not found for domain: ${domain}`);
            }
            return chainName;
        });
        return onchainRemoteChainNames;
    }
    getSecurityModules() {
        return promiseObjAll(objMap(this.chainMap, (_, contracts) => this.router(contracts).interchainSecurityModule()));
    }
    getOwners() {
        return promiseObjAll(objMap(this.chainMap, (_, contracts) => this.router(contracts).owner()));
    }
}
export class GasRouterApp extends RouterApp {
    async quoteGasPayment(origin, destination) {
        return this.getContracts(origin).router.quoteGasPayment(this.multiProvider.getDomainId(destination));
    }
}
//# sourceMappingURL=RouterApps.js.map