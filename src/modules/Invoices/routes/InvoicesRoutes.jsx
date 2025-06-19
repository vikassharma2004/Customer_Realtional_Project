import Invoices from "../pages/Invoices.jsx";
import AddInvoices from "../pages/AddInvoice.jsx"
import MainLayout from "@/Layouts/MainLayout.jsx";
import InvoiceDetailPage from "../pages/InvoiceDetailPage.jsx";
export const InvoicesRoutes = [ 
    {
        path: "/:orgName",
        element: <MainLayout />,
        children: [
            {
                path: "invoices",
                element: <Invoices />,
            },
            {
                path: "invoices/add-invoice",
                element: <AddInvoices />,
            },
            {
                path: "invoices/invoice-details/:id",
                element: <InvoiceDetailPage />,
            }
        ],
    },

];