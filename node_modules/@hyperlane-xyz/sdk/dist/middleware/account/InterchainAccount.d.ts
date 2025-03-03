import { PopulatedTransaction } from 'ethers';
import { InterchainAccountRouter } from '@hyperlane-xyz/core';
import { Address } from '@hyperlane-xyz/utils';
import { HyperlaneAddressesMap, HyperlaneContracts, HyperlaneContractsMap } from '../../contracts/types.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { RouterApp } from '../../router/RouterApps.js';
import { ChainName } from '../../types.js';
import { InterchainAccountFactories } from './contracts.js';
import { AccountConfig, GetCallRemoteSettings } from './types.js';
export declare class InterchainAccount extends RouterApp<InterchainAccountFactories> {
    constructor(contractsMap: HyperlaneContractsMap<InterchainAccountFactories>, multiProvider: MultiProvider);
    remoteChains(chainName: string): Promise<ChainName[]>;
    router(contracts: HyperlaneContracts<InterchainAccountFactories>): InterchainAccountRouter;
    static fromAddressesMap(addressesMap: HyperlaneAddressesMap<any>, multiProvider: MultiProvider): InterchainAccount;
    getAccount(destinationChain: ChainName, config: AccountConfig, routerOverride?: Address, ismOverride?: Address): Promise<Address>;
    deployAccount(destinationChain: ChainName, config: AccountConfig, routerOverride?: Address, ismOverride?: Address): Promise<Address>;
    protected getOrDeployAccount(deployIfNotExists: boolean, destinationChain: ChainName, config: AccountConfig, routerOverride?: Address, ismOverride?: Address): Promise<Address>;
    getCallRemote({ chain, destination, innerCalls, config, hookMetadata, }: GetCallRemoteSettings): Promise<PopulatedTransaction>;
    getAccountConfig(chain: ChainName, account: Address): Promise<AccountConfig>;
    callRemote({ chain, destination, innerCalls, config, hookMetadata, }: GetCallRemoteSettings): Promise<void>;
}
export declare function buildInterchainAccountApp(multiProvider: MultiProvider, chain: ChainName, config: AccountConfig): InterchainAccount;
export declare function deployInterchainAccount(multiProvider: MultiProvider, chain: ChainName, config: AccountConfig): Promise<Address>;
//# sourceMappingURL=InterchainAccount.d.ts.map