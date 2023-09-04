export const formatShortAddress = (inputString: string, maxLength = 20) => {
    if (inputString.length <= maxLength) return inputString;
    const prefixLength = Math.floor((maxLength - 3) / 2);
    const suffixLength = maxLength - prefixLength - 3;
    const prefix = inputString.substring(0, prefixLength);
    const suffix = inputString.substring(inputString.length - suffixLength);
    return `${prefix}...${suffix}`;
};
