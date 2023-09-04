import {IconCheck, IconLink} from '@tabler/icons-react';
import {
    ActionIcon,
    Badge,
    Button,
    Card,
    createStyles,
    Flex,
    Group,
    Progress,
    rem,
    Stack,
    Text,
    UnstyledButton,
} from '@mantine/core';
import {formatShortAddress} from "@/utils/utils.ts";
import {useEffect, useState} from "react";
import {BI, config, helpers, Indexer, RPC} from "@ckb-lumos/lumos";
import {CKB_INDEXER_URL, CKB_RPC_URL} from "@/utils/constants.ts";
import {useAuthStore} from "@/store/useAuthStore.tsx";
import {notifications} from "@mantine/notifications";
import {Link} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBlock: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

type CampaignCardProps = {
    address: string
    amount: number
    description: string
    setSelectedCampaignAddress: any
    openDonationModal: any
    title: string
}

export function CampaignCard({
                                 openDonationModal,
                                 setSelectedCampaignAddress,
                                 title,
                                 description,
                                 amount,
                                 address,
                             }: CampaignCardProps) {
    const {classes} = useStyles();
    const {address: userAddress} = useAuthStore()

    const rpc = new RPC(CKB_RPC_URL);
    const indexer = new Indexer(CKB_INDEXER_URL, CKB_RPC_URL);

    const [balance, setBalance] = useState<any>(0)

    const getCapacities = async (address: string) => {
        config.initializeConfig(config.predefined.AGGRON4);
        const collector = indexer.collector({
            lock: helpers.parseAddress(address),
        });
        let capacities = BI.from(0);
        for await (const cell of collector.collect()) {
            capacities = capacities.add(cell.cellOutput.capacity);
        }
        setBalance(parseInt(capacities.toString()) / 10 ** 8)
        return capacities;
    }

    const handleDonate = () => {
        if (userAddress && userAddress !== '') {
            openDonationModal()
            setSelectedCampaignAddress(address)
        } else {
            notifications.show({
                color: 'red',
                title: 'Error!',
                message: 'Login first!',
            })
        }
    }

    useEffect(() => {
        if (address && address !== '') {
            getCapacities(address)
        }
    }, [address]);

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section className={classes.section}>
                <Group position="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                    <Badge
                        pl={0}
                        leftSection={(balance * 100) / amount > 100
                            ? <ActionIcon><IconCheck size={15}/></ActionIcon>
                            : <></>
                        }
                        color={(balance * 100) / amount >= 100 ? 'green' : 'blue'}
                        style={{textTransform: 'capitalize'}}
                        size="md"
                    >
                        Collected: {balance} / {amount} CKB
                    </Badge>
                </Group>
                <Text fz="md" mt="xs">
                    {description}
                </Text>
            </Card.Section>
            <Progress
                mt={'sm'} color={(balance * 100) / amount > 100 ? 'green' : 'blue'}
                value={(balance * 100) / amount}
            />
            <Card.Section mt={'xxs'} className={classes.section}>
                <Stack spacing={0} align={'flex-start'} justify={'flex-start'}>
                    <UnstyledButton
                        target={'_blank'}
                        component={Link}
                        to={`https://pudge.explorer.nervos.org/address/${address}`}
                    >
                        <Flex gap={5} align={'center'} justify={'center'}>
                            <Text c={'dimmed'} fw={700}>
                                Campaign donation address: {' '}
                            </Text>
                            {formatShortAddress(address)}
                            <IconLink size="1rem"/>
                        </Flex>
                    </UnstyledButton>
                </Stack>
            </Card.Section>

            <Group mt="xs">
                <Button onClick={handleDonate} radius="md" style={{flex: 1}}>
                    Donate
                </Button>
            </Group>
        </Card>
    );
}