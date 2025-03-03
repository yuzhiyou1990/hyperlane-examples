import { z } from 'zod';
import { ProtocolType, assert } from '@hyperlane-xyz/utils';
import { ZChainName } from '../metadata/customZodTypes.js';
export var TokenConnectionType;
(function (TokenConnectionType) {
    TokenConnectionType["Hyperlane"] = "hyperlane";
    TokenConnectionType["Ibc"] = "ibc";
    TokenConnectionType["IbcHyperlane"] = "ibc-hyperlane";
})(TokenConnectionType || (TokenConnectionType = {}));
const TokenConnectionRegex = /^(.+)|(.+)|(.+)$/;
// Distinct from type above in that it uses a
// serialized representation of the tokens instead
// of the possibly recursive Token references
export const TokenConnectionConfigSchema = z
    .object({
    type: z.literal(TokenConnectionType.Hyperlane).optional(),
    token: z.string().regex(TokenConnectionRegex),
})
    .or(z.object({
    type: z.literal(TokenConnectionType.Ibc),
    token: z.string().regex(TokenConnectionRegex),
    sourcePort: z.string(),
    sourceChannel: z.string(),
}))
    .or(z.object({
    type: z.literal(TokenConnectionType.IbcHyperlane),
    token: z.string().regex(TokenConnectionRegex),
    sourcePort: z.string(),
    sourceChannel: z.string(),
    intermediateChainName: ZChainName,
    intermediateIbcDenom: z.string(),
    intermediateRouterAddress: z.string(),
}));
export function getTokenConnectionId(protocol, chainName, address) {
    assert(protocol && chainName && address, 'Invalid token connection id params');
    return `${protocol}|${chainName}|${address}`;
}
export function parseTokenConnectionId(data) {
    assert(TokenConnectionRegex.test(data), `Invalid token connection id: ${data}`);
    const [protocol, chainName, addressOrDenom] = data.split('|');
    assert(Object.values(ProtocolType).includes(protocol), `Invalid protocol: ${protocol}`);
    return { protocol, chainName, addressOrDenom };
}
//# sourceMappingURL=TokenConnection.js.map