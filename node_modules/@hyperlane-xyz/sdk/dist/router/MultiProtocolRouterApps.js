import { ProtocolType } from '@hyperlane-xyz/utils';
import { MultiProtocolApp } from '../app/MultiProtocolApp.js';
import { EvmGasRouterAdapter, EvmRouterAdapter, } from './adapters/EvmRouterAdapter.js';
import { SealevelGasRouterAdapter, SealevelRouterAdapter, } from './adapters/SealevelRouterAdapter.js';
export class MultiProtocolRouterApp extends MultiProtocolApp {
    protocolToAdapter(protocol) {
        // Casts are required here to allow for default adapters while still
        // enabling extensible generic types
        if (protocol === ProtocolType.Ethereum)
            return EvmRouterAdapter;
        if (protocol === ProtocolType.Sealevel)
            return SealevelRouterAdapter;
        // TODO cosmos support here
        throw new Error(`No adapter for protocol ${protocol}`);
    }
    router(chain) {
        return this.addresses[chain].router;
    }
    interchainSecurityModules() {
        return this.adapterMap((_, adapter) => adapter.interchainSecurityModule());
    }
    owners() {
        return this.adapterMap((_, adapter) => adapter.owner());
    }
    remoteRouters(origin) {
        return this.adapter(origin).remoteRouters();
    }
}
export class MultiProtocolGasRouterApp extends MultiProtocolRouterApp {
    protocolToAdapter(protocol) {
        // Casts are required here to allow for default adapters while still
        // enabling extensible generic types
        if (protocol === ProtocolType.Ethereum)
            return EvmGasRouterAdapter;
        if (protocol === ProtocolType.Sealevel)
            return SealevelGasRouterAdapter;
        throw new Error(`No adapter for protocol ${protocol}`);
    }
    async quoteGasPayment(origin, destination) {
        return this.adapter(origin).quoteGasPayment(destination);
    }
}
//# sourceMappingURL=MultiProtocolRouterApps.js.map