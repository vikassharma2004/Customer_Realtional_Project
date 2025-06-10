import React from 'react';
import { motion } from 'framer-motion';
import { useSidebar } from '../context/SidebarContext';
import { Link } from 'react-router-dom';
import { Clock, Star, Folder, Layers, Users, MoreHorizontal } from 'lucide-react';

const items = [
  { id: 1, label: 'Recent', icon: <Clock />, to: '/recent' },
  { id: 2, label: 'Starred', icon: <Star />, to: '/starred' },
  { id: 3, label: 'Plans', icon: <Layers />, to: '/plans' },
  { id: 4, label: 'Projects', icon: <Folder />, to: '/projects' },
  { id: 5, label: 'Teams', icon: <Users />, to: '/teams' },
  { id: 6, label: 'More', icon: <MoreHorizontal />, to: '/more' },
];

const Sidebar = () => {
  const { isOpen, setIsOpen, pinned } = useSidebar();
  const handleMouseEnter = () => {
    if (!pinned) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!pinned) setIsOpen(false);
  };

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 220 : 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white border-r h-screen fixed left-0 top-0 border-b-2 border-gray-300 z-50 overflow-hidden"
    >
      <div className="flex flex-col h-full pt-16 px-2">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.to}
            className={`flex items-center gap-3 py-2 px-3 rounded hover:bg-gray-100 text-sm transition-colors duration-150 ${
              isOpen ? 'justify-start' : 'justify-center'
            }`}
          >
            <span className="text-gray-600">{item.icon}</span>
            {isOpen && <span className="text-gray-800">{item.label}</span>}
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
