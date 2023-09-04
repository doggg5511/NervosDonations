import QRCode from "react-qr-code";
import {useAuthStore} from "../store/useAuthStore.tsx";
import {Button, Flex, Modal, Paper} from "@mantine/core";

type LoginModalProps = {
    opened: any,
    close: any
}

const LoginModal = (({opened, close}: LoginModalProps) => {
    const {signInToken} = useAuthStore();

    return (
        <Modal  opened={opened} onClose={close} title="Scan this QR code with CKBull Wallet to log in" centered>
            <Flex align={'center'} justify={'center'} w={'100%'} my={'md'}>
                <Paper withBorder shadow={'md'} p={'xs'}>
                <QRCode value={signInToken} size={220}/>
                </Paper>
            </Flex>
            <Button fullWidth onClick={close}>
                Close
            </Button>
        </Modal>
    );
});

export default LoginModal;
