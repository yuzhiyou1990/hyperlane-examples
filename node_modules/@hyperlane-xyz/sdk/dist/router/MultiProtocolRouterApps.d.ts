import { Address, Domain, ProtocolType } from '@hyperlane-xyz/utils';
import { AdapterClassType, MultiProtocolApp } from '../app/MultiProtocolApp.js';
import { ChainMap, ChainName } from '../types.js';
import { IGasRouterAdapter, IRouterAdapter } from './adapters/types.js';
import { RouterAddress } from './types.js';
export declare class MultiProtocolRouterApp<IAdapterApi extends IRouterAdapter = IRouterAdapter, ContractAddrs extends RouterAddress = RouterAddress> extends MultiProtocolApp<IAdapterApi, ContractAddrs> {
    protocolToAdapter(protocol: ProtocolType): AdapterClassType<IAdapterApi>;
    router(chain: ChainName): Address;
    interchainSecurityModules(): Promise<ChainMap<Address>>;
    owners(): Promise<ChainMap<Address>>;
    remoteRouters(origin: ChainName): Promise<Array<{
        domain: Domain;
        address: Address;
    }>>;
}
export declare class MultiProtocolGasRouterApp<IAdapterApi extends IGasRouterAdapter = IGasRouterAdapter, ContractAddrs extends RouterAddress = RouterAddress> extends MultiProtocolRouterApp<IAdapterApi, ContractAddrs> {
    protocolToAdapter(protocol: ProtocolType): AdapterClassType<IAdapterApi>;
    quoteGasPayment(origin: ChainName, destination: ChainName): Promise<string>;
}
//# sourceMappingURL=MultiProtocolRouterApps.d.ts.map