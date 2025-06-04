import React from "react";

const OrgDetails = ({ org }) => {
  if (!org) {
    return <p className="text-gray-500 text-center py-10">Select an organization to see details</p>;
  }

  const details = [
    { label: "Organization ID", value: org.id },
    { label: "Name", value: org.name },
    { label: "Created At", value: org.createdAt },
    { label: "Total Users", value: org.totalUsers },
    { label: "Billing Plan", value: org.billingPlan },
  ];

  return (
    <div className="bg-white rounded-2xl  p-6 max-h-[400px] overflow-y-auto w-full hide-scrollbar">
      <h3 className="text-xl font-semibold mb-4 text-center text-primary">Organization Details</h3>
      <div className="space-y-4">
        {details.map(({ label, value }, idx) => (
          <div key={idx} className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-700">{label}</span>
            <span className="text-gray-900">{value ?? "N/A"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgDetails;
