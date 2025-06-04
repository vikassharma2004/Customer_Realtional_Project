import React from "react";

const RecentActivity = ({ activities = [] }) => {
  return (
    <div className="flex flex-col h-full hide-scrollbar">
      <h2 className="text-lg font-semibold mb-2 sticky top-0 bg-white z-10 py-1 hide-scrollbar">
        Recent Activity
      </h2>
      <ul className="space-y-3 overflow-y-auto">
        {activities.length === 0 ? (
          <li className="text-gray-400 text-sm">No recent activity.</li>
        ) : (
          activities.map((activity, idx) => (
            <li
              key={idx}
              className="text-sm text-gray-700 border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded shadow-sm hide-scrollbar"
            >
              <span className="block font-medium">{activity.action}</span>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentActivity;
