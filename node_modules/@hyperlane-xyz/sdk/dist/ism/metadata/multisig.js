import { joinSignature, splitSignature } from 'ethers/lib/utils.js';
import { MerkleTreeHook__factory } from '@hyperlane-xyz/core';
import { assert, bytes32ToAddress, chunk, ensure0x, eqAddress, eqAddressEvm, fromHexString, rootLogger, strip0x, toHexString, } from '@hyperlane-xyz/utils';
import { S3Validator } from '../../aws/validator.js';
import { IsmType } from '../types.js';
const MerkleTreeInterface = MerkleTreeHook__factory.createInterface();
const SIGNATURE_LENGTH = 65;
export class MultisigMetadataBuilder {
    core;
    logger;
    validatorCache = {};
    constructor(core, logger = rootLogger.child({
        module: 'MultisigMetadataBuilder',
    })) {
        this.core = core;
        this.logger = logger;
    }
    async s3Validators(originChain, validators) {
        this.validatorCache[originChain] ??= {};
        const toFetch = validators.filter((v) => !(v in this.validatorCache[originChain]));
        if (toFetch.length > 0) {
            const validatorAnnounce = this.core.getContracts(originChain).validatorAnnounce;
            const storageLocations = await validatorAnnounce.getAnnouncedStorageLocations(toFetch);
            this.logger.debug({ storageLocations }, 'Fetched storage locations');
            const s3Validators = await Promise.all(storageLocations.map((locations) => {
                const latestLocation = locations.slice(-1)[0];
                return S3Validator.fromStorageLocation(latestLocation);
            }));
            this.logger.debug({ s3Validators }, 'Fetched validators');
            toFetch.forEach((validator, index) => {
                this.validatorCache[originChain][validator] = s3Validators[index];
            });
        }
        return validators.map((v) => this.validatorCache[originChain][v]);
    }
    async getS3Checkpoints(validators, match) {
        this.logger.debug({ match, validators }, 'Fetching checkpoints');
        const originChain = this.core.multiProvider.getChainName(match.origin);
        const s3Validators = await this.s3Validators(originChain, validators);
        const results = await Promise.allSettled(s3Validators.map((v) => v.getCheckpoint(match.index)));
        results
            .filter((r) => r.status === 'rejected')
            .forEach((r) => {
            this.logger.error({ error: r }, 'Failed to fetch checkpoint');
        });
        const checkpoints = results
            .filter((result) => result.status === 'fulfilled' && result.value !== undefined)
            .map((result) => result.value);
        this.logger.debug({ checkpoints }, 'Fetched checkpoints');
        if (checkpoints.length < validators.length) {
            this.logger.debug({ checkpoints, validators, match }, `Found ${checkpoints.length} checkpoints out of ${validators.length} validators`);
        }
        const matchingCheckpoints = checkpoints.filter(({ value }) => eqAddress(bytes32ToAddress(value.checkpoint.merkle_tree_hook_address), match.merkleTree) &&
            value.message_id === match.messageId &&
            value.checkpoint.index === match.index &&
            value.checkpoint.mailbox_domain === match.origin);
        if (matchingCheckpoints.length !== checkpoints.length) {
            this.logger.warn({ matchingCheckpoints, checkpoints, match }, 'Mismatched checkpoints');
        }
        return matchingCheckpoints;
    }
    async build(context) {
        assert(context.ism.type === IsmType.MESSAGE_ID_MULTISIG, 'Merkle proofs are not yet supported');
        const merkleTree = context.hook.address;
        const matchingInsertion = context.dispatchTx.logs
            .filter((log) => eqAddressEvm(log.address, merkleTree))
            .map((log) => MerkleTreeInterface.parseLog(log))
            .find((event) => event.args.messageId === context.message.id);
        assert(matchingInsertion, `No merkle tree insertion of ${context.message.id} to ${merkleTree} found in dispatch tx`);
        this.logger.debug({ matchingInsertion }, 'Found matching insertion event');
        const checkpoints = await this.getS3Checkpoints(context.ism.validators, {
            origin: context.message.parsed.origin,
            messageId: context.message.id,
            merkleTree,
            index: matchingInsertion.args.index,
        });
        assert(checkpoints.length >= context.ism.threshold, `Only ${checkpoints.length} of ${context.ism.threshold} required checkpoints found`);
        this.logger.debug({ checkpoints }, `Found ${checkpoints.length} checkpoints for message ${context.message.id}`);
        const signatures = checkpoints
            .map((checkpoint) => checkpoint.signature)
            .slice(0, context.ism.threshold);
        this.logger.debug({ signatures, ism: context.ism }, `Taking ${signatures.length} (threshold) signatures for message ${context.message.id}`);
        const metadata = {
            type: IsmType.MESSAGE_ID_MULTISIG,
            checkpoint: checkpoints[0].value.checkpoint,
            signatures,
        };
        return MultisigMetadataBuilder.encode(metadata);
    }
    static encodeSimplePrefix(metadata) {
        const checkpoint = metadata.checkpoint;
        const buf = Buffer.alloc(68);
        buf.write(strip0x(checkpoint.merkle_tree_hook_address), 0, 32, 'hex');
        buf.write(strip0x(checkpoint.root), 32, 32, 'hex');
        buf.writeUInt32BE(checkpoint.index, 64);
        return toHexString(buf);
    }
    static decodeSimplePrefix(metadata) {
        const buf = fromHexString(metadata);
        const merkleTree = toHexString(buf.subarray(0, 32));
        const root = toHexString(buf.subarray(32, 64));
        const index = buf.readUint32BE(64);
        const checkpoint = {
            root,
            index,
            merkle_tree_hook_address: merkleTree,
        };
        return {
            signatureOffset: 68,
            type: IsmType.MESSAGE_ID_MULTISIG,
            checkpoint,
        };
    }
    static encodeProofPrefix(metadata) {
        const checkpoint = metadata.checkpoint;
        const buf = Buffer.alloc(1096);
        buf.write(strip0x(checkpoint.merkle_tree_hook_address), 0, 32, 'hex');
        buf.writeUInt32BE(metadata.proof.index, 32);
        buf.write(strip0x(metadata.proof.leaf.toString()), 36, 32, 'hex');
        const branchEncoded = metadata.proof.branch
            .map((b) => strip0x(b.toString()))
            .join('');
        buf.write(branchEncoded, 68, 32 * 32, 'hex');
        buf.writeUint32BE(checkpoint.index, 1092);
        return toHexString(buf);
    }
    static decodeProofPrefix(metadata) {
        const buf = fromHexString(metadata);
        const merkleTree = toHexString(buf.subarray(0, 32));
        const messageIndex = buf.readUint32BE(32);
        const signedMessageId = toHexString(buf.subarray(36, 68));
        const branchEncoded = buf.subarray(68, 1092).toString('hex');
        const branch = chunk(branchEncoded, 32 * 2).map((v) => ensure0x(v));
        const signedIndex = buf.readUint32BE(1092);
        const checkpoint = {
            root: '',
            index: messageIndex,
            merkle_tree_hook_address: merkleTree,
        };
        const proof = {
            branch,
            leaf: signedMessageId,
            index: signedIndex,
        };
        return {
            signatureOffset: 1096,
            type: IsmType.MERKLE_ROOT_MULTISIG,
            checkpoint,
            proof,
        };
    }
    static encode(metadata) {
        let encoded = metadata.type === IsmType.MESSAGE_ID_MULTISIG
            ? this.encodeSimplePrefix(metadata)
            : this.encodeProofPrefix(metadata);
        metadata.signatures.forEach((signature) => {
            const encodedSignature = joinSignature(signature);
            assert(fromHexString(encodedSignature).byteLength === SIGNATURE_LENGTH, 'Invalid signature length');
            encoded += strip0x(encodedSignature);
        });
        return encoded;
    }
    static signatureAt(metadata, offset, index) {
        const buf = fromHexString(metadata);
        const start = offset + index * SIGNATURE_LENGTH;
        const end = start + SIGNATURE_LENGTH;
        if (end > buf.byteLength) {
            return undefined;
        }
        return toHexString(buf.subarray(start, end));
    }
    static decode(metadata, type) {
        const prefix = type === IsmType.MERKLE_ROOT_MULTISIG
            ? this.decodeProofPrefix(metadata)
            : this.decodeSimplePrefix(metadata);
        const { signatureOffset: offset, ...values } = prefix;
        const signatures = [];
        for (let i = 0; this.signatureAt(metadata, offset, i); i++) {
            const { r, s, v } = splitSignature(this.signatureAt(metadata, offset, i));
            signatures.push({ r, s, v });
        }
        return {
            signatures,
            ...values,
        };
    }
}
//# sourceMappingURL=multisig.js.map