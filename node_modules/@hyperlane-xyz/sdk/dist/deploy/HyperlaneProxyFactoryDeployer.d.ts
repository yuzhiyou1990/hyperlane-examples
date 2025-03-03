import { HyperlaneContracts } from '../contracts/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainName } from '../types.js';
import { HyperlaneDeployer } from './HyperlaneDeployer.js';
import { ProxyFactoryFactories } from './contracts.js';
import { ContractVerifier } from './verify/ContractVerifier.js';
export declare class HyperlaneProxyFactoryDeployer extends HyperlaneDeployer<{}, ProxyFactoryFactories> {
    constructor(multiProvider: MultiProvider, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    deployContracts(chain: ChainName): Promise<HyperlaneContracts<ProxyFactoryFactories>>;
}
//# sourceMappingURL=HyperlaneProxyFactoryDeployer.d.ts.map