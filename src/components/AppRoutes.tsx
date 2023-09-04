import Layout from "./Layout/Layout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {NotFoundPage} from "../pages/NotFoundPage.tsx";
import CreateCampaign from "@/pages/CreateCampaign.tsx";
import CampaignsPage from "@/pages/CampaignsPage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "/", element: <CampaignsPage/>,},
            {path: "/create-campaign", element: <CreateCampaign/>,},
            {path: "/campaigns", element: <CampaignsPage/>,},
            {path: "*", element: <NotFoundPage/>},
        ],
    },
])

const AppRoutes = () => {
    return <RouterProvider router={router}/>
}

export default AppRoutes;
