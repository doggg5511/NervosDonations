import axios from "axios";
import {CKBULL_API_URL} from "@/utils/constants.ts";

const transactionRequestPolling = async (transactionRequestToken: string) => axios.get(`${CKBULL_API_URL}transaction-request/${encodeURIComponent(transactionRequestToken)}/status`).then((res) => {
  return res.data;
});
export default transactionRequestPolling
