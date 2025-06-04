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

const UserTable = ({ users, selectedUser, setSelectedUser,headers=[] ,orgName}) => {
  const tableHeader = (
    <TableRow className=" border-b rounded-mdw-full ">
      <TableHead className="w-12 text-center p-3 text-[#2E46BA] font-semibold cursor-pointer rounded-md">
       
      </TableHead>
      {
        headers.map((header,idx) => (
          <TableHead key={idx} className="w-24 text-center p-3 text-xl md:text-sm text-[#2E46BA] font-semibold cursor-pointer rounded-md">
            {header}
          </TableHead>
        ))
      }
     
    
    </TableRow>
  );

  return (
    <div className="rounded-2xl   ">
      <CustomTable header={tableHeader} className="rounded-2xl">
        {users.map((user) => (
          <TableRow
            key={user._id}
            className={`hover:bg-gray-50 cursor-pointer  rounded-2xl ${
              selectedUser?._id === user._id ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <TableCell className="text-center p-1  ">
              <input
                type="radio"
                name="selectUser"
                checked={selectedUser?._id === user._id}
                onChange={() => setSelectedUser(user)}
                onClick={(e) => e.stopPropagation()}
                className="cursor-pointer h-4 w-4"
              />
            </TableCell>
            <TableCell className="p-2 text-center">{`${user.firstName} ${
              user.lastName || ""
            }`}</TableCell>
            <TableCell className="p-2 text-center">{user.email}</TableCell>
            <TableCell className="p-2 text-center">{user.phone}</TableCell>
            
            <TableCell className="p-2 text-center">{user.role}</TableCell>
            <TableCell className="text-center p-5">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      to={`/${orgName}/dashboard/user/profile/${user._id}`}
                      className="inline-block text-green-600 hover:text-green-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Pencil size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Edit User</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
          </TableRow>
        ))}
      </CustomTable>
    </div>
  );
};

export default UserTable;
