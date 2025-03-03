import { HexString, ProtocolType } from '@hyperlane-xyz/utils';
import { AdapterClassType, MultiProtocolApp } from '../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../providers/MultiProtocolProvider.js';
import { TypedTransactionReceipt } from '../providers/ProviderType.js';
import { ChainMap, ChainName } from '../types.js';
import { ICoreAdapter } from './adapters/types.js';
import { CoreAddresses } from './contracts.js';
export declare class MultiProtocolCore extends MultiProtocolApp<ICoreAdapter, CoreAddresses> {
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: ChainMap<CoreAddresses>;
    readonly logger: import("pino").default.Logger<never>;
    constructor(multiProvider: MultiProtocolProvider, addresses: ChainMap<CoreAddresses>, logger?: import("pino").default.Logger<never>);
    static fromAddressesMap(addressesMap: ChainMap<CoreAddresses>, multiProvider: MultiProtocolProvider): MultiProtocolCore;
    protocolToAdapter(protocol: ProtocolType): AdapterClassType<ICoreAdapter>;
    extractMessageIds(origin: ChainName, sourceTx: TypedTransactionReceipt): Array<{
        messageId: HexString;
        destination: ChainName;
    }>;
    waitForMessagesProcessed(origin: ChainName, destination: ChainName, sourceTx: TypedTransactionReceipt, delayMs?: number, maxAttempts?: number): Promise<boolean>;
}
//# sourceMappingURL=MultiProtocolCore.d.ts.map