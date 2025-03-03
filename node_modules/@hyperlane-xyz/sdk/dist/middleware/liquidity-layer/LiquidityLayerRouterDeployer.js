import { ethers } from 'ethers';
import { eqAddress, objFilter, objMap } from '@hyperlane-xyz/utils';
import { ProxiedRouterDeployer } from '../../router/ProxiedRouterDeployer.js';
import { liquidityLayerFactories, } from './contracts.js';
export var BridgeAdapterType;
(function (BridgeAdapterType) {
    BridgeAdapterType["Circle"] = "Circle";
    BridgeAdapterType["Portal"] = "Portal";
})(BridgeAdapterType || (BridgeAdapterType = {}));
export class LiquidityLayerDeployer extends ProxiedRouterDeployer {
    constructor(multiProvider, contractVerifier, concurrentDeploy = false) {
        super(multiProvider, liquidityLayerFactories, {
            contractVerifier,
            concurrentDeploy,
        });
    }
    routerContractName() {
        return 'LiquidityLayerRouter';
    }
    routerContractKey(_) {
        return 'liquidityLayerRouter';
    }
    router(contracts) {
        return contracts.liquidityLayerRouter;
    }
    async constructorArgs(_, config) {
        return [config.mailbox];
    }
    async initializeArgs(chain, config) {
        const owner = await this.multiProvider.getSignerAddress(chain);
        if (typeof config.interchainSecurityModule === 'object') {
            throw new Error('ISM as object unimplemented');
        }
        return [
            config.hook ?? ethers.constants.AddressZero,
            config.interchainSecurityModule ?? ethers.constants.AddressZero,
            owner,
        ];
    }
    async enrollRemoteRouters(contractsMap, configMap, foreignRouters) {
        this.logger.debug(`Enroll LiquidityLayerRouters with each other`);
        await super.enrollRemoteRouters(contractsMap, configMap, foreignRouters);
        this.logger.debug(`Enroll CircleBridgeAdapters with each other`);
        // Hack to allow use of super.enrollRemoteRouters
        await super.enrollRemoteRouters(objMap(objFilter(contractsMap, (_, c) => !!c.circleBridgeAdapter), (_, contracts) => ({
            liquidityLayerRouter: contracts.circleBridgeAdapter,
        })), configMap, foreignRouters);
        this.logger.debug(`Enroll PortalAdapters with each other`);
        // Hack to allow use of super.enrollRemoteRouters
        await super.enrollRemoteRouters(objMap(objFilter(contractsMap, (_, c) => !!c.portalAdapter), (_, contracts) => ({
            liquidityLayerRouter: contracts.portalAdapter,
        })), configMap, foreignRouters);
    }
    // Custom contract deployment logic can go here
    // If no custom logic is needed, call deployContract for the router
    async deployContracts(chain, config) {
        // This is just the temp owner for contracts, and HyperlaneRouterDeployer#transferOwnership actually sets the configured owner
        const deployer = await this.multiProvider.getSignerAddress(chain);
        const routerContracts = await super.deployContracts(chain, config);
        const bridgeAdapters = {};
        if (config.circle) {
            bridgeAdapters.circleBridgeAdapter = await this.deployCircleBridgeAdapter(chain, config.circle, deployer, routerContracts.liquidityLayerRouter);
        }
        if (config.portal) {
            bridgeAdapters.portalAdapter = await this.deployPortalAdapter(chain, config.portal, deployer, routerContracts.liquidityLayerRouter);
        }
        return {
            ...routerContracts,
            ...bridgeAdapters,
        };
    }
    async deployPortalAdapter(chain, adapterConfig, owner, router) {
        const mailbox = await router.mailbox();
        const portalAdapter = await this.deployContract(chain, 'portalAdapter', [mailbox], [owner, adapterConfig.portalBridgeAddress, router.address]);
        for (const { wormholeDomain, hyperlaneDomain, } of adapterConfig.wormholeDomainMapping) {
            const expectedCircleDomain = await portalAdapter.hyperlaneDomainToWormholeDomain(hyperlaneDomain);
            if (expectedCircleDomain === wormholeDomain)
                continue;
            this.logger.debug(`Set wormhole domain ${wormholeDomain} for hyperlane domain ${hyperlaneDomain}`);
            await this.runIfOwner(chain, portalAdapter, () => this.multiProvider.handleTx(chain, portalAdapter.addDomain(hyperlaneDomain, wormholeDomain)));
        }
        if (!eqAddress(await router.liquidityLayerAdapters('Portal'), portalAdapter.address)) {
            this.logger.debug('Set Portal as LiquidityLayerAdapter on Router');
            await this.runIfOwner(chain, portalAdapter, () => this.multiProvider.handleTx(chain, router.setLiquidityLayerAdapter(adapterConfig.type, portalAdapter.address)));
        }
        return portalAdapter;
    }
    async deployCircleBridgeAdapter(chain, adapterConfig, owner, router) {
        const mailbox = await router.mailbox();
        const circleBridgeAdapter = await this.deployContract(chain, 'circleBridgeAdapter', [mailbox], [
            owner,
            adapterConfig.tokenMessengerAddress,
            adapterConfig.messageTransmitterAddress,
            router.address,
        ]);
        if (!eqAddress(await circleBridgeAdapter.tokenSymbolToAddress('USDC'), adapterConfig.usdcAddress)) {
            this.logger.debug(`Set USDC token contract`);
            await this.runIfOwner(chain, circleBridgeAdapter, () => this.multiProvider.handleTx(chain, circleBridgeAdapter.addToken(adapterConfig.usdcAddress, 'USDC')));
        }
        // Set domain mappings
        for (const { circleDomain, hyperlaneDomain, } of adapterConfig.circleDomainMapping) {
            const expectedCircleDomain = await circleBridgeAdapter.hyperlaneDomainToCircleDomain(hyperlaneDomain);
            if (expectedCircleDomain === circleDomain)
                continue;
            this.logger.debug(`Set circle domain ${circleDomain} for hyperlane domain ${hyperlaneDomain}`);
            await this.runIfOwner(chain, circleBridgeAdapter, () => this.multiProvider.handleTx(chain, circleBridgeAdapter.addDomain(hyperlaneDomain, circleDomain)));
        }
        if (!eqAddress(await router.liquidityLayerAdapters('Circle'), circleBridgeAdapter.address)) {
            this.logger.debug('Set Circle as LiquidityLayerAdapter on Router');
            await this.runIfOwner(chain, circleBridgeAdapter, () => this.multiProvider.handleTx(chain, router.setLiquidityLayerAdapter(adapterConfig.type, circleBridgeAdapter.address)));
        }
        return circleBridgeAdapter;
    }
}
//# sourceMappingURL=LiquidityLayerRouterDeployer.js.map