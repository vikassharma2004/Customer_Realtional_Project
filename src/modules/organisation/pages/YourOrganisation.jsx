import React, { useState, useEffect } from "react";
import SubHeader from "@/Layouts/SubHeader";
import OrgTable from "../components/OrgTable";
import { Skeleton } from "@/components/ui/skeleton";
import CRMPageLayout from "@/Layouts/CRMPageLayout"; // import your layout


import OrgDetails from "../components/OrgDeatils";
import RecentActivity from "@/components/common/RecentAcitvity";

const orgsData = [
  {
    id: "org-001",
    name: "Acme Corporation",
    createdAt: "2024-11-12",
    totalUsers: 15,
    billingPlan: "Pro",
  },
  {
    id: "org-002",
    name: "Globex Inc.",
    createdAt: "2023-07-08",
    totalUsers: 42,
    billingPlan: "Enterprise",
  },
  {
    id: "org-003",
    name: "Initech",
    createdAt: "2022-03-22",
    totalUsers: 8,
    billingPlan: "Free",
  },
];

const recentActivityData = [
  { action: "Updated role for Vikas Sharma", timestamp: "Just now" },
  { action: "Added new user: Pooja Gupta", timestamp: "5 mins ago" },
  { action: "Removed user: Raj Singh", timestamp: "Yesterday" },
  { action: "Reset password for Riya Singh", timestamp: "2 days ago" },
  { action: "Created new project: Apollo", timestamp: "Last week" },
  { action: "Deactivated user: Ajay Kumar", timestamp: "Last week" },
  { action: "Updated billing plan", timestamp: "2 weeks ago" },
  { action: "Added new org admin", timestamp: "3 weeks ago" },
  { action: "Modified permissions", timestamp: "3 weeks ago" },
  { action: "Exported reports", timestamp: "Last month" },
];

const YourOrganisation = () => {
  const [allOrgs, setAllOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ start: 0, end: 10 });
  const showPerPage = 10;
  const orgName = localStorage.getItem("orgName");

  const headers = ["ID", "Name", "Created At", "Total Users", "Billing Plan", "Actions"];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setAllOrgs(orgsData);
      setSelectedOrg(orgsData[0] || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const onPaginationChange = (start, end) => setPagination({ start, end });

  return (
    <>
      <SubHeader title="Your Organisation" />
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
            <OrgDetails org={selectedOrg} />
           
          )
        
        
        
      }
        
            right={
          loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10  w-full bg-black/10" />
              <Skeleton className="h-10 w-3/4  bg-black/10" />
              <Skeleton className="h-10 w-1/2 bg-black/10" />
              <Skeleton className="h-10 w-full bg-black/10" />
             
            </div>
          ) : (
            <div className="max-h-[360px] overflow-y-auto rounded-2xl shadow-inner hide-scrollbar w-full">
              <RecentActivity activities={recentActivityData} />
            </div>
          )
        }
        
        main={
          loading ? (
            <div className="space-y-4">
              {[...Array(showPerPage)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-xl bg-muted" />
              ))}
            </div>
          ) : (
            <OrgTable
              orgs={allOrgs.slice(pagination.start, pagination.end)}
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
              orgName={orgName}
              headers={headers}
              onPaginationChange={onPaginationChange}
              showPerPage={showPerPage}
              totalCount={allOrgs.length}
            />
          )
        }
      />
    </>
  );
};

export default YourOrganisation;
