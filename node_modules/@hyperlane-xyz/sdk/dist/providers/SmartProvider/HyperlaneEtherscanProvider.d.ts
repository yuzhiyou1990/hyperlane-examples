import { providers } from 'ethers';
import { BlockExplorer } from '../../metadata/chainMetadataTypes.js';
import { IProviderMethods, ProviderMethod } from './ProviderMethods.js';
export declare class HyperlaneEtherscanProvider extends providers.EtherscanProvider implements IProviderMethods {
    readonly explorerConfig: BlockExplorer;
    readonly options?: {
        debug?: boolean | undefined;
    } | undefined;
    protected readonly logger: import("pino").default.Logger<never>;
    readonly supportedMethods: ProviderMethod[];
    constructor(explorerConfig: BlockExplorer, network: providers.Networkish, options?: {
        debug?: boolean | undefined;
    } | undefined);
    getBaseUrl(): string;
    getUrl(module: string, params: Record<string, string>): string;
    getPostUrl(): string;
    getHostname(): string;
    getQueryWaitTime(): number;
    fetch(module: string, params: Record<string, any>, post?: boolean): Promise<any>;
    perform(method: string, params: any, reqId?: number): Promise<any>;
    performGetLogs(params: {
        filter: providers.Filter;
    }): Promise<any>;
}
//# sourceMappingURL=HyperlaneEtherscanProvider.d.ts.map