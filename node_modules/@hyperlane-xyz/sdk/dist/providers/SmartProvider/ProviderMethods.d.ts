export interface IProviderMethods {
    readonly supportedMethods: ProviderMethod[];
}
export declare enum ProviderMethod {
    Call = "call",
    EstimateGas = "estimateGas",
    GetBalance = "getBalance",
    GetBlock = "getBlock",
    GetBlockNumber = "getBlockNumber",
    GetCode = "getCode",
    GetGasPrice = "getGasPrice",
    GetStorageAt = "getStorageAt",
    GetTransaction = "getTransaction",
    GetTransactionCount = "getTransactionCount",
    GetTransactionReceipt = "getTransactionReceipt",
    GetLogs = "getLogs",
    SendTransaction = "sendTransaction",
    MaxPriorityFeePerGas = "maxPriorityFeePerGas"
}
export declare const AllProviderMethods: ProviderMethod[];
export declare function excludeProviderMethods(exclude: ProviderMethod[]): ProviderMethod[];
//# sourceMappingURL=ProviderMethods.d.ts.map