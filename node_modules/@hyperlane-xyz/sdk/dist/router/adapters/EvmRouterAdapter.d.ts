import { GasRouter, Router } from '@hyperlane-xyz/core';
import { Address, Domain } from '@hyperlane-xyz/utils';
import { BaseEvmAdapter } from '../../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainName } from '../../types.js';
import { IGasRouterAdapter, IRouterAdapter } from './types.js';
export declare class EvmRouterAdapter extends BaseEvmAdapter implements IRouterAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider<any>;
    readonly addresses: {
        router: Address;
    };
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider<any>, addresses: {
        router: Address;
    });
    interchainSecurityModule(): Promise<Address>;
    owner(): Promise<Address>;
    remoteDomains(): Promise<Domain[]>;
    remoteRouter(remoteDomain: Domain): Promise<Address>;
    remoteRouters(): Promise<Array<{
        domain: Domain;
        address: Address;
    }>>;
    getConnectedContract(): Router;
}
export declare class EvmGasRouterAdapter extends EvmRouterAdapter implements IGasRouterAdapter {
    quoteGasPayment(destination: ChainName): Promise<string>;
    getConnectedContract(): GasRouter;
}
//# sourceMappingURL=EvmRouterAdapter.d.ts.map