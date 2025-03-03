import { InterchainGasPaymaster, ProxyAdmin, StorageGasOracle } from '@hyperlane-xyz/core';
import { HyperlaneContracts } from '../contracts/types.js';
import { HyperlaneDeployer } from '../deploy/HyperlaneDeployer.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainName } from '../types.js';
import { IgpFactories } from './contracts.js';
import { IgpConfig } from './types.js';
export declare class HyperlaneIgpDeployer extends HyperlaneDeployer<IgpConfig, IgpFactories> {
    constructor(multiProvider: MultiProvider, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    deployInterchainGasPaymaster(chain: ChainName, proxyAdmin: ProxyAdmin, storageGasOracle: StorageGasOracle, config: IgpConfig): Promise<InterchainGasPaymaster>;
    deployStorageGasOracle(chain: ChainName, config: IgpConfig): Promise<StorageGasOracle>;
    deployContracts(chain: ChainName, config: IgpConfig): Promise<HyperlaneContracts<IgpFactories>>;
}
//# sourceMappingURL=HyperlaneIgpDeployer.d.ts.map