import { assert, eqAddress } from '@hyperlane-xyz/utils';
import { IsmType } from '../types.js';
export const NULL_METADATA = '0x';
export class NullMetadataBuilder {
    multiProvider;
    constructor(multiProvider) {
        this.multiProvider = multiProvider;
    }
    async build(context) {
        if (context.ism.type === IsmType.TRUSTED_RELAYER) {
            const destinationSigner = await this.multiProvider.getSignerAddress(context.message.parsed.destination);
            assert(eqAddress(destinationSigner, context.ism.relayer), `Destination signer ${destinationSigner} does not match trusted relayer ${context.ism.relayer}`);
        }
        return NULL_METADATA;
    }
    static decode(ism) {
        return { ...ism };
    }
}
//# sourceMappingURL=null.js.map