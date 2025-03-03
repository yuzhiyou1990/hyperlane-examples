import { rootLogger } from '@hyperlane-xyz/utils';
import { impersonateAccount, stopImpersonatingAccount, } from '../../../../utils/fork.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
import { EV5JsonRpcTxSubmitter } from './EV5JsonRpcTxSubmitter.js';
export class EV5ImpersonatedAccountTxSubmitter extends EV5JsonRpcTxSubmitter {
    props;
    txSubmitterType = TxSubmitterType.IMPERSONATED_ACCOUNT;
    logger = rootLogger.child({
        module: 'impersonated-account-submitter',
    });
    constructor(multiProvider, props) {
        super(multiProvider, props);
        this.props = props;
    }
    async submit(...txs) {
        const impersonatedAccount = await impersonateAccount(this.props.userAddress);
        this.multiProvider.setSharedSigner(impersonatedAccount);
        const transactionReceipts = await super.submit(...txs);
        await stopImpersonatingAccount(this.props.userAddress);
        return transactionReceipts;
    }
}
//# sourceMappingURL=EV5ImpersonatedAccountTxSubmitter.js.map