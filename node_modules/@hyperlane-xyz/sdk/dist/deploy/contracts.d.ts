import { DomainRoutingIsmFactory__factory, StaticAggregationHookFactory__factory, StaticAggregationIsmFactory__factory, StaticMerkleRootMultisigIsmFactory__factory, StaticMerkleRootWeightedMultisigIsmFactory__factory, StaticMessageIdMultisigIsmFactory__factory, StaticMessageIdWeightedMultisigIsmFactory__factory } from '@hyperlane-xyz/core';
export declare const proxyFactoryFactories: {
    staticMerkleRootMultisigIsmFactory: StaticMerkleRootMultisigIsmFactory__factory;
    staticMessageIdMultisigIsmFactory: StaticMessageIdMultisigIsmFactory__factory;
    staticAggregationIsmFactory: StaticAggregationIsmFactory__factory;
    staticAggregationHookFactory: StaticAggregationHookFactory__factory;
    domainRoutingIsmFactory: DomainRoutingIsmFactory__factory;
    staticMerkleRootWeightedMultisigIsmFactory: StaticMerkleRootWeightedMultisigIsmFactory__factory;
    staticMessageIdWeightedMultisigIsmFactory: StaticMessageIdWeightedMultisigIsmFactory__factory;
};
export type ProxyFactoryFactories = typeof proxyFactoryFactories;
type ProxyFactoryImplementations = Record<keyof ProxyFactoryFactories, string>;
export declare const proxyFactoryImplementations: ProxyFactoryImplementations;
export {};
//# sourceMappingURL=contracts.d.ts.map