import { WarpCore, MultiProtocolProvider, type WarpCoreConfig, TokenStandard, EthersV5Provider } from '@hyperlane-xyz/sdk';
import { chainMetadata } from '@hyperlane-xyz/registry';
import { toWei } from '@hyperlane-xyz/utils';
import { Wallet } from "@ethersproject/wallet";

// Chains
const useChainMetadata = {
    arbitrum: chainMetadata["arbitrum"],
    base: chainMetadata["base"]
}
const provider = new MultiProtocolProvider(useChainMetadata);

// https://github.com/BootNodeDev/intents-framework/blob/main/solidity/src/Hyperlane7683.sol
// Router
const router = "0x9245A985d2055CeA7576B293Da8649bb6C5af9D0";
// USDC (arbitrum)
const USDC_ARB = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831';
// USDC (base)
const USDC_BASE = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

// Bridge Tokens
const warpRouteConfigs: WarpCoreConfig = {
    tokens: [
        {
            chainName: "arbitrum",
            standard: TokenStandard.Intent,
            addressOrDenom: USDC_ARB,
            collateralAddressOrDenom: router,
            decimals: 6,
            symbol: "USDC",
            name: "USD Coin",
            connections: [
                {
                    token: "ethereum|base|" + USDC_BASE // protocol| destination chain | destination token address
                }
            ]
        },
        {
            chainName: "base",
            standard: TokenStandard.Intent,
            addressOrDenom: USDC_BASE,
            collateralAddressOrDenom: router, 
            decimals: 6,
            symbol: "USDC",
            name: "USD Coin",
            connections: [
                {
                    token: "ethereum|arbitrum|" + USDC_ARB
                }
            ]
        }
    ],
    options: {
        interchainFeeConstants: [
            {
                amount: 5e4,
                origin: 'arbitrum',
                destination:'base',
                addressOrDenom: USDC_ARB,
              },
              {
                amount: 5e4,
                origin: 'base',
                destination:'arbitrum',
                addressOrDenom: USDC_BASE,
              }
        ]
    }
}

// Tx build params
const warpCore = WarpCore.FromConfig(provider, warpRouteConfigs);
const originToken = warpCore.tokens[0];
const destination = "base";
const sender = "0x306Bb8081C7dD356eA951795Ce4072e6e4bFdC32";
const recipient = "0x306Bb8081C7dD356eA951795Ce4072e6e4bFdC32";
const privateKey = "";

const fee = await warpCore.estimateTransferRemoteFees({
    originToken,
    destination,
    sender: "0x306Bb8081C7dD356eA951795Ce4072e6e4bFdC32"
});
const interchainFee = fee.interchainQuote

// 1 USDC_BASE
const weiAmountString = toWei("1", originToken.decimals)
const txs = await warpCore.getTransferRemoteTxs({
    originTokenAmount: originToken.amount(BigInt(weiAmountString) + interchainFee.amount),
    destination: "base",
    sender,
    recipient,
    interchainFee
});
// console.log(txs);

// JsonRpcProvider
const typedProvider: EthersV5Provider = provider.getProvider(originToken.chainName) as EthersV5Provider;
const wallet = new Wallet(privateKey, typedProvider.provider);

// Send txs
for (const t of txs) {
    const transaction = t.transaction;
    console.log(`Send ${t.category} tx`);
    
    if ('to' in transaction && 'data' in transaction) {
        const resp = await wallet.sendTransaction({
            to: transaction.to,
            data: transaction.data,
        });
        console.log("Tx hash", resp.hash);
    }
    
};