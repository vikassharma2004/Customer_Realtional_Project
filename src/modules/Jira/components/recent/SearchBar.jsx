import React from 'react';
import { Search } from 'lucide-react'; // or use heroicons

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Filter by title"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 border rounded-md text-sm w-60 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
