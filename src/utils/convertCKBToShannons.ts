import {BigInteger} from "./BigInteger.ts";

const removeTrailingZeros = (amount: any) => amount.replace(/\.?0*$/, "");

const removeLeftZeros = (amount: any)=> amount.replace(/^0+/, "");

const isCientificNotation = (num: any) => num.toString().includes("e") || num.toString().includes("E");

const parseCientificNotation = (num: any) => {
    const [base, exp] = num.toString().split(/[eE]/);
    const isNegative = num.toString()[0] === "-";
    const finalBase = base.replace(/-|,/g, "");

    if (finalBase.split(".")[0].length > 1) {
        throw new TypeError("Invalid cientific notation");
    }

    const tempAmount = finalBase.replace(".", "");
    const finalExpo = Math.abs(Number(exp));

    if (exp[0] !== "-") {
        return tempAmount.padEnd(finalExpo + 1, "0");
    } else {
        const prefix = isNegative ? "-" : "";
        return prefix + "0." + "0".repeat(finalExpo - 1) + tempAmount;
    }
};

const stringifyNumber = (num: any) => {
    if (isCientificNotation(num)) {
        return parseCientificNotation(num);
    }
    return num.toString();
};

export const convertCKBToShannons = (amount: any, supportedDecimalsParam = 8) => {
    const [integer, decimals] = stringifyNumber(amount).split(".");
    const supportedDecimals = parseInt(supportedDecimalsParam.toString(), 10);
    if (decimals) {
        const cleanedDecimals = removeTrailingZeros(decimals);
        const finalNumberOfDecimals = Math.min(cleanedDecimals.length, supportedDecimals);
        const finalDecimalPart = cleanedDecimals.slice(0, finalNumberOfDecimals);
        const zerosToBeAdded = supportedDecimals - finalDecimalPart.length;
        const tempAmount = `${integer}${finalDecimalPart}`;
        const factor = BigInteger.exp("10", zerosToBeAdded.toString());
        const res = removeLeftZeros(BigInteger.mul(tempAmount, factor));
        if (res === "") return "0";
        else return res;
    } else {
        const factor = BigInteger.exp("10", supportedDecimals.toString());
        return BigInteger.mul(integer, factor);
    }
};

