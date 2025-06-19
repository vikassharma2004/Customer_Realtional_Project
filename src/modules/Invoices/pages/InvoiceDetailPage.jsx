import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SubHeader from "@/Layouts/SubHeader.jsx";
import CRMPageLayout from "@/Layouts/CRMPageLayout";
import FullDetails from "../components/Add-invoice/FullDetails.jsx";
import Options from "../components/Add-invoice/Options.jsx";
import invoicesData from "@/utils/invoicesdata";
import RecentActivity from "@/components/common/RecentAcitvity";
import { Skeleton } from "@/components/ui/skeleton";

// Dummy Recent Activity
const recentActivityData = [
  { action: "Updated role for Vikas Sharma", timestamp: "Just now" },
  { action: "Added new user: Pooja Gupta", timestamp: "5 mins ago" },
  { action: "Removed user: Raj Singh", timestamp: "Yesterday" },
  { action: "Changed billing plan to Pro", timestamp: "10 mins ago" },
  { action: "Created new organization: TechNova", timestamp: "30 mins ago" },
  { action: "Updated contact info for Nisha Verma", timestamp: "1 hour ago" },
  { action: "Assigned Manager role to Rohan Mehta", timestamp: "3 hours ago" },
  { action: "Deactivated user: Anjali Rao", timestamp: "Today, 9:30 AM" },
  { action: "Reset password for Aman Jain", timestamp: "2 days ago" },
  { action: "Updated permissions for Support module", timestamp: "Last week" },
];

const InvoiceDetailPage = () => {
  const { id: invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusHidden, setStatusHidden] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const foundInvoice = invoicesData.find((inv) => inv._id === invoiceId);
      setInvoice(foundInvoice || null);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [invoiceId]);

  return (
    <div className="relative">
      <SubHeader title="Invoice Details" />

      <CRMPageLayout
        details={
          loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full bg-black/10 rounded-xl" />
              <Skeleton className="h-10 w-3/4 bg-black/10 rounded-xl" />
              <Skeleton className="h-10 w-5/6 bg-black/10 rounded-xl" />
            </div>
          ) : invoice ? (
            <Options
              invoice={invoice}
              onToggleStatus={(hidden) => setStatusHidden(hidden)}
              statusHidden={statusHidden}
            />
          ) : null
        }
        main={
          loading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 bg-black/10" />
              <Skeleton className="h-4 w-full bg-black/10" />
              <Skeleton className="h-4 w-5/6 bg-black/10" />
              <Skeleton className="h-4 w-2/3 bg-black/10" />
              <Skeleton className="h-4 w-1/2 bg-black/10" />
            </div>
          ) : invoice ? (
            <div id="printable-content">
              <FullDetails invoice={invoice} hideStatus={statusHidden} />
            </div>
          ) : (
            <p className="text-red-500">Invoice not found.</p>
          )
        }
        right={
          loading ? (
            <div className="space-y-2">
              <Skeleton className="h-16 w-full bg-black/10 rounded-xl" />
              <Skeleton className="h-16 w-full bg-black/10 rounded-xl" />
              <Skeleton className="h-16 w-full bg-black/10 rounded-xl" />
            </div>
          ) : (
            <div className="max-h-[360px] overflow-y-auto rounded-2xl shadow-inner hide-scrollbar w-full">
              <RecentActivity activities={recentActivityData} />
            </div>
          )
        }
      />
    </div>
  );
};

export default InvoiceDetailPage;
