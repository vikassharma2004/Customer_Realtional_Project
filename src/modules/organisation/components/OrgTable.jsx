import React from "react";
import { Link } from "react-router-dom";
import { TableRow, TableHead, TableCell } from "@/components/ui/table";
import CustomTable from "@/components/common/CustomTable";
import { Pencil } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { useRoleBadge } from "@/Hooks/useRoleBadge";

const OrgTable = ({
  orgs = [], // Provide default empty array
  selectedOrg,
  setSelectedOrg,
  headers = [],
  orgName,
}) => {
  if (!orgs.length) {
    return <div className="p-4 text-center">No organizations found</div>;
  }

  const tableHeader = (
    <TableRow className="bg-white border-b rounded-md">
      <TableHead className="w-12 text-center p-3 text-[#2E46BA] font-semibold cursor-pointer rounded-md"></TableHead>
      {headers.map((header, index) => (
        <TableHead
          key={index}
          className="w-24 text-center p-3 text-sm text-[#2E46BA] font-semibold cursor-pointer rounded-md"
        >
          {header}
        </TableHead>
      ))}
    </TableRow>
  );

  return (
    <div className="rounded-2xl">
      <CustomTable header={tableHeader} className="rounded-2xl">
        {orgs.map((org) => {
          const roleClass = useRoleBadge(org.role); // ✅ Hook inside a function body

          return (
            <TableRow
              key={org.orgId}
              className={`hover:bg-gray-50 cursor-pointer rounded-2xl ${
                selectedOrg?.orgId === org.orgId ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedOrg(org)}
            >
              <TableCell className="text-center p-2">
                <input
                  type="radio"
                  name="selectOrg"
                  checked={selectedOrg?.orgId === org.orgId}
                  onChange={() => setSelectedOrg(org)}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer h-4 w-4"
                />
              </TableCell>

              <TableCell className="p-2 text-center">
                {org.employeeId}
              </TableCell>
              <TableCell className="p-2 text-center">{org.orgName}</TableCell>
              <TableCell className="p-2 text-center">
                {org.contactEmail}
              </TableCell>

              <TableCell className="p-4 text-center">
                <span
                  className={`px-2 py-2 rounded-full text-xs font-semibold ${roleClass}`}
                >
                  {org.role}
                </span>
              </TableCell>
        
                <TableCell className="text-center p-5">
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          to={`/${orgName}/organisation-profile/${org.orgId}`}
                          className="inline-block text-green-600 hover:text-green-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          view
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-800 text-white p-2 rounded text-xs">
                        Edit Organisation
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
          
            </TableRow>
          );
        })}
      </CustomTable>
    </div>
  );
};

export default OrgTable;
