import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  const toggleSidebar = () => {
    setPinned((prev) => {
      const newPinned = !prev;
      setIsOpen(newPinned);
      return newPinned;
    });
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, toggleSidebar, pinned, setPinned }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
