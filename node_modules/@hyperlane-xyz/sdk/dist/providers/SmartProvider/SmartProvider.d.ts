import { BigNumber, providers } from 'ethers';
import { Logger, pino } from 'pino';
import { BlockExplorer, RpcUrl } from '../../metadata/chainMetadataTypes.js';
import { HyperlaneEtherscanProvider } from './HyperlaneEtherscanProvider.js';
import { HyperlaneJsonRpcProvider } from './HyperlaneJsonRpcProvider.js';
import { IProviderMethods, ProviderMethod } from './ProviderMethods.js';
import { ChainMetadataWithRpcConnectionInfo, ProviderPerformResult, SmartProviderOptions } from './types.js';
export declare function getSmartProviderErrorMessage(errorMsg: string): string;
type HyperlaneProvider = HyperlaneEtherscanProvider | HyperlaneJsonRpcProvider;
export declare class HyperlaneSmartProvider extends providers.BaseProvider implements IProviderMethods {
    readonly options?: SmartProviderOptions | undefined;
    protected logger: Logger;
    readonly explorerProviders: HyperlaneEtherscanProvider[];
    readonly rpcProviders: HyperlaneJsonRpcProvider[];
    readonly supportedMethods: ProviderMethod[];
    requestCount: number;
    constructor(network: providers.Networkish, rpcUrls?: RpcUrl[], blockExplorers?: BlockExplorer[], options?: SmartProviderOptions | undefined);
    setLogLevel(level: pino.LevelWithSilentOrString): void;
    getPriorityFee(): Promise<BigNumber>;
    getFeeData(): Promise<providers.FeeData>;
    static fromChainMetadata(chainMetadata: ChainMetadataWithRpcConnectionInfo, options?: SmartProviderOptions): HyperlaneSmartProvider;
    static fromRpcUrl(network: providers.Networkish, rpcUrl: string, options?: SmartProviderOptions): HyperlaneSmartProvider;
    detectNetwork(): Promise<providers.Network>;
    perform(method: string, params: {
        [name: string]: any;
    }): Promise<any>;
    /**
     * Checks if this SmartProvider is healthy by checking for new blocks
     * @param numBlocks The number of sequential blocks to check for. Default 1
     * @param timeoutMs The maximum time to wait for the full check. Default 3000ms
     * @returns true if the provider is healthy, false otherwise
     */
    isHealthy(numBlocks?: number, timeoutMs?: number): Promise<boolean>;
    isExplorerProvider(p: HyperlaneProvider): p is HyperlaneEtherscanProvider;
    /**
     * This perform method will trigger any providers that support the method
     * one at a time in preferential order. If one is slow to respond, the next is triggered.
     * TODO: Consider adding a quorum option that requires a certain number of providers to agree
     */
    protected performWithFallback(method: string, params: {
        [name: string]: any;
    }, providers: Array<HyperlaneEtherscanProvider | HyperlaneJsonRpcProvider>, reqId: number): Promise<any>;
    protected wrapProviderPerform(provider: HyperlaneProvider, pIndex: number, method: string, params: any, reqId: number): Promise<ProviderPerformResult>;
    protected waitForProviderSuccess(resultPromises: Promise<ProviderPerformResult>[]): Promise<ProviderPerformResult>;
    protected throwCombinedProviderErrors(errors: any[], fallbackMsg: string): void;
}
export {};
//# sourceMappingURL=SmartProvider.d.ts.map