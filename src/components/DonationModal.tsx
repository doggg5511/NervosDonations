import React, {useState} from 'react';
import {Alert, Button, Flex, Modal, NumberInput, Stack} from "@mantine/core";
import {useForm} from "@mantine/form";
import transactionRequest from "@/apis/transactionRequest.ts";
import {useAuthStore} from "@/store/useAuthStore.tsx";

const DonationModal = ({opened, close, address}: { address: any, opened: any, close: any }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [tx, setTx] = useState(null)
    const {signInToken} = useAuthStore()

    const form = useForm<{
        amount: number
    }>({
        initialValues: {
            amount: 100
        },
        validate: {
            amount: (value) => {
                if (value < 100) return `Enter min 100!`
            }
        },
    });

    const onSubmit = (formData: typeof form.values) => {
        try {
            setIsLoading(true)
            transactionRequest(signInToken, formData.amount, address).then((data) => {
                setTx(data.transactionToken)
                setIsLoading(false)
            });
        } catch (e) {
            console.log(e)
        }
    }

    const onCloseModal = () => {
        close()
        setTx(null)
    }

    return (
        <Modal
            opened={opened}
            onClose={onCloseModal}
            title="Donate"
            centered
        >
            <form
                style={{position: 'relative', width: '100%'}}
                onSubmit={form.onSubmit(onSubmit)}
            >
                <Stack w={'100%'}>
                    <NumberInput
                        width={'100%'}
                        min={100}
                        step={1}
                        label="Amount (CKB)"
                        placeholder="Amount"
                        {...form.getInputProps('amount')}
                    />

                    <Flex gap={10}>
                        <Button loading={isLoading} type={'submit'} fullWidth>
                            Donate
                        </Button>
                        <Button variant={'outline'} type={'button'} fullWidth onClick={onCloseModal}>
                            Close
                        </Button>
                    </Flex>

                    {tx !== null &&
                        <Alert>
                            Sign transaction in your wallet
                        </Alert>
                    }
                </Stack>
            </form>
        </Modal>
    );
};

export default DonationModal;