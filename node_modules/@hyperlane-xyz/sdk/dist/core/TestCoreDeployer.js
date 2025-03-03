import { testChains } from '../consts/testChains.js';
import { testCoreConfig } from '../test/testUtils.js';
import { HyperlaneCoreDeployer } from './HyperlaneCoreDeployer.js';
import { TestCoreApp } from './TestCoreApp.js';
export class TestCoreDeployer extends HyperlaneCoreDeployer {
    async deploy() {
        return super.deploy(testCoreConfig(testChains));
    }
    async deployApp() {
        return new TestCoreApp(await this.deploy(), this.multiProvider);
    }
}
//# sourceMappingURL=TestCoreDeployer.js.map