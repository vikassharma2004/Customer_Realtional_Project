import React, { useState, useEffect, useRef } from "react";
import {
  LayoutGrid,
  Bell,
  HelpCircle,
  Settings,
  Search,
  Plus,
  ChevronRight,
  Home,
  Book,
  Goal,
  Users,
  Search as SearchIcon,
  MessageCircle,
  MonitorSmartphone,
  Settings as AdminIcon,
} from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

const appList = [
  { name: "Home", icon: <Home /> },
  { name: "Jira", icon: <LayoutGrid /> },
  { name: "Confluence", icon: <Book /> },
  { name: "Goals", icon: <Goal /> },
  { name: "Teams", icon: <Users /> },
  { name: "Search", icon: <SearchIcon /> },
  { name: "Chat", icon: <MessageCircle /> },
  { name: "Studio", icon: <MonitorSmartphone /> },
  { name: "Administration", icon: <AdminIcon /> },
];

const Navbar = () => {
  const { isOpen, setIsOpen, pinned, setPinned } = useSidebar();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedApp, setSelectedApp] = useState("Jira");
  const [leftWidth, setLeftWidth] = useState(60);
  const resizingRef = useRef(false);
  const leftPanelRef = useRef(null);

  const handleMouseEnter = () => {
    if (!pinned) setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (!pinned) setIsOpen(false);
  };

  const handleClick = () => {
    setPinned((prev) => !prev);
    setIsOpen((prev) => (pinned ? false : true));
  };

  const startResizing = () => {
    resizingRef.current = true;
  };

  const stopResizing = () => {
    resizingRef.current = false;
  };

  const resize = (e) => {
    if (!resizingRef.current) return;
    const newWidth = e.clientX - leftPanelRef.current?.getBoundingClientRect().left;
    if (newWidth > 50 && newWidth < 200) {
      setLeftWidth(newWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, []);

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-2 border-b border-gray-300 w-full fixed top-0 left-0 right-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="p-1 hover:bg-gray-100 rounded-md border border-gray-300"
        >
          <ChevronRight className="w-4 h-4 text-gray-700" />
        </button>

        {/* App Switcher Dropdown */}
        <div className="relative">
          <button
            className="p-1 hover:bg-gray-100 rounded-md"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            <LayoutGrid className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dropdown Panel with Icon Sidebar + Resizable */}
          {showDropdown && (
            <div className="absolute top-10 left-0 bg-white shadow-lg border rounded-md z-50 flex h-auto min-w-[300px] ">
              {/* Left Icon Sidebar */}
              <div
                ref={leftPanelRef}
                style={{ width: `${leftWidth}px` }}
                className="bg-gray-50 p-2 overflow-y-auto flex flex-col items-center gap-3"
              >
                {appList.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => setSelectedApp(app.name)}
                    title={app.name}
                    className={`w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-300 ${
                      selectedApp === app.name ? "bg-gray-200" : ""
                    }`}
                  >
                    {app.icon}
                  </button>
                ))}
              </div>

              {/* Resizer */}
              <div
                className="w-1 bg-gray-300 cursor-col-resize hover:bg-gray-500"
                onMouseDown={startResizing}
              ></div>

              {/* Right Content Panel */}
              <div
                ref={leftPanelRef}
                className="bg-gray-50 p-2 w-full overflow-y-auto"
              >
                {/* <p className="text-sm font-medium px-2 py-1">Switch sites or apps</p> */}
                <div className="flex flex-col gap-4 mt-2">
                  {[
                    "Home",
                    "Jira",
                    "Confluence",
                    "Goals",
                    "Teams",
                    "Search",
                    "Chat",
                    "Studio",
                    "Administration",
                  ].map((item) => (
                    <button
                      key={item}
                      className="text-left text-gray-700 hover:bg-gray-100 px-2 py-2 rounded text-md"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jira logo + text */}
        <div className="bg-blue-600 text-white px-2 py-1 rounded-md font-semibold text-sm flex items-center gap-1">
          <img
            src="https://cdn.worldvectorlogo.com/logos/jira-1.svg"
            alt="jira"
            className="w-4 h-4"
          />
          Jira
        </div>
      </div>

      {/* Middle section (Search) */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1 w-full">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="ml-2 outline-none w-full text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Create Button */}
        <button className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-700 flex items-center gap-1">
          <Plus className="w-4 h-4" /> Create
        </button>

        {/* Premium Trial */}
        <button className="border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium text-blue-600 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-purple-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2l2.5 6.5H21l-5.25 4 2.25 6.5L12 15l-6.25 4 2.25-6.5L3 8.5h6.5z" />
          </svg>
          Premium trial
        </button>

        {/* Rovo Chat */}
        <button className="border border-gray-300 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8h2a2 2 0 012 2v8l-4-4H7a2 2 0 01-2-2V8a2 2 0 012-2h2"
            />
          </svg>
          Rovo Chat
        </button>

        {/* Icons */}
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <HelpCircle className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />

        {/* User Avatar */}
        <div className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-semibold flex items-center justify-center">
          AK
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
