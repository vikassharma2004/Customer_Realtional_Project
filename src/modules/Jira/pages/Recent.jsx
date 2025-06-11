import React, { useState } from 'react';
import RecentTabs from '../components/recent/RecentTabs';
import SearchBar from '../components/recent/SearchBar';
import TaskItem from '../components/recent/TaskItem';

const tasks = [
  {
    id: 1,
    title: 'responsiveness of login page',
    code: 'SCRUM-3',
    category: 'CRM',
    date: 'May 29',
  },
  {
    id: 2,
    title: 'Find out bugs',
    code: 'SCRUM-2',
    category: 'CRM',
    date: 'May 29',
  },
  {
    id: 3,
    title: 'Code Review Of CRM',
    code: 'SCRUM-1',
    category: 'CRM',
    date: 'May 29',
  },
];

export default function RecentPage() {
  const [selectedTab, setSelectedTab] = useState('worked');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-16">
      <h1 className="text-2xl font-semibold mb-6">Recent</h1>

      <div className="flex items-center justify-between mb-6">
        <RecentTabs selected={selectedTab} onSelect={setSelectedTab} />
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <h2 className="text-gray-500 text-sm font-medium mb-4">This month</h2>
      <div className="space-y-6">
        {filteredTasks.map(task => (
          <TaskItem key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}
