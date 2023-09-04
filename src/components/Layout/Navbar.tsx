import {useEffect, useMemo, useState} from 'react';
import {createStyles, getStylesRef, Navbar, Paper, rem, Stack} from '@mantine/core';
import {IconNews, IconPencil,} from '@tabler/icons-react';
import {Link, useLocation} from "react-router-dom";

const useStyles = createStyles((theme) => ({
    header: {
        paddingBottom: theme.spacing.md,
        marginBottom: `calc(${theme.spacing.md} * 1.5)`,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
    },

    link: {
        ...theme.fn.focusStyles(),
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,

            [`& .${getStylesRef('icon')}`]: {
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
        },
    },

    linkIcon: {
        ref: getStylesRef('icon'),
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        marginRight: theme.spacing.sm,
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
            [`& .${getStylesRef('icon')}`]: {
                color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
            },
        },
    },
}));


export const NavbarSimple = ({opened, setOpenedNavbar}: { opened: boolean, setOpenedNavbar: any }) => {
    const {classes, cx} = useStyles();
    const [active, setActive] = useState('Billing');
    const {pathname} = useLocation()

    const data = useMemo(() => {
        const baseData = [
            {link: '/create-campaign', label: 'Create campaign', icon: IconPencil},
            {link: '/campaigns', label: 'Campaigns', icon: IconNews},
        ];
        return baseData;
    }, []);

    useEffect(() => {
        setActive(pathname)
    }, [pathname])

    const links = data.map((item) => (
        <Link
            className={cx(classes.link, {[classes.linkActive]: item.link === active})}
            to={item.link}
            key={item.label}
            onClick={() => {
                setOpenedNavbar(false)
                setActive(item.link)
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5}/>
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <Navbar  hiddenBreakpoint="sm" hidden={!opened} width={{sm: 250, lg: 300}} p="md">
            <Navbar.Section>
                <Stack>
                    <Paper shadow="sm" radius="md" withBorder p="xs">
                        {links}
                    </Paper>
                </Stack>
            </Navbar.Section>
        </Navbar>
    );
};