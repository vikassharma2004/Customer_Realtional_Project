import React from "react";

const LeadDetails = ({ lead }) => {
  if (!lead) return <p className="text-gray-500">Select a lead to see details</p>;

  return (
    <div className="space-y-6">
      {/* About Lead */}
      <section className="bg-white shadow rounded-xl p-4">
        <h4 className="text-blue-600 font-semibold text-md mb-3">About Lead</h4>
        <div className="space-y-1 text-sm">
          <div><span className="font-semibold">Title:</span> {lead.title || "N/A"}</div>
          <div><span className="font-semibold">Closure Date:</span> {lead.closureDate || "N/A"}</div>
          <div><span className="font-semibold">Created Date:</span> {lead.createdAt || "N/A"}</div>
          <div><span className="font-semibold">Stage:</span> {lead.stage || "N/A"}</div>
          <div><span className="font-semibold">Estimated Worth:</span> {lead.estimatedWorth || "N/A"}</div>
        </div>
      </section>

      {/* About Client */}
      <section className="bg-white shadow rounded-xl p-4">
        <h4 className="text-blue-600 font-semibold text-md mb-3">About Client</h4>
        <div className="space-y-1 text-sm">
          <div><span className="font-semibold">Name:</span> {lead.firstName} {lead.lastName}</div>
          <div><span className="font-semibold">Email:</span> {lead.email || "N/A"}</div>
          <div><span className="font-semibold">Phone:</span> {lead.phone || "N/A"}</div>
        </div>
      </section>

      {/* About Organization */}
      <section className="bg-white shadow rounded-xl p-4">
        <h4 className="text-blue-600 font-semibold text-md mb-3">About Organization</h4>
        <div className="space-y-1 text-sm">
          <div><span className="font-semibold">Name:</span> {lead.organizationName || "N/A"}</div>
          <div><span className="font-semibold">Email:</span> {lead.organizationEmail || "N/A"}</div>
          <div><span className="font-semibold">Phone:</span> {lead.organizationPhone || "N/A"}</div>
        </div>
      </section>
    </div>
  );
};

export default LeadDetails;
