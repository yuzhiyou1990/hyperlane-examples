export var ProviderMethod;
(function (ProviderMethod) {
    ProviderMethod["Call"] = "call";
    ProviderMethod["EstimateGas"] = "estimateGas";
    ProviderMethod["GetBalance"] = "getBalance";
    ProviderMethod["GetBlock"] = "getBlock";
    ProviderMethod["GetBlockNumber"] = "getBlockNumber";
    ProviderMethod["GetCode"] = "getCode";
    ProviderMethod["GetGasPrice"] = "getGasPrice";
    ProviderMethod["GetStorageAt"] = "getStorageAt";
    ProviderMethod["GetTransaction"] = "getTransaction";
    ProviderMethod["GetTransactionCount"] = "getTransactionCount";
    ProviderMethod["GetTransactionReceipt"] = "getTransactionReceipt";
    ProviderMethod["GetLogs"] = "getLogs";
    ProviderMethod["SendTransaction"] = "sendTransaction";
    ProviderMethod["MaxPriorityFeePerGas"] = "maxPriorityFeePerGas";
})(ProviderMethod || (ProviderMethod = {}));
export const AllProviderMethods = Object.values(ProviderMethod);
export function excludeProviderMethods(exclude) {
    return AllProviderMethods.filter((m) => !exclude.includes(m));
}
//# sourceMappingURL=ProviderMethods.js.map