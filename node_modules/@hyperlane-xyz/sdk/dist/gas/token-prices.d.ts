import { ChainMetadata } from '../metadata/chainMetadataTypes.js';
import { ChainMap, ChainName } from '../types.js';
export interface TokenPriceGetter {
    getTokenPrice(chain: ChainName): Promise<number>;
    getTokenExchangeRate(base: ChainName, quote: ChainName): Promise<number>;
}
type TokenPriceCacheEntry = {
    price: number;
    timestamp: Date;
};
declare class TokenPriceCache {
    protected cache: Map<string, TokenPriceCacheEntry>;
    protected freshSeconds: number;
    protected evictionSeconds: number;
    constructor(freshSeconds?: number, evictionSeconds?: number);
    put(id: string, price: number): void;
    isFresh(id: string): boolean;
    fetch(id: string): number;
}
export declare class CoinGeckoTokenPriceGetter implements TokenPriceGetter {
    protected cache: TokenPriceCache;
    protected apiKey?: string;
    protected sleepMsBetweenRequests: number;
    protected metadata: ChainMap<ChainMetadata>;
    constructor({ chainMetadata, apiKey, expirySeconds, sleepMsBetweenRequests, }: {
        chainMetadata: ChainMap<ChainMetadata>;
        apiKey?: string;
        expirySeconds?: number;
        sleepMsBetweenRequests?: number;
    });
    getTokenPrice(chain: ChainName, currency?: string): Promise<number>;
    getAllTokenPrices(currency?: string): Promise<ChainMap<number>>;
    getTokenExchangeRate(base: ChainName, quote: ChainName, currency?: string): Promise<number>;
    private getTokenPrices;
    getTokenPriceByIds(ids: string[], currency?: string): Promise<number[] | undefined>;
    fetchPriceData(ids: string[], currency: string): Promise<number[]>;
}
export {};
//# sourceMappingURL=token-prices.d.ts.map