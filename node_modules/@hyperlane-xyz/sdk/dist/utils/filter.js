export function filterByChains(owners, filterByChainName) {
    return Object.keys(owners).reduce((result, chain) => {
        if (filterByChainName.has(chain)) {
            result[chain] = owners[chain];
        }
        return result;
    }, {});
}
//# sourceMappingURL=filter.js.map