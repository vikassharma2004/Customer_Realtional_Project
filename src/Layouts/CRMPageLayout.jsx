import React from "react";

const CRMPageLayout = ({ details, main, right }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 pl-25 py-5 w-full absolute -mt-10">
      {/* Left Sidebar - Details */}
      <div className="w-full xl:max-w-xs bg-white rounded-2xl p-6 shadow-md max-h-[360px] overflow-y-auto hide-scrollbar">
        {details}
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-2xl shadow p-4 overflow-x-auto">
        {main}
      </div>

      {/* Right Sidebar - Recent Activity */}
      {right && (
        <div className="w-full xl:max-w-sm bg-white rounded-2xl p-4 shadow-md max-h-[400px] overflow-y-auto">
          {right}
        </div>
      )}
    </div>
  );
};

export default CRMPageLayout;
