import axios from "axios";
import {CKBULL_API_URL} from "@/utils/constants.ts";

const signInRequestPolling = async (signInToken: string) => axios.get(`${CKBULL_API_URL}sign-in-requests/${encodeURIComponent(signInToken)}/status`).then((res) => {
  return res.data;
});
export default signInRequestPolling
