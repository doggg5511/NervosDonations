import axios from "axios";
import CryptoJS from "crypto-js";
import {convertCKBToShannons} from "../utils/convertCKBToShannons.ts";
import {CKBULL_API_URL} from "@/utils/constants.ts";

const transactionRequest = async (signInToken: string, amount: number, to: string) => {
    const timestamp = Math.floor(Date.now()).toString();
    const secretKey = import.meta.env.VITE_API_SECRET
    let signature = CryptoJS.HmacSHA512(timestamp, secretKey).toString(CryptoJS.enc.Base64)
    const headers = {
        "x-api-key": import.meta.env.VITE_API_KEY,
        "x-signature": signature,
        "x-timestamp": timestamp,
    }
    const { data: transaction} = await axios.post(`${CKBULL_API_URL}transaction-request/generate-native-token-transaction`, {
        "to": to,
        "amount": BigInt(convertCKBToShannons(amount)).toString(),
    })
    const body = {
        "signInToken": signInToken,
        "transaction": transaction,
    }
    const response = await axios.post(`${CKBULL_API_URL}transaction-request`, body, { headers })
    return response.data
};
export default transactionRequest
