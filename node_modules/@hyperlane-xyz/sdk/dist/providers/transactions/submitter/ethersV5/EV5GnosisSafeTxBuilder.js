import { assert } from '@hyperlane-xyz/utils';
// prettier-ignore
// @ts-ignore
import { getSafe, getSafeService } from '../../../../utils/gnosisSafe.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
import { EV5GnosisSafeTxSubmitter } from './EV5GnosisSafeTxSubmitter.js';
/**
 * This class is used to create a Safe Transaction Builder compatible object.
 * It is not a true Submitter because it does not submits any transactions.
 */
export class EV5GnosisSafeTxBuilder extends EV5GnosisSafeTxSubmitter {
    multiProvider;
    props;
    txSubmitterType = TxSubmitterType.GNOSIS_TX_BUILDER;
    constructor(multiProvider, props, safe, safeService) {
        super(multiProvider, props, safe, safeService);
        this.multiProvider = multiProvider;
        this.props = props;
    }
    static async create(multiProvider, props) {
        const { chain, safeAddress } = props;
        const { gnosisSafeTransactionServiceUrl } = multiProvider.getChainMetadata(chain);
        assert(gnosisSafeTransactionServiceUrl, `Must set gnosisSafeTransactionServiceUrl in the Registry metadata for ${chain}`);
        const safe = await getSafe(chain, multiProvider, safeAddress);
        const safeService = await getSafeService(chain, multiProvider);
        return new EV5GnosisSafeTxBuilder(multiProvider, props, safe, safeService);
    }
    /**
     * Creates a Gnosis Safe transaction builder object using the PopulatedTransactions
     *
     * @param txs - An array of populated transactions
     */
    async submit(...txs) {
        const chainId = this.multiProvider.getChainId(this.props.chain);
        const transactions = await Promise.all(txs.map(async (tx) => (await this.createSafeTransaction(tx)).data));
        return {
            version: this.props.version,
            chainId: chainId.toString(),
            meta: {},
            transactions,
        };
    }
}
//# sourceMappingURL=EV5GnosisSafeTxBuilder.js.map