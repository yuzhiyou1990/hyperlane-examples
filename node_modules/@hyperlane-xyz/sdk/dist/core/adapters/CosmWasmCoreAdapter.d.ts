import { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { Address, HexString } from '@hyperlane-xyz/utils';
import { BaseCosmWasmAdapter } from '../../app/MultiProtocolApp.js';
import { Coin, DefaultHookResponse, DefaultIsmResponse, ExecuteMsg, LatestDispatchedIdResponse, MessageDeliveredResponse, NonceResponse, OwnerResponse, QueryMsg, RequiredHookResponse } from '../../cw-types/Mailbox.types.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { TypedTransactionReceipt } from '../../providers/ProviderType.js';
import { ChainName } from '../../types.js';
import { ICoreAdapter } from './types.js';
type MailboxResponse = DefaultHookResponse | RequiredHookResponse | DefaultIsmResponse | NonceResponse | LatestDispatchedIdResponse | OwnerResponse | MessageDeliveredResponse;
export declare class CosmWasmCoreAdapter extends BaseCosmWasmAdapter implements ICoreAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider<any>;
    readonly addresses: {
        mailbox: Address;
    };
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider<any>, addresses: {
        mailbox: Address;
    });
    prepareMailbox(msg: ExecuteMsg, funds?: Coin[]): ExecuteInstruction;
    initTransferOwner(newOwner: Address): ExecuteInstruction;
    claimTransferOwner(): ExecuteInstruction;
    setDefaultHook(address: Address): ExecuteInstruction;
    setRequiredHook(address: Address): ExecuteInstruction;
    queryMailbox<R extends MailboxResponse>(msg: QueryMsg): Promise<R>;
    defaultHook(): Promise<string>;
    defaultIsm(): Promise<string>;
    requiredHook(): Promise<string>;
    nonce(): Promise<number>;
    latestDispatchedId(): Promise<string>;
    owner(): Promise<string>;
    delivered(id: string): Promise<boolean>;
    extractMessageIds(sourceTx: TypedTransactionReceipt): Array<{
        messageId: string;
        destination: ChainName;
    }>;
    waitForMessageProcessed(_messageId: HexString, _destination: ChainName, _delayMs?: number, _maxAttempts?: number): Promise<boolean>;
}
export {};
//# sourceMappingURL=CosmWasmCoreAdapter.d.ts.map