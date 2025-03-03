import { CircleBridgeAdapter, LiquidityLayerRouter, PortalAdapter, Router } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneContracts, HyperlaneContractsMap } from '../../contracts/types.js';
import { ContractVerifier } from '../../deploy/verify/ContractVerifier.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { ProxiedRouterDeployer } from '../../router/ProxiedRouterDeployer.js';
import { RouterConfig } from '../../router/types.js';
import { ChainMap, ChainName } from '../../types.js';
import { LiquidityLayerFactories } from './contracts.js';
export declare enum BridgeAdapterType {
    Circle = "Circle",
    Portal = "Portal"
}
export interface CircleBridgeAdapterConfig {
    type: BridgeAdapterType.Circle;
    tokenMessengerAddress: string;
    messageTransmitterAddress: string;
    usdcAddress: string;
    circleDomainMapping: {
        hyperlaneDomain: number;
        circleDomain: number;
    }[];
}
export interface PortalAdapterConfig {
    type: BridgeAdapterType.Portal;
    portalBridgeAddress: string;
    wormholeDomainMapping: {
        hyperlaneDomain: number;
        wormholeDomain: number;
    }[];
}
export type BridgeAdapterConfig = {
    circle?: CircleBridgeAdapterConfig;
    portal?: PortalAdapterConfig;
};
export type LiquidityLayerConfig = RouterConfig & BridgeAdapterConfig;
export declare class LiquidityLayerDeployer extends ProxiedRouterDeployer<LiquidityLayerConfig, LiquidityLayerFactories> {
    constructor(multiProvider: MultiProvider, contractVerifier?: ContractVerifier, concurrentDeploy?: boolean);
    routerContractName(): string;
    routerContractKey<K extends keyof LiquidityLayerFactories>(_: RouterConfig): K;
    router(contracts: HyperlaneContracts<LiquidityLayerFactories>): Router;
    constructorArgs<K extends keyof LiquidityLayerFactories>(_: string, config: LiquidityLayerConfig): Promise<Parameters<LiquidityLayerFactories[K]['deploy']>>;
    initializeArgs(chain: string, config: LiquidityLayerConfig): Promise<any>;
    enrollRemoteRouters(contractsMap: HyperlaneContractsMap<LiquidityLayerFactories>, configMap: ChainMap<LiquidityLayerConfig>, foreignRouters: ChainMap<Address>): Promise<void>;
    deployContracts(chain: ChainName, config: LiquidityLayerConfig): Promise<HyperlaneContracts<LiquidityLayerFactories>>;
    deployPortalAdapter(chain: ChainName, adapterConfig: PortalAdapterConfig, owner: string, router: LiquidityLayerRouter): Promise<PortalAdapter>;
    deployCircleBridgeAdapter(chain: ChainName, adapterConfig: CircleBridgeAdapterConfig, owner: string, router: LiquidityLayerRouter): Promise<CircleBridgeAdapter>;
}
//# sourceMappingURL=LiquidityLayerRouterDeployer.d.ts.map