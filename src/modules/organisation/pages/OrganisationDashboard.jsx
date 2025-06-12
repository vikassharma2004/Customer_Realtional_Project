import SubHeader from "@/Layouts/SubHeader";
import { useEffect } from "react";
import useOrgStore from "@/store/orgStore";
import Loader from "@/components/Loader";
const OrganisationDashboard = () => {
  const {fetchUserOrgs,loading} = useOrgStore();
  const orgname = localStorage.getItem("orgName");

  useEffect(() => {
    fetchUserOrgs();
  }, []);

  if(loading){ <Loader/>}
  
  return (
    <>
      <SubHeader
        title="Organisation Dashboard"
        btnLink={`/${orgname}/organisation/manage`}
        btnTitle={"Manage Organisation"}
      />
    </>
  );
};

export default OrganisationDashboard;
