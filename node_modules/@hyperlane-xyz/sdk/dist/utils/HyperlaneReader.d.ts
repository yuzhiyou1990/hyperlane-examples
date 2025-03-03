import { providers } from 'ethers';
import { LevelWithSilentOrString } from 'pino';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainNameOrId } from '../types.js';
export declare class HyperlaneReader {
    protected readonly multiProvider: MultiProvider;
    protected readonly chain: ChainNameOrId;
    provider: providers.Provider;
    constructor(multiProvider: MultiProvider, chain: ChainNameOrId);
    /**
     * Conditionally sets the log level for a smart provider.
     *
     * @param level - The log level to set, e.g. 'debug', 'info', 'warn', 'error'.
     */
    protected setSmartProviderLogLevel(level: LevelWithSilentOrString): void;
}
//# sourceMappingURL=HyperlaneReader.d.ts.map