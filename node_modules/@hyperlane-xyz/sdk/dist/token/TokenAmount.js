import { fromWei } from '@hyperlane-xyz/utils';
export class TokenAmount {
    token;
    amount;
    constructor(_amount, token) {
        this.token = token;
        this.amount = BigInt(_amount);
    }
    getDecimalFormattedAmount() {
        return Number(fromWei(this.amount.toString(), this.token.decimals));
    }
    plus(amount) {
        return new TokenAmount(this.amount + BigInt(amount), this.token);
    }
    minus(amount) {
        return new TokenAmount(this.amount - BigInt(amount), this.token);
    }
    equals(tokenAmount) {
        return (this.amount === tokenAmount.amount && this.token.equals(tokenAmount.token));
    }
}
//# sourceMappingURL=TokenAmount.js.map