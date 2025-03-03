import { PublicKey } from '@solana/web3.js';
import { Address, HexString } from '@hyperlane-xyz/utils';
import { BaseSealevelAdapter } from '../../app/MultiProtocolApp.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { TypedTransactionReceipt } from '../../providers/ProviderType.js';
import { ChainName } from '../../types.js';
import { ICoreAdapter } from './types.js';
export declare class SealevelCoreAdapter extends BaseSealevelAdapter implements ICoreAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider;
    readonly addresses: {
        mailbox: Address;
    };
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider, addresses: {
        mailbox: Address;
    });
    extractMessageIds(sourceTx: TypedTransactionReceipt): Array<{
        messageId: HexString;
        destination: ChainName;
    }>;
    waitForMessageProcessed(messageId: string, destination: ChainName, delayMs?: number, maxAttempts?: number): Promise<boolean>;
    static parseMessageDispatchLogs(logs: string[]): Array<{
        destination: string;
        messageId: string;
    }>;
    static deriveMailboxInboxPda(mailboxProgramId: string | PublicKey): PublicKey;
    static deriveMailboxOutboxPda(mailboxProgramId: string | PublicKey): PublicKey;
    static deriveMailboxDispatchedMessagePda(mailboxProgramId: string | PublicKey, uniqueMessageAccount: string | PublicKey): PublicKey;
    static deriveMailboxDispatchAuthorityPda(programId: string | PublicKey): PublicKey;
    static deriveMailboxProcessAuthorityPda(mailboxProgramId: string | PublicKey, recipient: string | PublicKey): PublicKey;
    static deriveMailboxMessageProcessedPda(mailboxProgramId: string | PublicKey, messageId: HexString): PublicKey;
}
//# sourceMappingURL=SealevelCoreAdapter.d.ts.map