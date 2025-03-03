import { Mailbox__factory, ProxyAdmin__factory, ValidatorAnnounce__factory } from '@hyperlane-xyz/core';
import { HyperlaneAddresses } from '../contracts/types.js';
export declare const coreFactories: {
    validatorAnnounce: ValidatorAnnounce__factory;
    proxyAdmin: ProxyAdmin__factory;
    mailbox: Mailbox__factory;
};
export type CoreFactories = typeof coreFactories;
export type CoreAddresses = HyperlaneAddresses<CoreFactories>;
//# sourceMappingURL=contracts.d.ts.map