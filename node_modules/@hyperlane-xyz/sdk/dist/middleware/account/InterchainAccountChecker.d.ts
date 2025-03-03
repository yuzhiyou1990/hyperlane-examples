import { MultiProvider } from '../../providers/MultiProvider.js';
import { ProxiedRouterChecker } from '../../router/ProxiedRouterChecker.js';
import { ChainMap } from '../../types.js';
import { InterchainAccount } from './InterchainAccount.js';
import { InterchainAccountConfig } from './InterchainAccountDeployer.js';
import { InterchainAccountFactories } from './contracts.js';
export declare class InterchainAccountChecker extends ProxiedRouterChecker<InterchainAccountFactories, InterchainAccount, InterchainAccountConfig> {
    constructor(multiProvider: MultiProvider, app: InterchainAccount, configMap: ChainMap<InterchainAccountConfig>);
}
//# sourceMappingURL=InterchainAccountChecker.d.ts.map