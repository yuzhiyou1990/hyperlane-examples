import { TestMailbox__factory } from '@hyperlane-xyz/core';
import { messageId } from '@hyperlane-xyz/utils';
import { HyperlaneCore } from './HyperlaneCore.js';
import { coreFactories } from './contracts.js';
export const testCoreFactories = {
    ...coreFactories,
    mailbox: new TestMailbox__factory(),
};
export class TestCoreApp extends HyperlaneCore {
    getContracts(chain) {
        return super.getContracts(chain);
    }
    async processMessages() {
        const responses = new Map();
        for (const origin of this.chains()) {
            const outbound = await this.processOutboundMessages(origin);
            const originResponses = new Map();
            const remoteChains = await this.remoteChains(origin);
            remoteChains.forEach((destination) => originResponses.set(destination, outbound.get(destination)));
            responses.set(origin, originResponses);
        }
        return responses;
    }
    async processOutboundMessages(origin) {
        const responses = new Map();
        const contracts = this.getContracts(origin);
        const outbox = contracts.mailbox;
        const dispatchFilter = outbox.filters.Dispatch();
        const dispatches = await outbox.queryFilter(dispatchFilter);
        for (const dispatch of dispatches) {
            const destination = dispatch.args.destination;
            if (destination === this.multiProvider.getDomainId(origin)) {
                throw new Error('Dispatched message to local domain');
            }
            const destinationChain = this.multiProvider.getChainName(destination);
            const inbox = this.getContracts(destinationChain).mailbox;
            const id = messageId(dispatch.args.message);
            const delivered = await inbox.delivered(id);
            if (!delivered) {
                const response = await inbox.process('0x', dispatch.args.message);
                const destinationResponses = responses.get(destinationChain) || [];
                destinationResponses.push(response);
                responses.set(destinationChain, destinationResponses);
            }
        }
        return responses;
    }
}
//# sourceMappingURL=TestCoreApp.js.map