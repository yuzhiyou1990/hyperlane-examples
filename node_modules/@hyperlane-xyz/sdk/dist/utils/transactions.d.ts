import { EvmChainId } from '@hyperlane-xyz/utils';
import { AnnotatedEV5Transaction } from '../providers/ProviderType.js';
/**
 * Retrieves the chain ID from the first transaction and verifies all transactions
 * are for the same chain.
 *
 * @param transactions - The list of populated transactions.
 * @returns The EVM chain ID that the transactions are for.
 * @throws If the transactions are not all for the same chain ID or if chain ID is missing
 */
export declare function getChainIdFromTxs(transactions: AnnotatedEV5Transaction[]): EvmChainId;
//# sourceMappingURL=transactions.d.ts.map