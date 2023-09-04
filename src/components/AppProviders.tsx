import {MantineProvider} from "@mantine/core";
import {ErrorBoundary} from "react-error-boundary";
import ErrorPage from "../pages/ErrorPage";
import {Notifications} from "@mantine/notifications";
import AppRoutes from "./AppRoutes.tsx";

const AppProviders = () => {
    return <ErrorBoundary FallbackComponent={ErrorPage}>
        <MantineProvider
            withGlobalStyles
            withCSSVariables
            withNormalizeCSS
            theme={{
                colorScheme: 'light',
            }}
        >
            <Notifications/>
            <AppRoutes/>
        </MantineProvider>
    </ErrorBoundary>
}

export default AppProviders