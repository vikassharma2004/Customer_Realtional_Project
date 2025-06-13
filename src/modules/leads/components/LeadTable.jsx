import React, { useState, useEffect } from "react";
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

import { dummyLeads } from "@/utils/leaddata.js";

const tabOptions = ["All", "Hold", "Lost", "Deleted"];
const headers = ["Name", "Email", "City", "Country", "Status", "Actions"];

const LeadTable = ({ orgName }) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedLead, setSelectedLead] = useState(null);
  const [filteredLeads, setFilteredLeads] = useState([]);

  useEffect(() => {
    if (selectedTab === "All") {
      setFilteredLeads(dummyLeads);
    } else {
      const filtered = dummyLeads.filter(
        (lead) => lead.status === selectedTab
      );
      setFilteredLeads(filtered);
    }
  }, [selectedTab]);

  const tableHeader = (
    <TableRow className="border-b rounded-md w-full">
      <TableHead className="w-12 text-center p-3 text-[#2E46BA] font-semibold cursor-pointer rounded-md">
        {/* Checkbox Header */}
      </TableHead>
      {headers.map((header, idx) => (
        <TableHead
          key={idx}
          className="w-24 text-center p-3 text-sm text-[#2E46BA] font-semibold cursor-pointer"
        >
          {header}
        </TableHead>
      ))}
    </TableRow>
  );

  return (
    <div className="rounded-2xl p-4 bg-white">
      {/* Tabs */}
      <div className="flex justify-start space-x-6 mb-4 border-b pb-2">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-1 font-semibold text-sm ${
              selectedTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <CustomTable header={tableHeader} className="rounded-2xl">
        {filteredLeads.length > 0 ? (
          filteredLeads.map((lead) => (
            <TableRow
              key={lead._id}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedLead?._id === lead._id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedLead(lead)}
            >
              <TableCell className="text-center p-1">
                <input
                  type="radio"
                  name="selectLead"
                  checked={selectedLead?._id === lead._id}
                  onChange={() => setSelectedLead(lead)}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer h-4 w-4"
                />
              </TableCell>
              <TableCell className="p-2 text-center">{`${lead.firstName} ${lead.lastName}`}</TableCell>
              <TableCell className="p-2 text-center">{lead.email}</TableCell>
              <TableCell className="p-2 text-center">{lead.city}</TableCell>
              <TableCell className="p-2 text-center">{lead.country}</TableCell>
              <TableCell className="p-2 text-center">{lead.status}</TableCell>
              <TableCell className="text-center p-2">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        to={`/${orgName}/dashboard/lead/profile/${lead._id}`}
                        className="inline-block text-green-600 hover:text-green-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Pencil size={18} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Edit Lead</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length + 1} className="text-center py-10 text-gray-500">
              No Leads To Show
            </td>
          </tr>
        )}
      </CustomTable>
    </div>
  );
};

export default LeadTable;
