import { TestRecipient, TestRecipient__factory } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneDeployer } from '../deploy/HyperlaneDeployer.js';
import { ContractVerifier } from '../deploy/verify/ContractVerifier.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { MailboxClientConfig } from '../router/types.js';
import { ChainName } from '../types.js';
export type TestRecipientConfig = Pick<MailboxClientConfig, 'interchainSecurityModule'>;
export type TestRecipientContracts = {
    testRecipient: TestRecipient;
};
export type TestRecipientAddresses = {
    testRecipient: Address;
};
export declare const testRecipientFactories: {
    testRecipient: TestRecipient__factory;
};
export declare class TestRecipientDeployer extends HyperlaneDeployer<TestRecipientConfig, typeof testRecipientFactories> {
    constructor(multiProvider: MultiProvider, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    deployContracts(chain: ChainName, config: TestRecipientConfig): Promise<TestRecipientContracts>;
}
//# sourceMappingURL=TestRecipientDeployer.d.ts.map