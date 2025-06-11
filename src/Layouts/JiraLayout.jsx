import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/modules/Jira/components/Navbar.jsx";
import Sidebar from "../modules/Jira/components/Sidebar.jsx";
import { SidebarProvider } from '../modules/Jira/context/SidebarContext.jsx';
import { useSidebar } from "../modules/Jira/context/SidebarContext.jsx";

export default function JiraLayoutWrapper() {
  return (
    <SidebarProvider>
      <JiraLayout />
    </SidebarProvider>
  );
}

function JiraLayout() {
  const { isOpen, pinned } = useSidebar();

  const shouldShiftContent = isOpen && pinned;

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Navbar />

        {/* Shift only when sidebar is pinned & open */}
        <main
          className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ${
            shouldShiftContent ? 'pl-[220px]' : 'pl-0'
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
