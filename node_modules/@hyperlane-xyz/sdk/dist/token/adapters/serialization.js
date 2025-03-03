import { PublicKey } from '@solana/web3.js';
import { SealevelInterchainGasPaymasterConfig, SealevelInterchainGasPaymasterConfigSchema, } from '../../gas/adapters/serialization.js';
import { SealevelAccountDataWrapper, SealevelInstructionWrapper, getSealevelAccountDataSchema, } from '../../utils/sealevelSerialization.js';
/**
 * Hyperlane Token Borsh Schema
 */
// Should match https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/sealevel/libraries/hyperlane-sealevel-token/src/accounts.rs#L25C12-L25C26
export class SealevelHyperlaneTokenData {
    fields;
    /// The bump seed for this PDA.
    bump;
    /// The address of the mailbox contract.
    mailbox;
    mailbox_pubkey;
    /// The Mailbox process authority specific to this program as the recipient.
    mailbox_process_authority;
    mailbox_process_authority_pubkey;
    /// The dispatch authority PDA's bump seed.
    dispatch_authority_bump;
    /// The decimals of the local token.
    decimals;
    /// The decimals of the remote token.
    remote_decimals;
    /// Access control owner.
    owner;
    owner_pub_key;
    /// The interchain security module.
    interchain_security_module;
    interchain_security_module_pubkey;
    // The interchain gas paymaster
    interchain_gas_paymaster;
    interchain_gas_paymaster_pubkey;
    interchain_gas_paymaster_account_pubkey;
    // Gas amounts by destination
    destination_gas;
    /// Remote routers.
    remote_routers;
    remote_router_pubkeys;
    constructor(fields) {
        this.fields = fields;
        Object.assign(this, fields);
        this.mailbox_pubkey = new PublicKey(this.mailbox);
        this.mailbox_pubkey = new PublicKey(this.mailbox_process_authority);
        this.owner_pub_key = this.owner ? new PublicKey(this.owner) : undefined;
        this.interchain_security_module_pubkey = this.interchain_security_module
            ? new PublicKey(this.interchain_security_module)
            : undefined;
        this.interchain_gas_paymaster_pubkey = this.interchain_gas_paymaster
            ?.program_id
            ? new PublicKey(this.interchain_gas_paymaster.program_id)
            : undefined;
        this.interchain_gas_paymaster_account_pubkey = this.interchain_gas_paymaster
            ?.igp_account
            ? new PublicKey(this.interchain_gas_paymaster.igp_account)
            : undefined;
        this.remote_router_pubkeys = new Map();
        if (this.remote_routers) {
            for (const [k, v] of this.remote_routers.entries()) {
                this.remote_router_pubkeys.set(k, new PublicKey(v));
            }
        }
    }
}
export const SealevelHyperlaneTokenDataSchema = new Map([
    [
        SealevelAccountDataWrapper,
        getSealevelAccountDataSchema(SealevelHyperlaneTokenData),
    ],
    [
        SealevelHyperlaneTokenData,
        {
            kind: 'struct',
            fields: [
                ['bump', 'u8'],
                ['mailbox', [32]],
                ['mailbox_process_authority', [32]],
                ['dispatch_authority_bump', 'u8'],
                ['decimals', 'u8'],
                ['remote_decimals', 'u8'],
                ['owner', { kind: 'option', type: [32] }],
                ['interchain_security_module', { kind: 'option', type: [32] }],
                [
                    'interchain_gas_paymaster',
                    {
                        kind: 'option',
                        type: SealevelInterchainGasPaymasterConfig,
                    },
                ],
                ['destination_gas', { kind: 'map', key: 'u32', value: 'u64' }],
                ['remote_routers', { kind: 'map', key: 'u32', value: [32] }],
            ],
        },
    ],
    [
        SealevelInterchainGasPaymasterConfig,
        SealevelInterchainGasPaymasterConfigSchema,
    ],
]);
/**
 * Transfer Remote Borsh Schema
 */
// Should match Instruction in https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/rust/sealevel/libraries/hyperlane-sealevel-token/src/instruction.rs
export var SealevelHypTokenInstruction;
(function (SealevelHypTokenInstruction) {
    SealevelHypTokenInstruction[SealevelHypTokenInstruction["Init"] = 0] = "Init";
    SealevelHypTokenInstruction[SealevelHypTokenInstruction["TransferRemote"] = 1] = "TransferRemote";
    SealevelHypTokenInstruction[SealevelHypTokenInstruction["EnrollRemoteRouter"] = 2] = "EnrollRemoteRouter";
    SealevelHypTokenInstruction[SealevelHypTokenInstruction["EnrollRemoteRouters"] = 3] = "EnrollRemoteRouters";
    SealevelHypTokenInstruction[SealevelHypTokenInstruction["SetInterchainSecurityModule"] = 4] = "SetInterchainSecurityModule";
    SealevelHypTokenInstruction[SealevelHypTokenInstruction["TransferOwnership"] = 5] = "TransferOwnership";
})(SealevelHypTokenInstruction || (SealevelHypTokenInstruction = {}));
export class SealevelTransferRemoteInstruction {
    fields;
    destination_domain;
    recipient;
    recipient_pubkey;
    amount_or_id;
    constructor(fields) {
        this.fields = fields;
        Object.assign(this, fields);
        this.recipient_pubkey = new PublicKey(this.recipient);
    }
}
export const SealevelTransferRemoteSchema = new Map([
    [
        SealevelInstructionWrapper,
        {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['data', SealevelTransferRemoteInstruction],
            ],
        },
    ],
    [
        SealevelTransferRemoteInstruction,
        {
            kind: 'struct',
            fields: [
                ['destination_domain', 'u32'],
                ['recipient', [32]],
                ['amount_or_id', 'u256'],
            ],
        },
    ],
]);
//# sourceMappingURL=serialization.js.map