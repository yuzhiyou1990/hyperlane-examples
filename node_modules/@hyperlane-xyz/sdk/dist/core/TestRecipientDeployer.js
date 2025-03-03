import { TestRecipient__factory } from '@hyperlane-xyz/core';
import { rootLogger } from '@hyperlane-xyz/utils';
import { HyperlaneDeployer } from '../deploy/HyperlaneDeployer.js';
export const testRecipientFactories = {
    testRecipient: new TestRecipient__factory(),
};
export class TestRecipientDeployer extends HyperlaneDeployer {
    constructor(multiProvider, contractVerifier, concurrentDeploy = false) {
        super(multiProvider, testRecipientFactories, {
            logger: rootLogger.child({ module: 'TestRecipientDeployer' }),
            contractVerifier,
            concurrentDeploy,
        });
    }
    async deployContracts(chain, config) {
        this.logger.debug(`Deploying TestRecipient on ${chain}`, config);
        const testRecipient = await this.deployContract(chain, 'testRecipient', []);
        if (config.interchainSecurityModule) {
            this.logger.debug(`Checking TestRecipient ISM on ${chain}`);
            await this.configureIsm(chain, testRecipient, config.interchainSecurityModule, (tr) => tr.interchainSecurityModule(), (tr, ism) => tr.populateTransaction.setInterchainSecurityModule(ism));
        }
        else {
            this.logger.warn(`No ISM config provided for TestRecipient on ${chain}`);
        }
        return {
            testRecipient,
        };
    }
}
//# sourceMappingURL=TestRecipientDeployer.js.map