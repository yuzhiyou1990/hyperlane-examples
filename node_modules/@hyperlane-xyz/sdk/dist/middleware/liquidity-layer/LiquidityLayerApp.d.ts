import { HyperlaneApp } from '../../app/HyperlaneApp.js';
import { HyperlaneContracts } from '../../contracts/types.js';
import { MultiProvider } from '../../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../../types.js';
import { BridgeAdapterConfig } from './LiquidityLayerRouterDeployer.js';
import { liquidityLayerFactories } from './contracts.js';
interface CircleBridgeMessage {
    chain: ChainName;
    remoteChain: ChainName;
    txHash: string;
    message: string;
    nonce: number;
    domain: number;
    nonceHash: string;
}
interface PortalBridgeMessage {
    origin: ChainName;
    nonce: number;
    portalSequence: number;
    destination: ChainName;
}
export declare class LiquidityLayerApp extends HyperlaneApp<typeof liquidityLayerFactories> {
    readonly contractsMap: ChainMap<HyperlaneContracts<typeof liquidityLayerFactories>>;
    readonly multiProvider: MultiProvider;
    readonly config: ChainMap<BridgeAdapterConfig>;
    constructor(contractsMap: ChainMap<HyperlaneContracts<typeof liquidityLayerFactories>>, multiProvider: MultiProvider, config: ChainMap<BridgeAdapterConfig>);
    fetchCircleMessageTransactions(chain: ChainName): Promise<string[]>;
    fetchPortalBridgeTransactions(chain: ChainName): Promise<string[]>;
    parsePortalMessages(chain: ChainName, txHash: string): Promise<PortalBridgeMessage[]>;
    parseCircleMessages(chain: ChainName, txHash: string): Promise<CircleBridgeMessage[]>;
    attemptPortalTransferCompletion(message: PortalBridgeMessage): Promise<void>;
    attemptCircleAttestationSubmission(message: CircleBridgeMessage): Promise<void>;
}
export {};
//# sourceMappingURL=LiquidityLayerApp.d.ts.map