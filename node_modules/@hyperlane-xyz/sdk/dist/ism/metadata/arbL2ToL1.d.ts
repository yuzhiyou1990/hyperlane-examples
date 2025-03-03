import { ArbitrumProvider, ChildToParentMessageReader, ChildToParentMessageStatus, EventArgs } from '@arbitrum/sdk';
import { L2ToL1TxEvent } from '@arbitrum/sdk/dist/lib/abi/ArbSys.js';
import { BigNumber, BytesLike } from 'ethers';
import { WithAddress } from '@hyperlane-xyz/utils';
import { HyperlaneCore } from '../../core/HyperlaneCore.js';
import { ArbL2ToL1HookConfig } from '../../hook/types.js';
import { ArbL2ToL1IsmConfig } from '../types.js';
import type { MetadataBuilder, MetadataContext } from './types.js';
export type NitroChildToParentTransactionEvent = EventArgs<L2ToL1TxEvent>;
export type ArbL2ToL1Metadata = Omit<NitroChildToParentTransactionEvent, 'hash'> & {
    proof: BytesLike[];
};
export declare class ArbL2ToL1MetadataBuilder implements MetadataBuilder {
    protected readonly core: HyperlaneCore;
    protected readonly logger: import("pino").default.Logger<never>;
    constructor(core: HyperlaneCore, logger?: import("pino").default.Logger<never>);
    build(context: MetadataContext<WithAddress<ArbL2ToL1IsmConfig>, WithAddress<ArbL2ToL1HookConfig>>): Promise<string>;
    buildArbitrumBridgeCalldata(context: MetadataContext<WithAddress<ArbL2ToL1IsmConfig>, WithAddress<ArbL2ToL1HookConfig>>): Promise<ArbL2ToL1Metadata>;
    getWaitingBlocksUntilReady(reader: ChildToParentMessageReader, provider: ArbitrumProvider): Promise<BigNumber>;
    getArbitrumBridgeStatus(reader: ChildToParentMessageReader, provider: ArbitrumProvider): Promise<ChildToParentMessageStatus>;
    getArbitrumOutboxProof(reader: ChildToParentMessageReader, provider: ArbitrumProvider): Promise<string[]>;
    static decode(metadata: string, _: MetadataContext<WithAddress<ArbL2ToL1IsmConfig>>): ArbL2ToL1Metadata;
    static encodeArbL2ToL1Metadata(metadata: ArbL2ToL1Metadata): string;
}
//# sourceMappingURL=arbL2ToL1.d.ts.map