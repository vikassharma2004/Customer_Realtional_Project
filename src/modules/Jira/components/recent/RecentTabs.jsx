import React from 'react';

export default function RecentTabs({ selected, onSelect }) {
  return (
    <div className="flex space-x-4">
      {['worked', 'viewed'].map(tab => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`capitalize text-sm font-medium border-b-2 pb-1 ${
            selected === tab
              ? 'border-blue-500 text-black'
              : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          {tab === 'worked' ? 'Worked on' : 'Viewed'}
        </button>
      ))}
    </div>
  );
}
