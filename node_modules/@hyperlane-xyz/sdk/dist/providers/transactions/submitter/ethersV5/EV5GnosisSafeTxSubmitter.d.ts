import { SafeTransaction } from '@safe-global/safe-core-sdk-types';
import { Logger } from 'pino';
import { MultiProvider } from '../../../MultiProvider.js';
import { AnnotatedEV5Transaction } from '../../../ProviderType.js';
import { TxSubmitterType } from '../TxSubmitterTypes.js';
import { EV5TxSubmitterInterface } from './EV5TxSubmitterInterface.js';
import { EV5GnosisSafeTxSubmitterProps } from './types.js';
export declare class EV5GnosisSafeTxSubmitter implements EV5TxSubmitterInterface {
    readonly multiProvider: MultiProvider;
    readonly props: EV5GnosisSafeTxSubmitterProps;
    private safe;
    private safeService;
    readonly txSubmitterType: TxSubmitterType;
    protected readonly logger: Logger;
    constructor(multiProvider: MultiProvider, props: EV5GnosisSafeTxSubmitterProps, safe: any, safeService: any);
    static create(multiProvider: MultiProvider, props: EV5GnosisSafeTxSubmitterProps): Promise<EV5GnosisSafeTxSubmitter>;
    createSafeTransaction({ to, data, value, chainId, }: AnnotatedEV5Transaction): Promise<SafeTransaction>;
    submit(...txs: AnnotatedEV5Transaction[]): Promise<any>;
    private proposeIndividualTransactions;
    private proposeSafeTransaction;
}
//# sourceMappingURL=EV5GnosisSafeTxSubmitter.d.ts.map