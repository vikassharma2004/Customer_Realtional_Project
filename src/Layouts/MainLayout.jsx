import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "@/components/navabar/Navbar.jsx";
import SidebarMenu from "../components/sidebar/SidebarMenu.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Fixed Sidebar - Now overlays on top */}
      <SidebarMenu />

      {/* Main Content Area - Full width */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}