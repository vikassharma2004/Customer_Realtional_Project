import AllUser from "../pages/AllUser.jsx";
import MainLayout from "@/Layouts/MainLayout.jsx";
export const UserRoutes = [ 
    {
        path: "/:orgName/organisation",
        element: <MainLayout />,
        children: [
            {
                path: "users/manage",
                element: <AllUser />,
            },
              {
                path: "users/create",
                element: <AllUser />,
            },
        ],
    },

];