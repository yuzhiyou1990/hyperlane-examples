import { Logger } from 'pino';
import { Annotated, ProtocolType } from '@hyperlane-xyz/utils';
import { ProtocolTypedTransaction } from '../providers/ProviderType.js';
import { ChainNameOrId } from '../types.js';
export type HyperlaneModuleParams<TConfig, TAddressMap extends Record<string, any>> = {
    addresses: TAddressMap;
    chain: ChainNameOrId;
    config: TConfig;
};
export declare abstract class HyperlaneModule<TProtocol extends ProtocolType, TConfig, TAddressMap extends Record<string, any>> {
    protected readonly args: HyperlaneModuleParams<TConfig, TAddressMap>;
    protected abstract readonly logger: Logger;
    protected constructor(args: HyperlaneModuleParams<TConfig, TAddressMap>);
    serialize(): TAddressMap;
    abstract read(): Promise<TConfig>;
    abstract update(config: TConfig): Promise<Annotated<ProtocolTypedTransaction<TProtocol>['transaction']>[]>;
}
//# sourceMappingURL=AbstractHyperlaneModule.d.ts.map