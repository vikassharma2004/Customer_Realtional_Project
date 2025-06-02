import React, { useState, useEffect } from "react";
import SubHeader from "@/Layouts/SubHeader";
import OrgTable from "../components/OrgTable";// renamed import
import { Skeleton } from "@/components/ui/skeleton";

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

const YourOrganisation = () => {
  const [allOrgs, setAllOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ start: 0, end: 10 });
  const showPerPage = 10;
  const orgName = localStorage.getItem("orgName");

  const header = ["ID", "Name", "Created At", "Total Users", "Billing Plan", "Actions"];

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
    <div>
      <SubHeader title="Your Organisation" />
      <div className="mt-6 mx-4 bg-white shadow rounded-2xl p-4">
        {loading ? (
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
            headers={header}
          />
        )}
      </div>
    </div>
  );
};

export default YourOrganisation;
