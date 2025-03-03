import { z } from 'zod';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { TokenType } from '../token/config.js';
import { ChainMap } from '../types.js';
declare const TokenConfigSchema: z.ZodObject<{
    protocolType: z.ZodNativeEnum<typeof ProtocolType>;
    type: z.ZodNativeEnum<typeof TokenType>;
    hypAddress: z.ZodString;
    tokenAddress: z.ZodOptional<z.ZodString>;
    tokenCoinGeckoId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    symbol: z.ZodString;
    decimals: z.ZodNumber;
    isSpl2022: z.ZodOptional<z.ZodBoolean>;
    ibcDenom: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    symbol: string;
    type: TokenType;
    name: string;
    decimals: number;
    protocolType: ProtocolType;
    hypAddress: string;
    tokenAddress?: string | undefined;
    tokenCoinGeckoId?: string | undefined;
    isSpl2022?: boolean | undefined;
    ibcDenom?: string | undefined;
}, {
    symbol: string;
    type: TokenType;
    name: string;
    decimals: number;
    protocolType: ProtocolType;
    hypAddress: string;
    tokenAddress?: string | undefined;
    tokenCoinGeckoId?: string | undefined;
    isSpl2022?: boolean | undefined;
    ibcDenom?: string | undefined;
}>;
export declare const WarpRouteConfigSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    timeStamp: z.ZodOptional<z.ZodString>;
    deployer: z.ZodOptional<z.ZodString>;
    data: z.ZodObject<{
        config: z.ZodRecord<z.ZodString, z.ZodObject<{
            protocolType: z.ZodNativeEnum<typeof ProtocolType>;
            type: z.ZodNativeEnum<typeof TokenType>;
            hypAddress: z.ZodString;
            tokenAddress: z.ZodOptional<z.ZodString>;
            tokenCoinGeckoId: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            symbol: z.ZodString;
            decimals: z.ZodNumber;
            isSpl2022: z.ZodOptional<z.ZodBoolean>;
            ibcDenom: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            symbol: string;
            type: TokenType;
            name: string;
            decimals: number;
            protocolType: ProtocolType;
            hypAddress: string;
            tokenAddress?: string | undefined;
            tokenCoinGeckoId?: string | undefined;
            isSpl2022?: boolean | undefined;
            ibcDenom?: string | undefined;
        }, {
            symbol: string;
            type: TokenType;
            name: string;
            decimals: number;
            protocolType: ProtocolType;
            hypAddress: string;
            tokenAddress?: string | undefined;
            tokenCoinGeckoId?: string | undefined;
            isSpl2022?: boolean | undefined;
            ibcDenom?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        config: Record<string, {
            symbol: string;
            type: TokenType;
            name: string;
            decimals: number;
            protocolType: ProtocolType;
            hypAddress: string;
            tokenAddress?: string | undefined;
            tokenCoinGeckoId?: string | undefined;
            isSpl2022?: boolean | undefined;
            ibcDenom?: string | undefined;
        }>;
    }, {
        config: Record<string, {
            symbol: string;
            type: TokenType;
            name: string;
            decimals: number;
            protocolType: ProtocolType;
            hypAddress: string;
            tokenAddress?: string | undefined;
            tokenCoinGeckoId?: string | undefined;
            isSpl2022?: boolean | undefined;
            ibcDenom?: string | undefined;
        }>;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        config: Record<string, {
            symbol: string;
            type: TokenType;
            name: string;
            decimals: number;
            protocolType: ProtocolType;
            hypAddress: string;
            tokenAddress?: string | undefined;
            tokenCoinGeckoId?: string | undefined;
            isSpl2022?: boolean | undefined;
            ibcDenom?: string | undefined;
        }>;
    };
    description?: string | undefined;
    timeStamp?: string | undefined;
    deployer?: string | undefined;
}, {
    data: {
        config: Record<string, {
            symbol: string;
            type: TokenType;
            name: string;
            decimals: number;
            protocolType: ProtocolType;
            hypAddress: string;
            tokenAddress?: string | undefined;
            tokenCoinGeckoId?: string | undefined;
            isSpl2022?: boolean | undefined;
            ibcDenom?: string | undefined;
        }>;
    };
    description?: string | undefined;
    timeStamp?: string | undefined;
    deployer?: string | undefined;
}>;
export type WarpRouteConfig = ChainMap<z.infer<typeof TokenConfigSchema>>;
export {};
//# sourceMappingURL=warpRouteConfig.d.ts.map