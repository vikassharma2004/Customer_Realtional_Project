import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SubHeader from "@/Layouts/SubHeader";
import CRMPageLayout from "@/Layouts/CRMPageLayout";
import LeadDetails from "../components/LeadDetails";
import LeadTable from "../components/LeadTable";
import Pagination from "../components/Pagination";
import RecentActivity from "@/components/common/RecentAcitvity";
import dummyLeads from "../../../utils/leaddata.js";

const showPerPage = 10;
const header = ["Name", "Email", "Phone", "Actions"];

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

const Leads = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [pagination, setPagination] = useState({ start: 0, end: showPerPage });
  const [loading, setLoading] = useState(true);
  const orgName = localStorage.getItem("orgName");

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAllLeads(dummyLeads);
      setSelectedLead(dummyLeads[0] || null);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onPaginationChange = (start, end) => {
    setPagination({ start, end });
  };

  return (
    <div className="relative">
      <SubHeader title="Your Leads" />
      <CRMPageLayout
        details={
          loading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 bg-black/10" />
              <Skeleton className="h-4 w-full bg-black/10" />
              <Skeleton className="h-4 w-5/6 bg-black/10" />
              <Skeleton className="h-4 w-2/3 bg-black/10" />
              <Skeleton className="h-4 w-1/2 bg-black/10" />
            </div>
          ) : (
            <LeadDetails lead={selectedLead} />
          )
        }
        main={
          loading ? (
            <div className="space-y-2 hide-scrollbar">
              {Array.from({ length: showPerPage }).map((_, i) => (
                <Skeleton key={i} className="h-10 bg-black/5 rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              <LeadTable
                leads={allLeads.slice(pagination.start, pagination.end)}
                selectedLead={selectedLead}
                setSelectedLead={setSelectedLead}
                orgName={orgName}
                headers={header}
              />
              <div className="mt-6">
                <Pagination
                  showPerPage={showPerPage}
                  onPaginationChange={onPaginationChange}
                  total={allLeads.length}
                />
              </div>
            </>
          )
        }
        right={
          loading ? (
            <div className="space-y-2">
              <Skeleton className="h-15 w-full bg-black/10" />
              <Skeleton className="h-15 w-full bg-black/10" />
              <Skeleton className="h-15 w-full bg-black/10" />
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

export default Leads;
