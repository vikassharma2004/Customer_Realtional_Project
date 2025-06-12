import Firms from "../pages/Firms.jsx";
import AddFirm from "../pages/AddFirm.jsx"
import MainLayout from "@/Layouts/MainLayout.jsx";
export const FirmRoutes = [ 
    {
        path: "/:orgName",
        element: <MainLayout />,
        children: [
            {
                path: "firms",
                element: <Firms />,
            },
            {
                path: "firms/add-firm",
                element: <AddFirm />,
            }
        ],
    },

];