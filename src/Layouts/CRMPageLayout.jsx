// components/layouts/CRMPageLayout.jsx
import React from "react";

const CRMPageLayout = ({ details, main, right }) => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 pl-17 pr-5  w-full py-5 justify-around absolute -mt-10">
      {/* Left - Details Panel */}
      {
        details && (
          <div className="w-full xl:w-1/4 bg-white rounded-2xl p-6 h-full shadow-md">
            {details}
          </div>
        )
      }
     

      {/* Center - Main Table or Content */}
      <div className="w-full xl:w-3/5 bg-white rounded-2xl shadow p-4 overflow-x-auto flex-1">
        {main}
      </div>

      {/* Optional Right Panel */}
      {right && (
        <div className="w-full xl:w-1/6 bg-white rounded-2xl p-4 shadow-md h-[300px] overflow-y-scroll hide-scrollbar">
          {right}
        </div>
      )}
    </div>
  );
};

export default CRMPageLayout;
