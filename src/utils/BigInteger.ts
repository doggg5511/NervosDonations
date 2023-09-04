import BN from 'big-integer'

export class BigInteger {
    static eq(a: any, b: any) {
        return BN(a).equals(b);
    }

    static gt(a: any, b: any) {
        return BN(a).greater(b);
    }

    static gte(a: any, b: any) {
        return BN(a).greaterOrEquals(b);
    }

    static exp(a: any, b: any) {
        return BN(a).pow(b).toString();
    }

    static mul(a: any, b: any) {
        return BN(a).times(b).toString();
    }

    static minus(a: any, b: any) {
        return BN(a).subtract(b).toString();
    }

    static add(a: any, b: any) {
        return BN(a).add(b).toString();
    }

    static div(a: any, b: any) {
        return BN(a).divide(b).toString();
    }
}

