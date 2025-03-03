import { Address, Checkpoint, MerkleProof, S3CheckpointWithId, SignatureLike, WithAddress } from '@hyperlane-xyz/utils';
import { S3Validator } from '../../aws/validator.js';
import { HyperlaneCore } from '../../core/HyperlaneCore.js';
import { MerkleTreeHookConfig } from '../../hook/types.js';
import { ChainName } from '../../types.js';
import { IsmType, MultisigIsmConfig } from '../types.js';
import type { MetadataBuilder, MetadataContext } from './types.js';
interface MessageIdMultisigMetadata {
    type: IsmType.MESSAGE_ID_MULTISIG;
    signatures: SignatureLike[];
    checkpoint: Omit<Checkpoint, 'mailbox_domain'>;
}
interface MerkleRootMultisigMetadata extends Omit<MessageIdMultisigMetadata, 'type'> {
    type: IsmType.MERKLE_ROOT_MULTISIG;
    proof: MerkleProof;
}
export type MultisigMetadata = MessageIdMultisigMetadata | MerkleRootMultisigMetadata;
export declare class MultisigMetadataBuilder implements MetadataBuilder {
    protected readonly core: HyperlaneCore;
    protected readonly logger: import("pino").default.Logger<never>;
    protected validatorCache: Record<ChainName, Record<string, S3Validator>>;
    constructor(core: HyperlaneCore, logger?: import("pino").default.Logger<never>);
    protected s3Validators(originChain: ChainName, validators: string[]): Promise<S3Validator[]>;
    getS3Checkpoints(validators: Address[], match: {
        origin: number;
        merkleTree: Address;
        messageId: string;
        index: number;
    }): Promise<S3CheckpointWithId[]>;
    build(context: MetadataContext<WithAddress<MultisigIsmConfig>, WithAddress<MerkleTreeHookConfig>>): Promise<string>;
    protected static encodeSimplePrefix(metadata: MessageIdMultisigMetadata): string;
    static decodeSimplePrefix(metadata: string): {
        signatureOffset: number;
        type: IsmType;
        checkpoint: {
            root: string;
            index: number;
            merkle_tree_hook_address: string;
        };
    };
    static encodeProofPrefix(metadata: MerkleRootMultisigMetadata): string;
    static decodeProofPrefix(metadata: string): {
        signatureOffset: number;
        type: IsmType;
        checkpoint: {
            root: string;
            index: number;
            merkle_tree_hook_address: string;
        };
        proof: MerkleProof;
    };
    static encode(metadata: MultisigMetadata): string;
    static signatureAt(metadata: string, offset: number, index: number): SignatureLike | undefined;
    static decode(metadata: string, type: IsmType.MERKLE_ROOT_MULTISIG | IsmType.MESSAGE_ID_MULTISIG): MultisigMetadata;
}
export {};
//# sourceMappingURL=multisig.d.ts.map