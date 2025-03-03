import { GasRouter__factory, Router__factory, } from '@hyperlane-xyz/core';
import { bytes32ToAddress } from '@hyperlane-xyz/utils';
import { BaseEvmAdapter } from '../../app/MultiProtocolApp.js';
export class EvmRouterAdapter extends BaseEvmAdapter {
    chainName;
    multiProvider;
    addresses;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
    }
    interchainSecurityModule() {
        return this.getConnectedContract().interchainSecurityModule();
    }
    owner() {
        return this.getConnectedContract().owner();
    }
    remoteDomains() {
        return this.getConnectedContract().domains();
    }
    async remoteRouter(remoteDomain) {
        const routerAddressesAsBytes32 = await this.getConnectedContract().routers(remoteDomain);
        return bytes32ToAddress(routerAddressesAsBytes32);
    }
    async remoteRouters() {
        const domains = await this.remoteDomains();
        const routers = await Promise.all(domains.map((d) => this.remoteRouter(d)));
        return domains.map((d, i) => ({ domain: d, address: routers[i] }));
    }
    getConnectedContract() {
        return Router__factory.connect(this.addresses.router, this.getProvider());
    }
}
export class EvmGasRouterAdapter extends EvmRouterAdapter {
    async quoteGasPayment(destination) {
        const destDomain = this.multiProvider.getDomainId(destination);
        const amount = await this.getConnectedContract().quoteGasPayment(destDomain);
        return amount.toString();
    }
    getConnectedContract() {
        return GasRouter__factory.connect(this.addresses.router, this.getProvider());
    }
}
//# sourceMappingURL=EvmRouterAdapter.js.map