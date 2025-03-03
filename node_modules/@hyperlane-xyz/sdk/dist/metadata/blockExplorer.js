import { ProtocolType } from '@hyperlane-xyz/utils';
export function getExplorerBaseUrl(metadata, index = 0) {
    if (!metadata?.blockExplorers?.length)
        return null;
    const url = new URL(metadata.blockExplorers[index].url);
    return url.toString();
}
export function getExplorerApi(metadata, index = 0) {
    const { protocol, blockExplorers } = metadata;
    // TODO solana + cosmos support here as needed
    if (protocol !== ProtocolType.Ethereum)
        return null;
    if (!blockExplorers?.length || !blockExplorers[index].apiUrl)
        return null;
    return {
        apiUrl: blockExplorers[index].apiUrl,
        apiKey: blockExplorers[index].apiKey,
        family: blockExplorers[index].family,
    };
}
export function getExplorerApiUrl(metadata, index = 0) {
    const explorer = getExplorerApi(metadata, index);
    if (!explorer)
        return null;
    const { apiUrl, apiKey } = explorer;
    if (!apiKey)
        return apiUrl;
    const url = new URL(apiUrl);
    url.searchParams.set('apikey', apiKey);
    return url.toString();
}
export function getExplorerTxUrl(metadata, hash) {
    const baseUrl = getExplorerBaseUrl(metadata);
    if (!baseUrl)
        return null;
    const chainName = metadata.name;
    // TODO consider move handling of these chain/protocol specific quirks to ChainMetadata
    const urlPathStub = ['nautilus', 'proteustestnet'].includes(chainName)
        ? 'transaction'
        : 'tx';
    return appendToPath(baseUrl, `${urlPathStub}/${hash}`).toString();
}
export function getExplorerAddressUrl(metadata, address) {
    const baseUrl = getExplorerBaseUrl(metadata);
    if (!baseUrl)
        return null;
    return appendToPath(baseUrl, `address/${address}`).toString();
}
function appendToPath(baseUrl, pathExtension) {
    const base = new URL(baseUrl);
    let currentPath = base.pathname;
    if (currentPath.endsWith('/'))
        currentPath = currentPath.slice(0, -1);
    const newPath = `${currentPath}/${pathExtension}`;
    const newUrl = new URL(newPath, base);
    newUrl.search = base.searchParams.toString();
    return newUrl;
}
//# sourceMappingURL=blockExplorer.js.map