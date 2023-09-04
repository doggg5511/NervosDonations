import {Box, Burger, Button, createStyles, Flex, Group, Header, MediaQuery, rem, Text,} from '@mantine/core';
import {FC} from "react";
import {Link} from "react-router-dom";
import {useAuthStore} from "../../store/useAuthStore.tsx";
import signInRequest from "@/apis/signInRequest.ts";
import {notifications} from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },
    logo: {
        color: theme?.colorScheme === 'light' ? 'dark' : '#fff',
        fontWeight: 700,
        fontSize: theme.fontSizes.xl,
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),
        '&:active': theme.activeStyles,
    },
    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
        }`,
    },
}));

type HeaderProps = {
    setOpened: any,
    opened: boolean
    openLoginModal: any
}

export const AppHeader: FC<HeaderProps> = ({setOpened, opened, openLoginModal}) => {
    const {classes, theme} = useStyles();
    const {
        loggedIn,
        address,
        setAddress,
        signInToken,
        setLoggedIn,
        setSignInToken,
        loading,
        setLoading
    } = useAuthStore();

    const handleLogin = () => {
        setLoading(true);
        if (signInToken !== undefined && signInToken !== null && signInToken !== '') {
            openLoginModal()
            setLoading(false);
        } else {
            signInRequest().then((data) => {
                setLoading(false);
                setSignInToken(data.signInToken);
                openLoginModal()
            });
        }
    }

    const handleLogout = () => {
        setSignInToken('')
        setAddress('')
        notifications.show({
            color: 'blue',
            title: 'Successfully Logout',
            message: '',
        })
    }

    return (
        <>
            <Header height={60} px="md">
                <Group position="apart" sx={{height: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                        <MediaQuery largerThan="sm" styles={{display: 'none'}}>
                            <Burger
                                opened={opened}
                                onClick={() => setOpened((o: any) => !o)}
                                size="sm"
                                color={theme.colors.gray[6]}
                                mr="xl"
                            />
                        </MediaQuery>
                        <MediaQuery smallerThan="sm" styles={{display: 'none'}}>
                            <Link to={'/'}>
                                <Flex align={'center'} gap={10}>
                                    <Text className={classes.logo}>
                                        Nervos Donations
                                    </Text>
                                </Flex>
                            </Link>
                        </MediaQuery>
                    </div>
                    <MediaQuery smallerThan={'sm'} styles={{display: "none"}}>
                        <Box miw={{base: '100%', xs: 400}}>
                        </Box>
                    </MediaQuery>
                    <Group>
                        {!(address && address !== '')
                            ? <Button
                                loading={loading}
                                onClick={handleLogin}
                            >
                                Log in with CKBull
                            </Button>
                            : <Button
                                color={'red'}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        }
                    </Group>
                </Group>
            </Header>
        </>
    );
};
