import { Numberish } from '@hyperlane-xyz/utils';
import type { IToken } from './IToken.js';
export declare class TokenAmount {
    readonly token: IToken;
    readonly amount: bigint;
    constructor(_amount: Numberish, token: IToken);
    getDecimalFormattedAmount(): number;
    plus(amount: Numberish): TokenAmount;
    minus(amount: Numberish): TokenAmount;
    equals(tokenAmount: TokenAmount): boolean;
}
//# sourceMappingURL=TokenAmount.d.ts.map