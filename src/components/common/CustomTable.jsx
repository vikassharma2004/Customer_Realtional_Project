import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableCaption,
} from "@/components/ui/table";
import { Tooltip } from "@radix-ui/react-tooltip";

const CustomTable = ({ caption, header, children, className = "" }) => {
  return (
    <Table className={`min-w-full   ${className}`}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className=" text-[#2E46BA]">{header}</TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export default CustomTable;
