// === FILE: src/App.jsx ===
import React from 'react';
import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx';
import { SidebarProvider } from '../context/SidebarContext';

function App() {
  return (
    <SidebarProvider>
        <Sidebar />
        <Navbar />
    </SidebarProvider>
  );
}

export default App;
