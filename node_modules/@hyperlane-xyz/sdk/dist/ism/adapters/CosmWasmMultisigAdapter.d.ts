import { ExecuteInstruction } from '@cosmjs/cosmwasm-stargate';
import { Address } from '@hyperlane-xyz/utils';
import { BaseCosmWasmAdapter } from '../../app/MultiProtocolApp.js';
import { EnrolledValidatorsResponse, ExecuteMsg as MultisigExecute, QueryMsg as MultisigQuery } from '../../cw-types/IsmMultisig.types.js';
import { MultisigConfig, MultisigIsmConfig } from '../../ism/types.js';
import { MultiProtocolProvider } from '../../providers/MultiProtocolProvider.js';
import { ChainMap, ChainName } from '../../types.js';
type MultisigResponse = EnrolledValidatorsResponse;
export declare class CosmWasmMultisigAdapter extends BaseCosmWasmAdapter {
    readonly chainName: ChainName;
    readonly multiProvider: MultiProtocolProvider<any>;
    readonly addresses: {
        multisig: Address;
    };
    constructor(chainName: ChainName, multiProvider: MultiProtocolProvider<any>, addresses: {
        multisig: Address;
    });
    queryMultisig<R extends MultisigResponse>(msg: MultisigQuery): Promise<R>;
    getConfig(chain: ChainName): Promise<Omit<MultisigIsmConfig, 'type'>>;
    prepareMultisig(msg: MultisigExecute): ExecuteInstruction;
    configureMultisig(configMap: ChainMap<MultisigConfig>): Promise<ExecuteInstruction[]>;
}
export {};
//# sourceMappingURL=CosmWasmMultisigAdapter.d.ts.map