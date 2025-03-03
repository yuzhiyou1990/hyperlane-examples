import { PublicKey } from '@solana/web3.js';
import { Domain } from '@hyperlane-xyz/utils';
import { SealevelInterchainGasPaymasterConfig } from '../../gas/adapters/serialization.js';
/**
 * Hyperlane Token Borsh Schema
 */
export declare class SealevelHyperlaneTokenData {
    readonly fields: any;
    bump: number;
    mailbox: Uint8Array;
    mailbox_pubkey: PublicKey;
    mailbox_process_authority: Uint8Array;
    mailbox_process_authority_pubkey: PublicKey;
    dispatch_authority_bump: number;
    decimals: number;
    remote_decimals: number;
    owner?: Uint8Array;
    owner_pub_key?: PublicKey;
    interchain_security_module?: Uint8Array;
    interchain_security_module_pubkey?: PublicKey;
    interchain_gas_paymaster?: SealevelInterchainGasPaymasterConfig;
    interchain_gas_paymaster_pubkey?: PublicKey;
    interchain_gas_paymaster_account_pubkey?: PublicKey;
    destination_gas?: Map<Domain, bigint>;
    remote_routers?: Map<Domain, Uint8Array>;
    remote_router_pubkeys: Map<Domain, PublicKey>;
    constructor(fields: any);
}
export declare const SealevelHyperlaneTokenDataSchema: Map<any, any>;
/**
 * Transfer Remote Borsh Schema
 */
export declare enum SealevelHypTokenInstruction {
    Init = 0,
    TransferRemote = 1,
    EnrollRemoteRouter = 2,
    EnrollRemoteRouters = 3,
    SetInterchainSecurityModule = 4,
    TransferOwnership = 5
}
export declare class SealevelTransferRemoteInstruction {
    readonly fields: any;
    destination_domain: number;
    recipient: Uint8Array;
    recipient_pubkey: PublicKey;
    amount_or_id: number;
    constructor(fields: any);
}
export declare const SealevelTransferRemoteSchema: Map<any, any>;
//# sourceMappingURL=serialization.d.ts.map