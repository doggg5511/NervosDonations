import axios from "axios";
import CryptoJS from "crypto-js";
import {CKBULL_API_URL} from "@/utils/constants.ts";

const signInRequest = async () => {
    const timestamp = Math.floor(Date.now()).toString();
    const secretKey = import.meta.env.VITE_API_SECRET
    let signature = CryptoJS.HmacSHA512(timestamp, secretKey).toString(CryptoJS.enc.Base64)
    const headers = {
        "x-api-key": import.meta.env.VITE_API_KEY,
        "x-signature": signature,
        "x-timestamp": timestamp,
    }
    return await axios.post(`${CKBULL_API_URL}sign-in-requests`, {}, {headers}).then((res) => {
        return res.data;
    });
};
export default signInRequest