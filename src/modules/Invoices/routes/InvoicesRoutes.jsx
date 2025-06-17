import Invoices from "../pages/Invoices.jsx";
// import AddInvoices from "../pages/AddInvoices.jsx"
import MainLayout from "@/Layouts/MainLayout.jsx";
export const InvoicesRoutes = [ 
    {
        path: "/:orgName",
        element: <MainLayout />,
        children: [
            {
                path: "invoices",
                element: <Invoices />,
            },
            // {
            //     path: "invoices/add-invoices",
            //     element: <AddInvoices />,
            // }
        ],
    },

];