import React from "react";

const FirmDetails = ({ firm }) => {
  if (!firm)
    return <p className="text-gray-500">Select a firm to see details</p>;

  const details = [
    { title: "Name", desc: `${firm.firstName} ${firm.lastName || ""}` },
    { title: "Phone", desc: firm.phone || "N/A" },
    { title: "Email", desc: firm.email || "N/A" },
  ];

  return (
    <div className="">
      <h5 className="text-primary font-semibold mb-4 text-center ">About</h5>
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

export default FirmDetails;
