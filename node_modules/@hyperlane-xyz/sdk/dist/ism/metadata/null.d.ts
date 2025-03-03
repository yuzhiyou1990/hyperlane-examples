import { WithAddress } from '@hyperlane-xyz/utils';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { NullIsmConfig } from '../types.js';
import type { MetadataBuilder, MetadataContext } from './types.js';
export declare const NULL_METADATA = "0x";
export type NullMetadata = {
    type: NullIsmConfig['type'];
};
export declare class NullMetadataBuilder implements MetadataBuilder {
    protected multiProvider: MultiProvider;
    constructor(multiProvider: MultiProvider);
    build(context: MetadataContext<WithAddress<NullIsmConfig>>): Promise<string>;
    static decode(ism: NullIsmConfig): NullMetadata;
}
//# sourceMappingURL=null.d.ts.map