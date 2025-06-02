import React from "react";
import { Clock } from "lucide-react";

const mockActivity = [
  { id: 1, activity: "Added 3 users to the org", date: "2025-05-20" },
  { id: 2, activity: "Changed billing plan to Pro", date: "2025-05-21" },
  { id: 3, activity: "Updated org profile", date: "2025-05-22" },
];

const RecentActivity = ({ orgId }) => {
  if (!orgId) return null;

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-gray-50">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Clock size={20} /> Recent Activity
      </h3>
      <ul className="space-y-2">
        {mockActivity.map((act) => (
          <li key={act.id} className="text-sm text-gray-700">
            <span className="font-medium">{act.activity}</span>
            <div className="text-xs text-gray-500">{act.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
