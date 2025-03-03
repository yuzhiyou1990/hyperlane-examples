import type { utils } from 'ethers';
import { ChainMetadata, RpcUrl } from '../../metadata/chainMetadataTypes.js';
export type RpcConfigWithConnectionInfo = RpcUrl & {
    connection?: utils.ConnectionInfo;
};
export interface ChainMetadataWithRpcConnectionInfo extends Omit<ChainMetadata, 'rpcUrls'> {
    rpcUrls: Array<RpcConfigWithConnectionInfo>;
}
export declare enum ProviderStatus {
    Success = "success",
    Error = "error",
    Timeout = "timeout"
}
export interface ProviderPerformResultBase {
    status: ProviderStatus;
}
export interface ProviderSuccessResult extends ProviderPerformResultBase {
    status: ProviderStatus.Success;
    value: any;
}
export interface ProviderErrorResult extends ProviderPerformResultBase {
    status: ProviderStatus.Error;
    error: unknown;
}
export interface ProviderTimeoutResult extends ProviderPerformResultBase {
    status: ProviderStatus.Timeout;
}
export type ProviderPerformResult = ProviderSuccessResult | ProviderErrorResult | ProviderTimeoutResult;
export interface ProviderRetryOptions {
    maxRetries?: number;
    baseRetryDelayMs?: number;
}
export interface SmartProviderOptions extends ProviderRetryOptions {
    fallbackStaggerMs?: number;
    debug?: boolean;
}
//# sourceMappingURL=types.d.ts.map