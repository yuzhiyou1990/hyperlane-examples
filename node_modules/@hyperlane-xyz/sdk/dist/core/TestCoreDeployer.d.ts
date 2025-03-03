import { HyperlaneContracts } from '../contracts/types.js';
import { ChainMap } from '../types.js';
import { HyperlaneCoreDeployer } from './HyperlaneCoreDeployer.js';
import { TestCoreApp } from './TestCoreApp.js';
import { CoreFactories } from './contracts.js';
export declare class TestCoreDeployer extends HyperlaneCoreDeployer {
    deploy(): Promise<ChainMap<HyperlaneContracts<CoreFactories>>>;
    deployApp(): Promise<TestCoreApp>;
}
//# sourceMappingURL=TestCoreDeployer.d.ts.map