import Leads from "../pages/Leads.jsx";
// import AddLead from "../pages/AddLead.jsx"
import MainLayout from "@/Layouts/MainLayout.jsx";
export const LeadRoutes = [ 
    {
        path: "/:orgName",
        element: <MainLayout />,
        children: [
            {
                path: "leads",
                element: <Leads />,
            },
            // {
            //     path: "leads/add-lead",
            //     element: <AddLead />,
            // }
        ],
    },

];