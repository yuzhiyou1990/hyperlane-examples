import { Mailbox__factory } from '@hyperlane-xyz/core';
import { BaseEvmAdapter } from '../../app/MultiProtocolApp.js';
import { ProviderType, } from '../../providers/ProviderType.js';
import { HyperlaneCore } from '../HyperlaneCore.js';
// This adapter just routes to the HyperlaneCore
// Which implements the needed functionality for EVM chains
// TODO deprecate HyperlaneCore and replace all evm-specific classes with adapters
export class EvmCoreAdapter extends BaseEvmAdapter {
    chainName;
    multiProvider;
    addresses;
    core;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
        const contractsMap = {
            [chainName]: {
                mailbox: Mailbox__factory.connect(addresses.mailbox, multiProvider.getEthersV5Provider(chainName)),
            },
        }; // Core only uses mailbox so cast to keep adapter interface simple
        this.core = new HyperlaneCore(contractsMap, multiProvider.toMultiProvider());
    }
    extractMessageIds(sourceTx) {
        if (sourceTx.type !== ProviderType.EthersV5) {
            throw new Error(`Unsupported provider type for EvmCoreAdapter ${sourceTx.type}`);
        }
        const messages = this.core.getDispatchedMessages(sourceTx.receipt);
        return messages.map(({ id, parsed }) => ({
            messageId: id,
            destination: this.multiProvider.getChainName(parsed.destination),
        }));
    }
    waitForMessageProcessed(messageId, destination, delayMs, maxAttempts) {
        return this.core.waitForMessageIdProcessed(messageId, destination, delayMs, maxAttempts);
    }
}
//# sourceMappingURL=EvmCoreAdapter.js.map