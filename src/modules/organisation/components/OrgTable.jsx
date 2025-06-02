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

const OrgTable = ({ orgs, selectedOrg, setSelectedOrg, headers = [], orgName }) => {
  const tableHeader = (
    <TableRow className="bg-white border-b rounded-md">
      <TableHead className="w-12 text-center p-3 text-[#2E46BA] font-semibold cursor-pointer rounded-md"></TableHead>
      {headers.map((header, index) => (
        <TableHead
          key={index}
          className="w-24 text-center p-3 text-xl text-[#2E46BA] font-semibold cursor-pointer rounded-md"
        >
          {header}
        </TableHead>
      ))}
    </TableRow>
  );

  return (
    <div className="rounded-2xl bg-white">
      <CustomTable header={tableHeader} className="rounded-2xl">
        {orgs.map((org) => (
          <TableRow
            key={org.id}
            className={`hover:bg-gray-50 cursor-pointer rounded-2xl ${
              selectedOrg?.id === org.id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelectedOrg(org)}
          >
            <TableCell className="text-center p-5">
              <input
                type="radio"
                name="selectOrg"
                checked={selectedOrg?.id === org.id}
                onChange={() => setSelectedOrg(org)}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer h-4 w-4"
              />
            </TableCell>
            <TableCell className="p-5">{org.id}</TableCell>
            <TableCell className="p-5">{org.name}</TableCell>
            <TableCell className="p-5">{org.createdAt}</TableCell>
            <TableCell className="p-5">{org.totalUsers}</TableCell>
            <TableCell className="p-5">{org.billingPlan}</TableCell>
            <TableCell className="text-center p-5">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={`/${orgName}/dashboard/org/profile/${org.id}`}
                      className="inline-block text-green-600 hover:text-green-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pencil size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Edit Organisation</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </div>
  );
};

export default OrgTable;
