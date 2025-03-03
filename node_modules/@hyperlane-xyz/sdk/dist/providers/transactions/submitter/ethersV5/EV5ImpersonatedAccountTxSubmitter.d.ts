import { TransactionReceipt } from '@ethersproject/providers';
import { Logger } from 'pino';
import { MultiProvider } from '../../../MultiProvider.js';
import { AnnotatedEV5Transaction } from '../../../ProviderType.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
import { EV5JsonRpcTxSubmitter } from './EV5JsonRpcTxSubmitter.js';
import { EV5ImpersonatedAccountTxSubmitterProps } from './types.js';
export declare class EV5ImpersonatedAccountTxSubmitter extends EV5JsonRpcTxSubmitter {
    readonly props: EV5ImpersonatedAccountTxSubmitterProps;
    readonly txSubmitterType: TxSubmitterType;
    protected readonly logger: Logger;
    constructor(multiProvider: MultiProvider, props: EV5ImpersonatedAccountTxSubmitterProps);
    submit(...txs: AnnotatedEV5Transaction[]): Promise<TransactionReceipt[]>;
}
//# sourceMappingURL=EV5ImpersonatedAccountTxSubmitter.d.ts.map