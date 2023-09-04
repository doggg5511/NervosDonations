import axios from "axios";
import {CKBULL_API_URL} from "@/utils/constants.ts";

const signInRequestById = async (signInToken: string) => await axios.get(`${CKBULL_API_URL}sign-in-requests/${encodeURIComponent(signInToken)}`).then((res) => {
  return res.data;
});
export default signInRequestById
