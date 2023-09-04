import { polling } from "@peersyst/react-utils";
import transactionRequestPolling from "@/apis/transactionRequestPolling.ts";

const useTransactionRequestPolling = (transactionRequestToken: string, onSuccess: () => void) => {
  const handleStatus = (data: any) => {
    return data.status === "pending";
  };

  const poll = async () => {
    await polling(() => transactionRequestPolling(transactionRequestToken), handleStatus, { delay: 1000 });
    onSuccess();
  };

  return { poll };
};

export default useTransactionRequestPolling
