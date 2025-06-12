import React from "react";

const OrgDetails = ({ org }) => {
  if (!org) {
    return (
      <p className="text-gray-500 text-center py-10">
        Select an organization to see details
      </p>
    );
  }

  const details = [
    { label: " employee ID", value: org.employeeId },
    { label: "Name", value: org.orgName },
    { label: "contact", value: org.contactEmail },
    { label: "Total Users", value: org.totalUsers },
    { label: "joined on", value: org.joinedAt },
  ];

  return (
    <div className=" rounded-2xl  p-6 max-h-[500px]  w-full hide-scrollbar">
      <h3 className="text-xl font-semibold mb-4 text-center text-primary">
        Organization Details
      </h3>
      <div className="space-y-4">
        {details.map(({ label, value }, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center  border-gray-200 "
          >
            <span className="font-medium text-gray-700">{label}-</span>
            <span className="text-gray-900">{value ?? "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgDetails;
