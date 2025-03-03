import { HyperlaneAppChecker } from '../deploy/HyperlaneAppChecker.js';
import { ChainName } from '../types.js';
import { HyperlaneIgp } from './HyperlaneIgp.js';
import { IgpConfig } from './types.js';
export declare class HyperlaneIgpChecker extends HyperlaneAppChecker<HyperlaneIgp, IgpConfig> {
    checkChain(chain: ChainName): Promise<void>;
    checkDomainOwnership(chain: ChainName): Promise<void>;
    checkBytecodes(chain: ChainName): Promise<void>;
    checkOverheadInterchainGasPaymaster(local: ChainName): Promise<void>;
    checkInterchainGasPaymaster(local: ChainName): Promise<void>;
}
//# sourceMappingURL=HyperlaneIgpChecker.d.ts.map