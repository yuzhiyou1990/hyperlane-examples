import { assert, objMap, rootLogger } from '@hyperlane-xyz/utils';
import { buildInterchainAccountApp, } from '../../../../middleware/account/InterchainAccount.js';
import { TxTransformerType } from '../TxTransformerTypes.js';
export class EV5InterchainAccountTxTransformer {
    multiProvider;
    props;
    txTransformerType = TxTransformerType.INTERCHAIN_ACCOUNT;
    logger = rootLogger.child({
        module: 'ica-transformer',
    });
    constructor(multiProvider, props) {
        this.multiProvider = multiProvider;
        this.props = props;
        assert(this.props.config.localRouter, 'Invalid AccountConfig: Cannot retrieve InterchainAccount.');
    }
    async transform(...txs) {
        const transformerChainId = this.multiProvider.getChainId(this.props.chain);
        const txChainsToInnerCalls = txs.reduce((txChainToInnerCalls, { to, data, chainId }) => {
            assert(chainId, 'Invalid PopulatedTransaction: "chainId" is required');
            assert(to, 'Invalid PopulatedTransaction: "to" is required');
            assert(data, 'Invalid PopulatedTransaction: "data" is required');
            assert(chainId === transformerChainId, `Transaction chainId ${chainId} does not match transformer chainId ${transformerChainId}`);
            txChainToInnerCalls[chainId] ||= [];
            txChainToInnerCalls[chainId].push({ to, data });
            return txChainToInnerCalls;
        }, {});
        const interchainAccountApp = buildInterchainAccountApp(this.multiProvider, this.props.chain, this.props.config);
        const transformedTxs = [];
        objMap(txChainsToInnerCalls, async (destination, innerCalls) => {
            transformedTxs.push(await interchainAccountApp.getCallRemote({
                chain: this.props.chain,
                destination,
                innerCalls,
                config: this.props.config,
                hookMetadata: this.props.hookMetadata,
            }));
        });
        return transformedTxs;
    }
}
//# sourceMappingURL=EV5InterchainAccountTxTransformer.js.map