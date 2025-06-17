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

import invoicesData from "@/utils/invoicesdata.js";

const tabOptions = ["All", "Pending", "Paid", "Overdue"];
const headers = ["Invoice No.", "Firm Name", "Client Name", "Status", "Action"];

const InvoicesTable = ({ orgName, selectedInvoice, setSelectedInvoice }) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  useEffect(() => {
    if (selectedTab === "All") {
      setFilteredInvoices(invoicesData);
    } else {
      const filtered = invoicesData.filter(
        (inv) => inv.status.toLowerCase() === selectedTab.toLowerCase()
      );
      setFilteredInvoices(filtered);
    }
  }, [selectedTab]);

  const tableHeader = (
    <TableRow className="border-b rounded-md w-full">
      <TableHead className="w-12 text-center p-3 text-[#2E46BA] font-semibold rounded-md" />
      {headers.map((header, idx) => (
        <TableHead
          key={idx}
          className="text-center p-3 text-sm text-[#2E46BA] font-semibold"
        >
          {header}
        </TableHead>
      ))}
    </TableRow>
  );

  return (
    <div className="rounded-2xl p-4 bg-white">
      {/* Tabs */}
      <div className="flex justify-center items-center space-x-21 mb-4 border-b">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-1 font-bold text-md ${
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
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((inv) => (
            <TableRow
              key={inv._id}
              className={`hover:bg-gray-50 cursor-pointer ${
                selectedInvoice?._id === inv._id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedInvoice(inv)}
            >
              <TableCell className="text-center p-1">
                <input
                  type="radio"
                  name="selectInvoice"
                  checked={selectedInvoice?._id === inv._id}
                  onChange={() => setSelectedInvoice(inv)}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer h-4 w-4"
                />
              </TableCell>
              <TableCell className="p-2 text-center">{inv.invoiceNo}</TableCell>
              <TableCell className="p-2 text-center">{inv.firmName}</TableCell>
              <TableCell className="p-2 text-center">{inv.clientName}</TableCell>
              <TableCell className="p-2 text-center">{inv.status}</TableCell>
              <TableCell className="text-center p-2">
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        to={`/${orgName}/dashboard/invoice/${inv._id}`}
                        className="inline-block text-green-600 hover:text-green-800"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Pencil size={18} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Edit Invoice</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length + 1} className="text-center py-10 text-gray-500">
              No Invoices To Show
            </td>
          </tr>
        )}
      </CustomTable>
    </div>
  );
};

export default InvoicesTable;
