import { assert, rootLogger } from '@hyperlane-xyz/utils';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
export class EV5JsonRpcTxSubmitter {
    multiProvider;
    props;
    txSubmitterType = TxSubmitterType.JSON_RPC;
    logger = rootLogger.child({
        module: 'json-rpc-submitter',
    });
    constructor(multiProvider, props) {
        this.multiProvider = multiProvider;
        this.props = props;
    }
    async submit(...txs) {
        const receipts = [];
        const submitterChainId = this.multiProvider.getChainId(this.props.chain);
        for (const tx of txs) {
            assert(tx.chainId, 'Invalid PopulatedTransaction: Missing chainId field');
            assert(tx.chainId === submitterChainId, `Transaction chainId ${tx.chainId} does not match submitter chainId ${submitterChainId}`);
            const receipt = await this.multiProvider.sendTransaction(this.props.chain, tx);
            this.logger.debug(`Submitted PopulatedTransaction on ${this.props.chain}: ${receipt.transactionHash}`);
            receipts.push(receipt);
        }
        return receipts;
    }
}
//# sourceMappingURL=EV5JsonRpcTxSubmitter.js.map