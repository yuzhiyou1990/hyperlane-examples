import { ChainMetadata, ExplorerFamily } from './chainMetadataTypes.js';
export declare function getExplorerBaseUrl(metadata: ChainMetadata, index?: number): string | null;
export declare function getExplorerApi(metadata: ChainMetadata, index?: number): {
    apiUrl: string;
    apiKey?: string | undefined;
    family?: ExplorerFamily | undefined;
} | null;
export declare function getExplorerApiUrl(metadata: ChainMetadata, index?: number): string | null;
export declare function getExplorerTxUrl(metadata: ChainMetadata, hash: string): string | null;
export declare function getExplorerAddressUrl(metadata: ChainMetadata, address: string): string | null;
//# sourceMappingURL=blockExplorer.d.ts.map