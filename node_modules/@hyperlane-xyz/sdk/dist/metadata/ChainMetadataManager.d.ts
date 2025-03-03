import { Logger } from 'pino';
import { EvmChainId, ProtocolType } from '@hyperlane-xyz/utils';
import { ChainMap, ChainName, ChainNameOrId } from '../types.js';
import { ChainMetadata, ExplorerFamily } from './chainMetadataTypes.js';
export interface ChainMetadataManagerOptions {
    logger?: Logger;
}
/**
 * A set of utilities to manage chain metadata
 * Validates metadata on construction and provides useful methods
 * for interacting with the data
 */
export declare class ChainMetadataManager<MetaExt = {}> {
    readonly metadata: ChainMap<ChainMetadata<MetaExt>>;
    readonly logger: Logger;
    static readonly DEFAULT_MAX_BLOCK_RANGE = 1000;
    /**
     * Create a new ChainMetadataManager with the given chainMetadata,
     * or the SDK's default metadata if not provided
     */
    constructor(chainMetadata: ChainMap<ChainMetadata<MetaExt>>, options?: ChainMetadataManagerOptions);
    /**
     * Add a chain to the MultiProvider
     * @throws if chain's name or domain ID collide
     */
    addChain(metadata: ChainMetadata<MetaExt>): void;
    /**
     * Get the metadata for a given chain name or domain id
     * @throws if chain's metadata has not been set
     */
    tryGetChainMetadata(chainNameOrId: ChainNameOrId): ChainMetadata<MetaExt> | null;
    /**
     * Get the metadata for a given chain name or domain id
     * @throws if chain's metadata has not been set
     */
    getChainMetadata(chainNameOrId: ChainNameOrId): ChainMetadata<MetaExt>;
    getMaxBlockRange(chainNameOrId: ChainNameOrId): number;
    /**
     * Returns true if the given chain name or domain id is
     * included in this manager's metadata, false otherwise
     */
    hasChain(chainNameOrId: ChainNameOrId): boolean;
    /**
     * Get the name for a given chain name or domain id
     */
    tryGetChainName(chainNameOrId: ChainNameOrId): string | null;
    /**
     * Get the name for a given chain name or domain id
     * @throws if chain's metadata has not been set
     */
    getChainName(chainNameOrId: ChainNameOrId): string;
    /**
     * Get the names for all chains known to this MultiProvider
     */
    getKnownChainNames(): string[];
    /**
     * Get the id for a given chain name or domain id
     */
    tryGetChainId(chainNameOrId: ChainNameOrId): number | string | null;
    /**
     * Get the id for a given chain name or domain id
     * @throws if chain's metadata has not been set
     */
    getChainId(chainNameOrId: ChainNameOrId): number | string;
    /**
     * Get the id for a given EVM chain name or domain id
     * Returns null if chain's metadata has not been set or is not an EVM chain
     */
    tryGetEvmChainId(chainNameOrId: ChainNameOrId): number | null;
    /**
     * Get the id for a given EVM chain name or domain id
     * @throws if chain's metadata has not been set
     */
    getEvmChainId(chainNameOrId: ChainNameOrId): EvmChainId;
    /**
     * Get the domain id for a given chain name or domain id
     */
    tryGetDomainId(chainNameOrId: ChainNameOrId): number | null;
    /**
     * Get the domain id for a given chain name or domain id
     * @throws if chain's metadata has not been set
     */
    getDomainId(chainNameOrId: ChainNameOrId): number;
    /**
     * Get the protocol type for a given chain name or domain id
     */
    tryGetProtocol(chainNameOrId: ChainNameOrId): ProtocolType | null;
    /**
     * Get the protocol type for a given chain name or domain id
     * @throws if chain's metadata or protocol has not been set
     */
    getProtocol(chainNameOrId: ChainNameOrId): ProtocolType;
    /**
     * Get the domain ids for a list of chain names or domain ids
     * @throws if any chain's metadata has not been set
     */
    getDomainIds(chainNamesOrIds: Array<ChainName | number>): number[];
    /**
     * Get the ids for all chains known to this MultiProvider
     */
    getKnownDomainIds(): number[];
    /**
     * Get chain names excluding given chain name
     */
    getRemoteChains(name: ChainName): ChainName[];
    /**
     * Run given function on all known chains
     */
    mapKnownChains<Output>(fn: (n: ChainName) => Output): ChainMap<Output>;
    /**
     * Get the RPC details for a given chain name or domain id.
     * Optional index for metadata containing more than one RPC.
     * @throws if chain's metadata has not been set
     */
    getRpc(chainNameOrId: ChainNameOrId, index?: number): ChainMetadata['rpcUrls'][number];
    /**
     * Get an RPC URL for a given chain name or domain id
     * @throws if chain's metadata has not been set
     */
    getRpcUrl(chainNameOrId: ChainNameOrId, index?: number): string;
    /**
     * Get an RPC concurrency level for a given chain name or domain id
     */
    tryGetRpcConcurrency(chainNameOrId: ChainNameOrId, index?: number): number | null;
    /**
     * Get a block explorer URL for a given chain name or domain id
     */
    tryGetExplorerUrl(chainNameOrId: ChainNameOrId): string | null;
    /**
     * Get a block explorer URL for a given chain name or domain id
     * @throws if chain's metadata or block explorer data has no been set
     */
    getExplorerUrl(chainNameOrId: ChainNameOrId): string;
    /**
     * Get a block explorer's API for a given chain name or domain id
     */
    tryGetExplorerApi(chainNameOrId: ChainName | number): {
        apiUrl: string;
        apiKey?: string;
        family?: ExplorerFamily;
    } | null;
    /**
     * Get a block explorer API for a given chain name or domain id
     * @throws if chain's metadata or block explorer data has no been set
     */
    getExplorerApi(chainNameOrId: ChainName | number): {
        apiUrl: string;
        apiKey?: string;
        family?: ExplorerFamily;
    };
    /**
     * Get a block explorer's API URL for a given chain name or domain id
     */
    tryGetExplorerApiUrl(chainNameOrId: ChainNameOrId): string | null;
    /**
     * Get a block explorer API URL for a given chain name or domain id
     * @throws if chain's metadata or block explorer data has no been set
     */
    getExplorerApiUrl(chainNameOrId: ChainNameOrId): string;
    /**
     * Get a block explorer URL for given chain's tx
     */
    tryGetExplorerTxUrl(chainNameOrId: ChainNameOrId, response: {
        hash: string;
    }): string | null;
    /**
     * Get a block explorer URL for given chain's tx
     * @throws if chain's metadata or block explorer data has no been set
     */
    getExplorerTxUrl(chainNameOrId: ChainNameOrId, response: {
        hash: string;
    }): string;
    /**
     * Get a block explorer URL for given chain's address
     */
    tryGetExplorerAddressUrl(chainNameOrId: ChainNameOrId, address?: string): Promise<string | null>;
    /**
     * Get a block explorer URL for given chain's address
     * @throws if address or the chain's block explorer data has no been set
     */
    getExplorerAddressUrl(chainNameOrId: ChainNameOrId, address?: string): Promise<string>;
    /**
     * Get native token for given chain
     * @throws if native token has not been set
     */
    getNativeToken(chainNameOrId: ChainNameOrId): Promise<NonNullable<ChainMetadata['nativeToken']>>;
    /**
     * Creates a new ChainMetadataManager with the extended metadata
     * @param additionalMetadata extra fields to add to the metadata for each chain
     * @returns a new ChainMetadataManager
     */
    extendChainMetadata<NewExt = {}>(additionalMetadata: ChainMap<NewExt>): ChainMetadataManager<MetaExt & NewExt>;
    /**
     * Create a new instance from the intersection
     * of current's chains and the provided chain list
     */
    intersect(chains: ChainName[], throwIfNotSubset?: boolean): {
        intersection: ChainName[];
        result: ChainMetadataManager<MetaExt>;
    };
}
//# sourceMappingURL=ChainMetadataManager.d.ts.map