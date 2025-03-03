import { HyperlaneAppChecker } from '../deploy/HyperlaneAppChecker.js';
import { HyperlaneIsmFactory } from '../ism/HyperlaneIsmFactory.js';
import { MultiProvider } from '../providers/MultiProvider.js';
import { ChainMap, ChainName } from '../types.js';
import { HyperlaneCore } from './HyperlaneCore.js';
import { CoreConfig } from './types.js';
export declare class HyperlaneCoreChecker extends HyperlaneAppChecker<HyperlaneCore, CoreConfig> {
    readonly ismFactory: HyperlaneIsmFactory;
    readonly chainAddresses: ChainMap<Record<string, string>>;
    constructor(multiProvider: MultiProvider, app: HyperlaneCore, configMap: ChainMap<CoreConfig>, ismFactory: HyperlaneIsmFactory, chainAddresses: ChainMap<Record<string, string>>);
    checkChain(chain: ChainName): Promise<void>;
    checkDomainOwnership(chain: ChainName): Promise<void>;
    checkHook(chain: ChainName, hookName: string, hookAddress: string, expectedHookOwner: string): Promise<void>;
    checkMailbox(chain: ChainName): Promise<void>;
    checkBytecodes(chain: ChainName): Promise<void>;
    checkValidatorAnnounce(chain: ChainName): Promise<void>;
}
//# sourceMappingURL=HyperlaneCoreChecker.d.ts.map