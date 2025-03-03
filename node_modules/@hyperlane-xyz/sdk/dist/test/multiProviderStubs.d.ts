import sinon from 'sinon';
import { MultiProtocolProvider } from '../providers/MultiProtocolProvider.js';
/**
 * Takes a MultiProtocolProvider instance and stubs it's get*Provider methods to
 * return mock providers. More provider methods can be added her as needed.
 * Note: callers should call `sandbox.restore()` after tests complete.
 */
export declare function stubMultiProtocolProvider(multiProvider: MultiProtocolProvider): sinon.SinonSandbox;
//# sourceMappingURL=multiProviderStubs.d.ts.map