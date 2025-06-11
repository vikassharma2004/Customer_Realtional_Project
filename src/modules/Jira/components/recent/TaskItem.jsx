import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function TaskItem({ title, code, category, date }) {
  return (
    <div className="flex justify-between items-start">
      <div className="flex items-start space-x-3">
        <CheckSquare className="mt-1 text-gray-500" size={18} />
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-gray-500">{code} • {category}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}
