import { Address, HexString } from '@hyperlane-xyz/utils';
import { BaseEvmAdapter } from '../../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { TypedTransactionReceipt } from '../../providers/ProviderType.js';
import { ChainName } from '../../types.js';
import { HyperlaneCore } from '../HyperlaneCore.js';
import { ICoreAdapter } from './types.js';
export declare class EvmCoreAdapter extends BaseEvmAdapter implements ICoreAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        mailbox: Address;
    };
    core: HyperlaneCore;
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        mailbox: Address;
    });
    extractMessageIds(sourceTx: TypedTransactionReceipt): Array<{
        messageId: string;
        destination: ChainName;
    }>;
    waitForMessageProcessed(messageId: HexString, destination: ChainName, delayMs?: number, maxAttempts?: number): Promise<boolean>;
}
//# sourceMappingURL=EvmCoreAdapter.d.ts.map