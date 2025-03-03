import type { BigNumber } from 'ethers';
import { Logger } from 'pino';
import { GasRouter, Router } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneApp } from '../app/HyperlaneApp.js';
import { HyperlaneContracts, HyperlaneContractsMap, HyperlaneFactories } from '../contracts/types.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../types.js';
export declare abstract class RouterApp<Factories extends HyperlaneFactories> extends HyperlaneApp<Factories> {
    readonly foreignDeployments: ChainMap<Address>;
    constructor(contractsMap: HyperlaneContractsMap<Factories>, multiProvider: MultiProvider, logger?: Logger, foreignDeployments?: ChainMap<Address>);
    abstract router(contracts: HyperlaneContracts<Factories>): Router;
    routerAddress(chainName: string): Address;
    remoteChains(chainName: string): Promise<ChainName[]>;
    getSecurityModules(): Promise<ChainMap<Address>>;
    getOwners(): Promise<ChainMap<Address>>;
}
export declare abstract class GasRouterApp<Factories extends HyperlaneFactories, R extends GasRouter> extends RouterApp<Factories> {
    abstract router(contracts: HyperlaneContracts<Factories>): R;
    quoteGasPayment(origin: ChainName, destination: ChainName): Promise<BigNumber>;
}
//# sourceMappingURL=RouterApps.d.ts.map