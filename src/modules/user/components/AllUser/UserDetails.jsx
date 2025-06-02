import React from "react";

const UserDetails = ({ user }) => {
  if (!user)
    return <p className="text-gray-500">Select a user to see details</p>;

  const details = [
    { title: "Name", desc: `${user.firstName} ${user.lastName || ""}` },
    { title: "Phone", desc: user.phone || "N/A" },
    { title: "Email", desc: user.email || "N/A" },
    { title: "Department", desc: user.department || "N/A" },
    { title: "Role", desc: user.role === "Custom" ? user.subRole : user.role },
  ];

  return (
    <div className="">
      <h5 className="text-primary font-semibold mb-4 ">About</h5>
      <div className="space-y-6">
        {details.map(({ title, desc }, i) => (
          <div key={i} className="flex">
            <div className="font-semibold w-24">{title}:</div>
            <div>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetails;
