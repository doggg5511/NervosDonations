import React, {useState} from 'react';
import {useForm} from "@mantine/form";
import {Button, NumberInput, Paper, Stack, Text, TextInput} from "@mantine/core";
import {createClient} from "@supabase/supabase-js";
import {useAuthStore} from "@/store/useAuthStore.tsx";
import {notifications} from "@mantine/notifications";
import {config, helpers} from "@ckb-lumos/lumos";
import {useNavigate} from "react-router-dom";

const supabase = createClient(`https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`, import.meta.env.VITE_SUPABASE_PUBLIC_KEY);

const CreateCampaign = ({}) => {
    const [isLoadingCreateCampaign, setIsLoadingCreateCampaign] = useState(false)
    const {address} = useAuthStore()
    const navigate = useNavigate()

    const form = useForm<{
        title: string,
        description: string,
        address: string,
        amount: number
    }>({
        initialValues: {
            title: '',
            description: '',
            address: '',
            amount: 100
        },
        validate: {
            description: (value) => {
                if (value.length < 1) return 'Enter description'
                else if (value.length > 300) return 'Description must be at least 300 letters'
                return null
            },
            title: (value) => {
                if (value.length < 1) return 'Enter title'
                else if (value.length > 200) return 'Title must be at least 200 letters'
                return null
            },
            address: (value) => {
                if (value.length < 1) return 'Enter address'
                return null
            },
            amount: (value) => {
                if (value < 100) return `Enter min 100!`
            }
        },
    });

    const onSubmit = async (formData: typeof form.values) => {
        if (address && address !== '') {
            let isValidAddress = true
            try {
                config.initializeConfig(config.predefined.AGGRON4);
                const tryToValidate = helpers.parseAddress(formData?.address)
                form.setFieldError('address', null)
            } catch (e: any) {
                isValidAddress = false
                form.setFieldError('address', e.message)
            }

            if (isValidAddress) {
                try {
                    setIsLoadingCreateCampaign(true)
                    const res = await supabase
                        .from('campaigns')
                        .insert({
                            title: formData?.title,
                            description: formData?.description,
                            address: formData?.address,
                            amount: formData?.amount,
                        })

                    if (res?.error?.message && res?.error?.message !== '') {
                        notifications.show({
                            color: 'red',
                            title: 'Error!',
                            message: res?.error?.message,
                        })
                        return;
                    }

                    setIsLoadingCreateCampaign(false)

                    notifications.show({
                        color: 'green',
                        title: 'Successfully created!',
                        message: '',
                    })
                    navigate('/')
                } catch (e: any) {
                    console.log(e)
                    setIsLoadingCreateCampaign(false)
                }
            }
        } else {
            setIsLoadingCreateCampaign(false)
            notifications.show({
                color: 'red',
                title: 'Error!',
                message: 'Login first!',
            })
        }
    }

    return (
        <Paper withBorder shadow={'md'} p={'sm'}>
            <Text size={30} fw={700} color={'blue'} align={'center'} mb={'sm'}>
                Create campaign
            </Text>
            <form
                style={{position: 'relative', width: '100%'}}
                onSubmit={form.onSubmit(onSubmit)}
            >
                <Stack w={'100%'}>
                    <TextInput
                        label="Title"
                        placeholder="Title"
                        {...form.getInputProps('title')}
                    />

                    <TextInput
                        label="Description"
                        placeholder="Description"
                        {...form.getInputProps('description')}
                    />

                    <TextInput
                        label="Campaign donation address"
                        placeholder="Address"
                        {...form.getInputProps('address')}
                    />

                    <NumberInput
                        width={'100%'}
                        min={100}
                        {...form.getInputProps('amount')}
                        step={1}
                        label="Target amount (CKB)"
                        placeholder="Amount"
                    />

                    {address && address !== ''
                        ? <Button
                            loading={isLoadingCreateCampaign}
                            type={'submit'}
                        >
                            Create
                        </Button>
                        : <Button
                            type={'button'}
                            onClick={() => {
                                notifications.show({
                                    color: 'red',
                                    title: 'Error!',
                                    message: 'Login first!',
                                })
                            }}
                        >
                            Create
                        </Button>
                    }
                </Stack>
            </form>
        </Paper>
    );
};

export default CreateCampaign;