import { WithAddress } from '@hyperlane-xyz/utils';
import { AggregationIsmConfig } from '../types.js';
import type { BaseMetadataBuilder } from './builder.js';
import { MetadataBuilder, MetadataContext, StructuredMetadata } from './types.js';
export interface AggregationMetadata<T = string> {
    type: AggregationIsmConfig['type'];
    submoduleMetadata: Array<T | null>;
}
export declare class AggregationMetadataBuilder implements MetadataBuilder {
    protected readonly base: BaseMetadataBuilder;
    protected logger: import("pino").default.Logger<never>;
    constructor(base: BaseMetadataBuilder);
    build(context: MetadataContext<WithAddress<AggregationIsmConfig>>, maxDepth?: number, timeoutMs?: number): Promise<string>;
    static rangeIndex(index: number): number;
    static encode(metadata: AggregationMetadata<string>): string;
    static metadataRange(metadata: string, index: number): {
        start: number;
        end: number;
        encoded: string;
    };
    static decode(metadata: string, context: MetadataContext<AggregationIsmConfig>): AggregationMetadata<StructuredMetadata | string>;
}
//# sourceMappingURL=aggregation.d.ts.map