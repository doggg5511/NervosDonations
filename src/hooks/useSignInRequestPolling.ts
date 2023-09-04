import { polling } from "@peersyst/react-utils";
import signInRequestPolling from "@/apis/signInRequestPolling.ts";
import { notifications } from "@mantine/notifications";

const useSignInRequestPolling = (signInToken: string, onSuccess: () => void) => {
  const handleStatus = (data: any) => {
    if(data.status !== 'pending' && data.status !== 'signed') {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Session ' + data.status,
      })
    }
    return data.status === "pending";
  };

  const poll = async () => {
    await polling(() => signInRequestPolling(signInToken), handleStatus, { delay: 1000,  });
    onSuccess();
  };

  return { poll };
};
export default useSignInRequestPolling
