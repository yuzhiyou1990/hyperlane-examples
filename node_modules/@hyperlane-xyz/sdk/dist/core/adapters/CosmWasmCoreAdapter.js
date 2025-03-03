import { assert, ensure0x } from '@hyperlane-xyz/utils';
import { BaseCosmWasmAdapter } from '../../app/MultiProtocolApp.js';
import { ProviderType, } from '../../providers/ProviderType.js';
const MESSAGE_DISPATCH_EVENT_TYPE = 'wasm-mailbox_dispatch';
const MESSAGE_DISPATCH_ID_EVENT_TYPE = 'wasm-mailbox_dispatch_id';
const MESSAGE_ID_ATTRIBUTE_KEY = 'message_id';
const MESSAGE_DESTINATION_ATTRIBUTE_KEY = 'destination';
export class CosmWasmCoreAdapter extends BaseCosmWasmAdapter {
    chainName;
    multiProvider;
    addresses;
    constructor(chainName, multiProvider, addresses) {
        super(chainName, multiProvider, addresses);
        this.chainName = chainName;
        this.multiProvider = multiProvider;
        this.addresses = addresses;
    }
    prepareMailbox(msg, funds) {
        return {
            contractAddress: this.addresses.mailbox,
            msg,
            funds,
        };
    }
    initTransferOwner(newOwner) {
        return this.prepareMailbox({
            ownable: {
                init_ownership_transfer: {
                    next_owner: newOwner,
                },
            },
        });
    }
    claimTransferOwner() {
        return this.prepareMailbox({
            ownable: {
                claim_ownership: {},
            },
        });
    }
    setDefaultHook(address) {
        return this.prepareMailbox({
            set_default_hook: {
                hook: address,
            },
        });
    }
    setRequiredHook(address) {
        return this.prepareMailbox({
            set_required_hook: {
                hook: address,
            },
        });
    }
    async queryMailbox(msg) {
        const provider = await this.getProvider();
        const response = await provider.queryContractSmart(this.addresses.mailbox, msg);
        return response;
    }
    async defaultHook() {
        const response = await this.queryMailbox({
            mailbox: {
                default_hook: {},
            },
        });
        return response.default_hook;
    }
    async defaultIsm() {
        const response = await this.queryMailbox({
            mailbox: {
                default_ism: {},
            },
        });
        return response.default_ism;
    }
    async requiredHook() {
        const response = await this.queryMailbox({
            mailbox: {
                required_hook: {},
            },
        });
        return response.required_hook;
    }
    async nonce() {
        const response = await this.queryMailbox({
            mailbox: {
                nonce: {},
            },
        });
        return response.nonce;
    }
    async latestDispatchedId() {
        const response = await this.queryMailbox({
            mailbox: {
                latest_dispatch_id: {},
            },
        });
        return response.message_id;
    }
    async owner() {
        const response = await this.queryMailbox({
            ownable: {
                get_owner: {},
            },
        });
        return response.owner;
    }
    async delivered(id) {
        const response = await this.queryMailbox({
            mailbox: {
                message_delivered: {
                    id,
                },
            },
        });
        return response.delivered;
    }
    extractMessageIds(sourceTx) {
        if (sourceTx.type !== ProviderType.CosmJsWasm) {
            throw new Error(`Unsupported provider type for CosmosCoreAdapter ${sourceTx.type}`);
        }
        const dispatchIdEvents = sourceTx.receipt.events.filter((e) => e.type === MESSAGE_DISPATCH_ID_EVENT_TYPE);
        const dispatchEvents = sourceTx.receipt.events.filter((e) => e.type === MESSAGE_DISPATCH_EVENT_TYPE);
        assert(dispatchIdEvents.length === dispatchEvents.length, 'Mismatched dispatch and dispatch id events');
        const result = [];
        for (let i = 0; i < dispatchIdEvents.length; i++) {
            const idAttribute = dispatchIdEvents[i].attributes.find((a) => a.key === MESSAGE_ID_ATTRIBUTE_KEY);
            const destAttribute = dispatchEvents[i].attributes.find((a) => a.key === MESSAGE_DESTINATION_ATTRIBUTE_KEY);
            assert(idAttribute, 'No message id attribute found in dispatch event');
            assert(destAttribute, 'No destination attribute found in dispatch event');
            result.push({
                messageId: ensure0x(idAttribute.value),
                destination: this.multiProvider.getChainName(destAttribute.value),
            });
        }
        return result;
    }
    async waitForMessageProcessed(_messageId, _destination, _delayMs, _maxAttempts) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=CosmWasmCoreAdapter.js.map