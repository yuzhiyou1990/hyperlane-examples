import { SafeTransactionData } from '@safe-global/safe-core-sdk-types';
import { MultiProvider } from '../../../MultiProvider.js';
import { AnnotatedEV5Transaction } from '../../../ProviderType.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
import { EV5GnosisSafeTxSubmitter } from './EV5GnosisSafeTxSubmitter.js';
import { EV5GnosisSafeTxBuilderProps } from './types.js';
export interface GnosisTransactionBuilderPayload {
    version: string;
    chainId: string;
    meta: {};
    transactions: SafeTransactionData[];
}
/**
 * This class is used to create a Safe Transaction Builder compatible object.
 * It is not a true Submitter because it does not submits any transactions.
 */
export declare class EV5GnosisSafeTxBuilder extends EV5GnosisSafeTxSubmitter {
    readonly multiProvider: MultiProvider;
    readonly props: EV5GnosisSafeTxBuilderProps;
    readonly txSubmitterType: TxSubmitterType;
    constructor(multiProvider: MultiProvider, props: EV5GnosisSafeTxBuilderProps, safe: any, safeService: any);
    static create(multiProvider: MultiProvider, props: EV5GnosisSafeTxBuilderProps): Promise<EV5GnosisSafeTxBuilder>;
    /**
     * Creates a Gnosis Safe transaction builder object using the PopulatedTransactions
     *
     * @param txs - An array of populated transactions
     */
    submit(...txs: AnnotatedEV5Transaction[]): Promise<any>;
}
//# sourceMappingURL=EV5GnosisSafeTxBuilder.d.ts.map