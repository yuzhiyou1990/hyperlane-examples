import { Logger } from 'pino';
import { MultiProvider } from '../../../MultiProvider.js';
import { AnnotatedEV5Transaction } from '../../../ProviderType.js';
import { TxTransformerType } from '../TxTransformerTypes.js';
import { EV5TxTransformerInterface } from './EV5TxTransformerInterface.js';
import { EV5InterchainAccountTxTransformerProps } from './types.js';
export declare class EV5InterchainAccountTxTransformer implements EV5TxTransformerInterface {
    readonly multiProvider: MultiProvider;
    readonly props: EV5InterchainAccountTxTransformerProps;
    readonly txTransformerType: TxTransformerType;
    protected readonly logger: Logger;
    constructor(multiProvider: MultiProvider, props: EV5InterchainAccountTxTransformerProps);
    transform(...txs: AnnotatedEV5Transaction[]): Promise<AnnotatedEV5Transaction[]>;
}
//# sourceMappingURL=EV5InterchainAccountTxTransformer.d.ts.map