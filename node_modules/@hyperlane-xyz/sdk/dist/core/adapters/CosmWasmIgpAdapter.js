import { BaseCosmWasmAdapter } from '../../app/MultiProtocolApp.js';
export class CosmWasmIgpAdapter extends BaseCosmWasmAdapter {
    chainName;
    multiProvider;
    addresses;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
    }
    async queryIgp(msg) {
        const provider = await this.getProvider();
        const response = await provider.queryContractSmart(this.addresses.igp, msg);
        return response;
    }
    async owner() {
        const response = await this.queryIgp({
            ownable: {
                get_owner: {},
            },
        });
        return response.owner;
    }
    async beneficiary() {
        const beneficiaryResponse = await this.queryIgp({
            igp: {
                beneficiary: {},
            },
        });
        return beneficiaryResponse.beneficiary;
    }
    async getOracles() {
        const domainResponse = await this.queryIgp({
            router: {
                list_routes: {},
            },
        });
        return Object.fromEntries(domainResponse.routes.map((_) => [
            this.multiProvider.getChainName(_.domain),
            _.route ?? '',
        ]));
    }
    async defaultGas() {
        const defaultGas = await this.queryIgp({
            igp: {
                default_gas: {},
            },
        });
        return defaultGas.gas;
    }
    async getOracleData(chain) {
        const provider = await this.getProvider();
        const domain = this.multiProvider.getDomainId(chain);
        const oracles = await this.getOracles();
        const oracle = oracles[chain];
        const oracleResponse = await provider.queryContractSmart(oracle, {
            oracle: {
                get_exchange_rate_and_gas_price: {
                    dest_domain: domain,
                },
            },
        });
        return oracleResponse;
    }
    async quoteGasPayment(domain, destinationGasAmount) {
        const quote = await this.queryIgp({
            igp: {
                quote_gas_payment: {
                    dest_domain: domain,
                    gas_amount: destinationGasAmount.toString(),
                },
            },
        });
        return Number(quote.gas_needed);
    }
    setOracleForDomain(domain, oracle, oracleData) {
        return {
            contractAddress: oracle,
            msg: {
                set_remote_gas_data: {
                    config: {
                        gas_price: oracleData.gas_price,
                        token_exchange_rate: oracleData.exchange_rate,
                        remote_domain: domain,
                    },
                },
            },
        };
    }
}
//# sourceMappingURL=CosmWasmIgpAdapter.js.map