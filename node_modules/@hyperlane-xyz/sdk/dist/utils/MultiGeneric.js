// Generalized map container for chain name to some value
export class MultiGeneric {
    chainMap;
    constructor(chainMap) {
        this.chainMap = chainMap;
    }
    /**
     * Get value for a chain
     * @throws if chain is invalid or has not been set
     */
    get(chain) {
        const value = this.chainMap[chain] ?? null;
        if (!value) {
            throw new Error(`No chain value found for ${chain}`);
        }
        return value;
    }
    /**
     * Get value for a chain
     * @returns value or null if chain value has not been set
     */
    tryGet(chain) {
        return this.chainMap[chain] ?? null;
    }
    /**
     * Set value for a chain
     * @throws if chain is invalid or has not been set
     */
    set(chain, value) {
        this.chainMap[chain] = value;
        return value;
    }
    chains() {
        return Object.keys(this.chainMap);
    }
    forEach(fn) {
        for (const chain of this.chains()) {
            fn(chain, this.chainMap[chain]);
        }
    }
    map(fn) {
        const entries = [];
        for (const chain of this.chains()) {
            entries.push([chain, fn(chain, this.chainMap[chain])]);
        }
        return Object.fromEntries(entries);
    }
    async remoteChains(name) {
        return this.chains().filter((key) => key !== name);
    }
    knownChain(chain) {
        return Object.keys(this.chainMap).includes(chain);
    }
}
//# sourceMappingURL=MultiGeneric.js.map