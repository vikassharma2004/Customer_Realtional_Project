import React, { useState, useEffect } from "react";
import dummyUsers from "../../../utils/data.js"; // your dummy data file
import UserDetails from "../components/AllUser/UserDetails";
import UserTable from "../components/AllUser/UserTable";
import Pagination from "../components/AllUser/Pagination";
import SubHeader from "@/Layouts/SubHeader";
import { Skeleton } from "@/components/ui/skeleton";

// header for table 

const header = [

"Name",
"Email",
"Phone",
"Department",
"Role",
"Actions",
]
  

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({ start: 0, end: 10 });
  const [loading, setLoading] = useState(true);
  const showPerPage = 10;
  const orgName = localStorage.getItem("orgName");

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setAllUsers(dummyUsers);
      setSelectedUser(dummyUsers[0] || null);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const onPaginationChange = (start, end) => setPagination({ start, end });

  return (
    <div className="relative">
      <SubHeader title="All Users" />
      <div className="flex flex-col xl:flex-row gap-6 px-25 -mt-4 absolute w-full ">
        <div className="w-full xl:w-1/4 bg-white rounded-2xl p-4 h-full shadow-md">
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 bg-black/10" />
              <Skeleton className="h-4 w-full bg-black/10" />
              <Skeleton className="h-4 w-5/6 bg-black/10" />
              <Skeleton className="h-4 w-2/3 bg-black/10" />
              <Skeleton className="h-4 w-1/2 bg-black/10" />
            </div>
          ) : (
            <UserDetails user={selectedUser} />
          )}
        </div>

        <div className="w-full xl:w-3/5 bg-white rounded-2xl shadow p-4 overflow-x-auto md:w-full">
          {loading ? (
            <div className="space-y-2">
              {[...Array(showPerPage)].map((_, i) => (
                <Skeleton key={i} className="h-10 bg-black/5 rounded-2xl" />
              ))}
            </div>
          ) : (
            <>
              <UserTable
                users={allUsers.slice(pagination.start, pagination.end)}
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
                orgName={orgName}
                headers={header}
              />
              <div className="mt-6">
                <Pagination
                  showPerPage={showPerPage}
                  onPaginationChange={onPaginationChange}
                  total={allUsers.length}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
