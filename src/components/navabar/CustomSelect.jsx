import useOrgStore from "../../store/orgStore.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore.js";
export const CustomSelect = ({ onChange }) => {
  const { userOrgs, switchOrg } = useOrgStore();
  const { setCurrentOrg, currentOrg } = useAuthStore(); // from API: [{ orgId, orgName, ... }]

  const navigate = useNavigate();
  // console.log("currentOrg", currentOrg);
  console.log(currentOrg, "currentOrg");
  const handleChange = (selectedOrgId) => {
    const selectedOrg = userOrgs.find((org) => org.orgId === selectedOrgId);
    if (selectedOrg) {
      let newOrg = {
        orgId: selectedOrg.orgId,
        orgName: selectedOrg.orgName,
      };
      localStorage.setItem("orgName", selectedOrg.orgName);
      localStorage.setItem("orgId", selectedOrg.orgId);
      console.log("Switched Organization:");
      console.log("Org Name:", newOrg.orgName);
      console.log("Org ID:", newOrg.orgId);
      setCurrentOrg(newOrg);
      switchOrgfuntion({ orgId: newOrg.orgId });

      onChange?.(newOrg);
    }
  };

  const otherOrgs = userOrgs.filter((org) => org.orgId !== currentOrg?.orgId);
  const switchOrgfuntion = async ({ orgId }) => {
    try {
      console.log("orgId at switchOrg", orgId);

      const getnewOrg = await switchOrg(orgId);
      console.log("getnewOrg", getnewOrg);

      if (getnewOrg) {
        const orgName = localStorage.getItem("orgName"); // Get the orgName from local storage and use it
        console.log("orgName", orgName);

        navigate(`/${orgName}/dashboard`);
      }
    } catch (error) {}
  };

  return (
    <Select value={currentOrg?.orgId || ""} onValueChange={handleChange}>
      <SelectTrigger className="w-[220px] py-5 border border-blue-500 text-md">
        <SelectValue placeholder="Select organization">
          {currentOrg?.orgName}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem key={currentOrg?.orgId} value={currentOrg?.orgId}>
          {currentOrg?.orgName}
        </SelectItem>
        {otherOrgs.map((org) => (
          <SelectItem key={org.orgId} value={org.orgId}>
            {org.orgName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
