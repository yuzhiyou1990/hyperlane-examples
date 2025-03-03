import { providers } from 'ethers';
import { IProviderMethods, ProviderMethod } from './ProviderMethods.js';
import { RpcConfigWithConnectionInfo } from './types.js';
export declare class HyperlaneJsonRpcProvider extends providers.StaticJsonRpcProvider implements IProviderMethods {
    readonly rpcConfig: RpcConfigWithConnectionInfo;
    readonly options?: {
        debug?: boolean | undefined;
    } | undefined;
    protected readonly logger: import("pino").default.Logger<never>;
    readonly supportedMethods: ProviderMethod[];
    constructor(rpcConfig: RpcConfigWithConnectionInfo, network: providers.Networkish, options?: {
        debug?: boolean | undefined;
    } | undefined);
    prepareRequest(method: string, params: any): [string, any[]];
    perform(method: string, params: any, reqId?: number): Promise<any>;
    performGetLogs(params: {
        filter: providers.Filter;
    }): Promise<any>;
    getBaseUrl(): string;
}
//# sourceMappingURL=HyperlaneJsonRpcProvider.d.ts.map