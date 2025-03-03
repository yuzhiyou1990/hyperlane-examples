import { z } from 'zod';
import { Address, ProtocolType } from '@hyperlane-xyz/utils';
import { ChainName } from '../types.js';
import type { IToken } from './IToken.js';
export declare enum TokenConnectionType {
    Hyperlane = "hyperlane",
    Ibc = "ibc",
    IbcHyperlane = "ibc-hyperlane"
}
interface TokenConnectionBase {
    type?: TokenConnectionType;
    token: IToken;
}
export interface HyperlaneTokenConnection extends TokenConnectionBase {
    type?: TokenConnectionType.Hyperlane;
}
export interface IbcTokenConnection extends TokenConnectionBase {
    type: TokenConnectionType.Ibc;
    sourcePort: string;
    sourceChannel: string;
}
export interface IbcToHyperlaneTokenConnection extends TokenConnectionBase {
    type: TokenConnectionType.IbcHyperlane;
    sourcePort: string;
    sourceChannel: string;
    intermediateChainName: ChainName;
    intermediateIbcDenom: string;
    intermediateRouterAddress: Address;
}
export type TokenConnection = HyperlaneTokenConnection | IbcTokenConnection | IbcToHyperlaneTokenConnection;
export declare const TokenConnectionConfigSchema: z.ZodUnion<[z.ZodUnion<[z.ZodObject<{
    type: z.ZodOptional<z.ZodLiteral<TokenConnectionType.Hyperlane>>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
    type?: TokenConnectionType.Hyperlane | undefined;
}, {
    token: string;
    type?: TokenConnectionType.Hyperlane | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<TokenConnectionType.Ibc>;
    token: z.ZodString;
    sourcePort: z.ZodString;
    sourceChannel: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenConnectionType.Ibc;
    token: string;
    sourcePort: string;
    sourceChannel: string;
}, {
    type: TokenConnectionType.Ibc;
    token: string;
    sourcePort: string;
    sourceChannel: string;
}>]>, z.ZodObject<{
    type: z.ZodLiteral<TokenConnectionType.IbcHyperlane>;
    token: z.ZodString;
    sourcePort: z.ZodString;
    sourceChannel: z.ZodString;
    intermediateChainName: z.ZodString;
    intermediateIbcDenom: z.ZodString;
    intermediateRouterAddress: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: TokenConnectionType.IbcHyperlane;
    token: string;
    sourcePort: string;
    sourceChannel: string;
    intermediateRouterAddress: string;
    intermediateChainName: string;
    intermediateIbcDenom: string;
}, {
    type: TokenConnectionType.IbcHyperlane;
    token: string;
    sourcePort: string;
    sourceChannel: string;
    intermediateRouterAddress: string;
    intermediateChainName: string;
    intermediateIbcDenom: string;
}>]>;
export declare function getTokenConnectionId(protocol: ProtocolType, chainName: ChainName, address: Address): string;
export declare function parseTokenConnectionId(data: string): {
    protocol: ProtocolType;
    chainName: ChainName;
    addressOrDenom: Address;
};
export {};
//# sourceMappingURL=TokenConnection.d.ts.map