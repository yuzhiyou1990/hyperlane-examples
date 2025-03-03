import { rootLogger } from '@hyperlane-xyz/utils';
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
export class TxSubmitterBuilder {
    currentSubmitter;
    currentTransformers;
    txSubmitterType;
    logger = rootLogger.child({
        module: 'submitter-builder',
    });
    constructor(currentSubmitter, currentTransformers = []) {
        this.currentSubmitter = currentSubmitter;
        this.currentTransformers = currentTransformers;
        this.txSubmitterType = this.currentSubmitter.txSubmitterType;
    }
    /**
     * Sets the current submitter for the builder.
     * @param txSubmitterOrType The submitter to add to the builder
     */
    for(txSubmitter) {
        this.currentSubmitter = txSubmitter;
        return this;
    }
    /**
     * Adds a transformer for the builder.
     * @param txTransformerOrType The transformer to add to the builder
     */
    transform(...txTransformers) {
        this.currentTransformers = txTransformers;
        return this;
    }
    /**
     * Submits a set of transactions to the builder.
     * @param txs The transactions to submit
     */
    async submit(...txs) {
        this.logger.debug(`Submitting ${txs.length} transactions to the ${this.currentSubmitter.txSubmitterType} submitter...`);
        let transformedTxs = txs;
        for (const currentTransformer of this.currentTransformers) {
            transformedTxs = await currentTransformer.transform(...transformedTxs);
            this.logger.debug(`🔄 Transformed ${transformedTxs.length} transactions with the ${currentTransformer.txTransformerType} transformer...`);
        }
        const txReceipts = await this.currentSubmitter.submit(...transformedTxs);
        this.logger.debug(`✅ Successfully submitted ${transformedTxs.length} transactions to the ${this.currentSubmitter.txSubmitterType} submitter.`);
        return txReceipts;
    }
}
//# sourceMappingURL=TxSubmitterBuilder.js.map