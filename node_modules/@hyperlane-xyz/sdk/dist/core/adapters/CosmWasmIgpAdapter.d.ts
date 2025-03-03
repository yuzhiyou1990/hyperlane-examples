import { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { Address } from '@hyperlane-xyz/utils';
import { BaseCosmWasmAdapter } from '../../app/MultiProtocolApp.js';
import { BeneficiaryResponse, DefaultGasResponse, DomainsResponse, GetExchangeRateAndGasPriceResponse, OwnerResponse, QueryMsg, QuoteGasPaymentResponse, RouteResponseForAddr, RoutesResponseForAddr } from '../../cw-types/Igp.types.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainMap, ChainName } from '../../types.js';
type IgpResponse = OwnerResponse | BeneficiaryResponse | DomainsResponse | GetExchangeRateAndGasPriceResponse | RoutesResponseForAddr | RouteResponseForAddr | DefaultGasResponse | QuoteGasPaymentResponse;
export declare class CosmWasmIgpAdapter extends BaseCosmWasmAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider<any>;
    readonly addresses: {
        igp: Address;
    };
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider<any>, addresses: {
        igp: Address;
    });
    queryIgp<R extends IgpResponse>(msg: QueryMsg): Promise<R>;
    owner(): Promise<string>;
    beneficiary(): Promise<string>;
    getOracles(): Promise<ChainMap<Address>>;
    defaultGas(): Promise<number>;
    getOracleData(chain: ChainName): Promise<GetExchangeRateAndGasPriceResponse>;
    quoteGasPayment(domain: number, destinationGasAmount: number): Promise<number>;
    setOracleForDomain(domain: number, oracle: string, oracleData: GetExchangeRateAndGasPriceResponse): ExecuteInstruction;
}
export {};
//# sourceMappingURL=CosmWasmIgpAdapter.d.ts.map