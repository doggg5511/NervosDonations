import {AppShell, Container} from "@mantine/core";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import {NavbarSimple} from "./Navbar.tsx";
import {AppHeader} from "./Header.tsx";
import {useAuthStore} from "../../store/useAuthStore.tsx";
import LoginModal from "../LoginModal.tsx";
import {useDisclosure} from "@mantine/hooks";
import signInRequestById from "@/apis/signInRequestById.ts";
import useSignInRequestPolling from "../../hooks/useSignInRequestPolling.ts";
import {notifications} from "@mantine/notifications";

const Layout = () => {
    const {
        loggedIn,
        address,
        signInToken,
        setAddress,
        setLoggedIn,
        setSignInToken,
        loading,
        setLoading
    } = useAuthStore();
    const {poll} = useSignInRequestPolling(signInToken, () => handleSuccess());

    const [opened, setOpened] = useState(false);
    const [openedLoginModal, {open: openLoginModal, close: closeLoginModal}] = useDisclosure(false);
    const [isEffectRunning, setIsEffectRunning] = useState(false);

    const handleSuccess = () => {
        signInRequestById(signInToken).then((data) => {
            if (data?.status === 'signed') {
                setLoggedIn(true)
                setAddress(data.metadata.address)
                notifications.show({
                    color: 'green',
                    title: 'Successfully Sign In',
                    message: '',
                })
            } else {
                setSignInToken('')
                setAddress('')
                notifications.show({
                    color: 'red',
                    title: 'Error',
                    message: 'Session ' + data?.status,
                })
            }
            closeLoginModal();
        });
    };

    useEffect(() => {
        if (signInToken !== '')
            signInRequestById(signInToken).then((data) => {
                if (data?.status === 'signed' || data?.status === 'pending') {
                    if (data.metadata.address) {
                        setLoggedIn(true)
                        setAddress(data.metadata.address)
                    }
                } else {
                    setSignInToken('')
                    setAddress('')
                    notifications.show({
                        color: 'red',
                        title: 'Error',
                        message: data?.status,
                    })
                }
            });
    }, [signInToken]);

    useEffect(() => {
        if (!isEffectRunning && !loading && signInToken.length > 0 && openedLoginModal) {
            setIsEffectRunning(true);
            poll();
        }
    }, [isEffectRunning, loading, signInToken, openedLoginModal]);

    return (
        <AppShell
            asideOffsetBreakpoint={"sm"}
            navbarOffsetBreakpoint={"sm"}
            navbar={<NavbarSimple opened={opened} setOpenedNavbar={setOpened}/>}
            header={<AppHeader openLoginModal={openLoginModal} setOpened={setOpened} opened={opened}/>}
        >
            <Container p={{base: 0, xs: '1rem'}} size={'sm'}>
                <LoginModal opened={openedLoginModal} close={closeLoginModal}/>
                <Outlet/>
            </Container>
        </AppShell>
    );
}

export default Layout