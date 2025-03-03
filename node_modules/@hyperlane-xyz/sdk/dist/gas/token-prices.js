import { objKeys, rootLogger, sleep } from '@hyperlane-xyz/utils';
const COINGECKO_PRICE_API = 'https://api.coingecko.com/api/v3/simple/price';
class TokenPriceCache {
    cache;
    freshSeconds;
    evictionSeconds;
    constructor(freshSeconds = 60, evictionSeconds = 3 * 60 * 60) {
        this.cache = new Map();
        this.freshSeconds = freshSeconds;
        this.evictionSeconds = evictionSeconds;
    }
    put(id, price) {
        const now = new Date();
        this.cache.set(id, { timestamp: now, price });
    }
    isFresh(id) {
        const entry = this.cache.get(id);
        if (!entry)
            return false;
        const expiryTime = new Date(entry.timestamp.getTime() + 1000 * this.freshSeconds);
        const now = new Date();
        return now < expiryTime;
    }
    fetch(id) {
        const entry = this.cache.get(id);
        if (!entry) {
            throw new Error(`no entry found for ${id} in token price cache`);
        }
        const evictionTime = new Date(entry.timestamp.getTime() + 1000 * this.evictionSeconds);
        const now = new Date();
        if (now > evictionTime) {
            throw new Error(`evicted entry found for ${id} in token price cache`);
        }
        return entry.price;
    }
}
export class CoinGeckoTokenPriceGetter {
    cache;
    apiKey;
    sleepMsBetweenRequests;
    metadata;
    constructor({ chainMetadata, apiKey, expirySeconds, sleepMsBetweenRequests = 5000, }) {
        this.apiKey = apiKey;
        this.cache = new TokenPriceCache(expirySeconds);
        this.metadata = chainMetadata;
        this.sleepMsBetweenRequests = sleepMsBetweenRequests;
    }
    async getTokenPrice(chain, currency = 'usd') {
        const [price] = await this.getTokenPrices([chain], currency);
        return price;
    }
    async getAllTokenPrices(currency = 'usd') {
        const chains = objKeys(this.metadata);
        const prices = await this.getTokenPrices(chains, currency);
        return chains.reduce((agg, chain, i) => ({ ...agg, [chain]: prices[i] }), {});
    }
    async getTokenExchangeRate(base, quote, currency = 'usd') {
        const [basePrice, quotePrice] = await this.getTokenPrices([base, quote], currency);
        return basePrice / quotePrice;
    }
    async getTokenPrices(chains, currency = 'usd') {
        const isMainnet = chains.map((c) => !this.metadata[c].isTestnet);
        const allMainnets = isMainnet.every((v) => v === true);
        const allTestnets = isMainnet.every((v) => v === false);
        if (allTestnets) {
            // Testnet tokens are all artificially priced at 1.0 USD.
            return chains.map(() => 1);
        }
        if (!allMainnets) {
            throw new Error('Cannot mix testnets and mainnets when fetching token prices');
        }
        const ids = chains.map((chain) => this.metadata[chain].gasCurrencyCoinGeckoId || chain);
        await this.getTokenPriceByIds(ids, currency);
        return chains.map((chain) => this.cache.fetch(this.metadata[chain].gasCurrencyCoinGeckoId || chain));
    }
    async getTokenPriceByIds(ids, currency = 'usd') {
        const toQuery = ids.filter((id) => !this.cache.isFresh(id));
        await sleep(this.sleepMsBetweenRequests);
        if (toQuery.length > 0) {
            try {
                const prices = await this.fetchPriceData(toQuery, currency);
                prices.forEach((price, i) => this.cache.put(toQuery[i], price));
            }
            catch (e) {
                rootLogger.warn('Error when querying token prices', e);
                return undefined;
            }
        }
        return ids.map((id) => this.cache.fetch(id));
    }
    async fetchPriceData(ids, currency) {
        let url = `${COINGECKO_PRICE_API}?ids=${Object.entries(ids).join(',')}&vs_currencies=${currency}`;
        if (this.apiKey) {
            url += `&x-cg-pro-api-key=${this.apiKey}`;
        }
        const resp = await fetch(url);
        const idPrices = await resp.json();
        return ids.map((id) => {
            const price = idPrices[id]?.[currency];
            if (!price)
                throw new Error(`No price found for ${id}`);
            return Number(price);
        });
    }
}
//# sourceMappingURL=token-prices.js.map