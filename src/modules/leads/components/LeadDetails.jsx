import React from "react";

const LeadDetails = ({ lead }) => {
  if (!lead) {
    return (
      <p className="text-gray-500 text-center">Select a lead to see details</p>
    );
  }

  const details = [
    { title: "Name", desc: `${lead.firstName} ${lead.lastName || ""}` },
    { title: "Phone", desc: lead.phone || "N/A" },
    { title: "Email", desc: lead.email || "N/A" },
    { title: "City", desc: lead.city || "N/A" },
    { title: "Status", desc: lead.status || "N/A" },
  ];

  return (
    <div>
      <h5 className="text-primary font-semibold mb-4 text-center">About</h5>
      <div className="space-y-4">
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

export default LeadDetails;
