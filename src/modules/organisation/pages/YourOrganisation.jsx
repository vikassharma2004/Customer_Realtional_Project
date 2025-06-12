import React, { useState, useEffect } from "react";
import SubHeader from "@/Layouts/SubHeader";
import OrgTable from "../components/OrgTable";
import { Skeleton } from "@/components/ui/skeleton";
import CRMPageLayout from "@/Layouts/CRMPageLayout"; // import your layout
import OrgDetails from "../components/OrgDeatils";
import RecentActivity from "@/components/common/RecentAcitvity";
import useOrgStore from "@/store/orgStore";



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
  const { userOrgs, fetchUserOrgs } = useOrgStore();
  const [allOrgs, setAllOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ start: 0, end: 10 });
  const showPerPage = 10;
  const orgName = localStorage.getItem("orgName");

  const headers = ["Emp ID", "Name", "Email", "Role", "Actions"];

  useEffect(() => {
    setTimeout(() => {
      fetchUserOrgs();
      if (userOrgs.length > 0) {
        setAllOrgs(userOrgs);
        setSelectedOrg(userOrgs[0]);
        setLoading(false);
      }
    }, 2000);
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
                <Skeleton key={i} className="h-10  rounded-xl bg-muted" />
              ))}
            </div>
          ) : (
            <OrgTable
              orgs={userOrgs}
              selectedOrg={selectedOrg}
              setSelectedOrg={setSelectedOrg}
              orgName={orgName}
              headers={headers}
              onPaginationChange={onPaginationChange}
              showPerPage={showPerPage}
              totalCount={allOrgs?.length}
            />
          )
        }
      />
    </>
  );
};

export default YourOrganisation;
