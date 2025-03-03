import { rootLogger } from '@hyperlane-xyz/utils';
import { HyperlaneDeployer } from './HyperlaneDeployer.js';
import { proxyFactoryFactories, proxyFactoryImplementations, } from './contracts.js';
export class HyperlaneProxyFactoryDeployer extends HyperlaneDeployer {
    constructor(multiProvider, contractVerifier, concurrentDeploy = false) {
        super(multiProvider, proxyFactoryFactories, {
            logger: rootLogger.child({ module: 'IsmFactoryDeployer' }),
            contractVerifier,
            concurrentDeploy,
        });
    }
    async deployContracts(chain) {
        const contracts = {};
        for (const factoryName of Object.keys(this.factories)) {
            const factory = await this.deployContract(chain, factoryName, []);
            this.addVerificationArtifacts(chain, [
                {
                    name: proxyFactoryImplementations[factoryName],
                    address: await factory.implementation(),
                    constructorArguments: '',
                    isProxy: true,
                },
            ]);
            contracts[factoryName] = factory;
        }
        return contracts;
    }
}
//# sourceMappingURL=HyperlaneProxyFactoryDeployer.js.map