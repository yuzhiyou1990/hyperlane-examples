import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { SigningStargateClient } from '@cosmjs/stargate';
export declare function getSigningClient(pkey: string): Promise<{
    wasm: SigningCosmWasmClient;
    stargate: SigningStargateClient;
    signer: string;
    signer_addr: string;
    signer_pubkey: string;
}>;
export declare function rotateHooks(): Promise<void>;
export declare function rotateAuth(): Promise<void>;
export declare function summary(): Promise<void>;
export declare function rotateValidators(): Promise<void>;
//# sourceMappingURL=CosmWasmTokenAdapter.test.d.ts.map