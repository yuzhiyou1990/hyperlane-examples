import { Logger } from 'pino';
import { Annotated, ProtocolType } from '@hyperlane-xyz/utils';
import { ProtocolTypedReceipt, ProtocolTypedTransaction } from '../../../ProviderType.js';
import { TxTransformerInterface } from '../../transformer/TxTransformerInterface.js';
import { TxSubmitterInterface } from '../TxSubmitterInterface.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
/**
 * Builds a TxSubmitterBuilder for batch transaction submission.
 *
 * Example use-cases:
 *  const eV5builder = new TxSubmitterBuilder<EV5Transaction, EV5TransactionReceipt>();
 *  let txReceipts = eV5builder.for(
 *    new EV5GnosisSafeTxSubmitter(chainA)
 *  ).transform(
 *    EV5InterchainAccountTxTransformer(chainB)
 *  ).submit(
 *    txs
 *  );
 *  txReceipts = eV5builder.for(
 *    new EV5ImpersonatedAccountTxSubmitter(chainA)
 *  ).submit(txs);
 *  txReceipts = eV5builder.for(
 *    new EV5JsonRpcTxSubmitter(chainC)
 *  ).submit(txs);
 */
export declare class TxSubmitterBuilder<TProtocol extends ProtocolType> implements TxSubmitterInterface<TProtocol> {
    private currentSubmitter;
    private currentTransformers;
    readonly txSubmitterType: TxSubmitterType;
    protected readonly logger: Logger;
    constructor(currentSubmitter: TxSubmitterInterface<TProtocol>, currentTransformers?: TxTransformerInterface<TProtocol>[]);
    /**
     * Sets the current submitter for the builder.
     * @param txSubmitterOrType The submitter to add to the builder
     */
    for(txSubmitter: TxSubmitterInterface<TProtocol>): TxSubmitterBuilder<TProtocol>;
    /**
     * Adds a transformer for the builder.
     * @param txTransformerOrType The transformer to add to the builder
     */
    transform(...txTransformers: TxTransformerInterface<TProtocol>[]): TxSubmitterBuilder<TProtocol>;
    /**
     * Submits a set of transactions to the builder.
     * @param txs The transactions to submit
     */
    submit(...txs: Annotated<ProtocolTypedTransaction<TProtocol>['transaction']>[]): Promise<ProtocolTypedReceipt<TProtocol>['receipt'] | ProtocolTypedReceipt<TProtocol>['receipt'][] | void>;
}
//# sourceMappingURL=TxSubmitterBuilder.d.ts.map