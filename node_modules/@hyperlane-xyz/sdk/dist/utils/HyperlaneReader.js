export class HyperlaneReader {
    multiProvider;
    chain;
    provider;
    constructor(multiProvider, chain) {
        this.multiProvider = multiProvider;
        this.chain = chain;
        this.provider = this.multiProvider.getProvider(chain);
    }
    /**
     * Conditionally sets the log level for a smart provider.
     *
     * @param level - The log level to set, e.g. 'debug', 'info', 'warn', 'error'.
     */
    setSmartProviderLogLevel(level) {
        if ('setLogLevel' in this.provider) {
            this.provider.setLogLevel(level);
        }
    }
}
//# sourceMappingURL=HyperlaneReader.js.map