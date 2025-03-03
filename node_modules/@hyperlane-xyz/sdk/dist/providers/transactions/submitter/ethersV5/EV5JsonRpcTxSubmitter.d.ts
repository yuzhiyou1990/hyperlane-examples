import { TransactionReceipt } from '@ethersproject/providers';
import { Logger } from 'pino';
import { MultiProvider } from '../../../MultiProvider.js';
import { AnnotatedEV5Transaction } from '../../../ProviderType.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
import { EV5TxSubmitterInterface } from './EV5TxSubmitterInterface.js';
import { EV5JsonRpcTxSubmitterProps } from './types.js';
export declare class EV5JsonRpcTxSubmitter implements EV5TxSubmitterInterface {
    readonly multiProvider: MultiProvider;
    readonly props: EV5JsonRpcTxSubmitterProps;
    readonly txSubmitterType: TxSubmitterType;
    protected readonly logger: Logger;
    constructor(multiProvider: MultiProvider, props: EV5JsonRpcTxSubmitterProps);
    submit(...txs: AnnotatedEV5Transaction[]): Promise<TransactionReceipt[]>;
}
//# sourceMappingURL=EV5JsonRpcTxSubmitter.d.ts.map