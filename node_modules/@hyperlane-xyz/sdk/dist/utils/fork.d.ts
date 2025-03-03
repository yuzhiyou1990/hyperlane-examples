import { providers } from 'ethers';
import { Address } from '@hyperlane-xyz/utils';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainName } from '../types.js';
export declare enum ANVIL_RPC_METHODS {
    RESET = "anvil_reset",
    IMPERSONATE_ACCOUNT = "anvil_impersonateAccount",
    STOP_IMPERSONATING_ACCOUNT = "anvil_stopImpersonatingAccount",
    NODE_INFO = "anvil_nodeInfo"
}
/**
 * Resets the local node to it's original state (anvil [31337] at block zero).
 */
export declare const resetFork: (anvilIPAddr?: string, anvilPort?: number) => Promise<void>;
/**
 * Forks a chain onto the local node at the latest block of the forked network.
 * @param multiProvider the multiProvider with which to fork the network
 * @param chain the network to fork
 */
export declare const setFork: (multiProvider: MultiProvider, chain: ChainName | number, anvilIPAddr?: string, anvilPort?: number) => Promise<void>;
/**
 * Impersonates an EOA for a provided address.
 * @param address the address to impersonate
 * @returns the impersonated signer
 */
export declare const impersonateAccount: (address: Address, anvilIPAddr?: string, anvilPort?: number) => Promise<providers.JsonRpcSigner>;
/**
 * Stops account impersonation.
 * @param address the address to stop impersonating
 */
export declare const stopImpersonatingAccount: (address: Address, anvilIPAddr?: string, anvilPort?: number) => Promise<void>;
/**
 * Retrieves a local provider. Defaults to DEFAULT_ANVIL_ENDPOINT.
 * @param urlOverride custom URL to overried the default endpoint
 * @returns a local JSON-RPC provider
 */
export declare const getLocalProvider: (anvilIPAddr?: string, anvilPort?: number, urlOverride?: string) => providers.JsonRpcProvider;
//# sourceMappingURL=fork.d.ts.map