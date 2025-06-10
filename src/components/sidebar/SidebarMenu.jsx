import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Flogo from "../../assets/cubicleFullLogo.png";
import logo from "../../assets/logo.png";
import { navItems } from "./navitems.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // Start closed
  const [pinned, setPinned] = useState(false); // <- NEW
  const [activeItem, setActiveItem] = useState(1); // Track active item
  const [expandedMenus, setExpandedMenus] = useState([]);
  const isExpanded = (id) => expandedMenus.includes(id);
  const toggleExpand = (id) => {
    setExpandedMenus((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Framer Motion variants for sidebar animation
  const sidebarVariants = {
    open: {
      width: "15rem", // w-60 equivalent (240px)
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.4,
      },
    },
    closed: {
      width: "5rem", // w-20 equivalent (80px)
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        duration: 0.4,
      },
    },
  };

  // Logo animation variants
  const logoVariants = {
    open: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2, delay: 0.1 },
    },
    closed: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  // Text animation variants
  const textVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0.1 },
    },
    closed: {
      opacity: 0,
      x: -10,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className="relative font-['Roboto'] ">
      <motion.div
        variants={sidebarVariants}
        animate={isOpen ? "open" : "closed"}
        className="fixed left-0 top-0 h-screen bg-white shadow-lg flex flex-col font-['Manrope'] z-50 "
        onMouseEnter={() => {
          if (!pinned) setIsOpen(true); // hover open only if not pinned
        }}
        onMouseLeave={() => {
          if (!pinned) setIsOpen(false); // hover close only if not pinned
        }}
      >
        {/* Logo and toggle button */}
        <div className="flex items-center justify-between px-3 py-4 border-b border-gray-100">
          {/* Logo - Clickable to toggle */}
          <motion.div
            variants={logoVariants}
            animate={isOpen ? "open" : "closed"}
            className="flex items-center overflow-hidden cursor-pointer"
            onClick={() => {
              setPinned((prevPinned) => {
                const newPinned = !prevPinned;
                setIsOpen(newPinned); // if pinned => open; if unpinned => close
                return newPinned;
              });
            }}
          >
            {
              // Conditional rendering based on isOpen
              isOpen ? (
                <img
                  src={Flogo}
                  alt="logo"
                  className="transition-all duration-300 
              w-36 h-10"
                />
              ) : (
                <img
                  src={logo}
                  alt="logo"
                  className="transition-all duration-300 
          w-12 h-12"
                />
              )
            }
          </motion.div>

          {/* Toggle Button - Only shown when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsOpen(false)}
                className="text-blue-700 hover:bg-blue-100 rounded-full p-2 ml-2 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Items */}
        <div
          className="relative font-['Manrope'] overflow-y-scroll hide-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col gap-2 mt-5 px-3 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.id}>
                <motion.div
                  onClick={() => {
                    setActiveItem(item.id);
                    if (!isOpen) toggleSidebar();
                  }}
                  className={`flex items-center justify-between  p-3 rounded-lg cursor-pointer transition-all duration-200 relative
              ${
                activeItem === item.id
                  ? "bg-blue-800 text-white shadow-md"
                  : isOpen
                  ? "hover:bg-gray-200 text-gray-500"
                  : "text-gray-500 hover:bg-gray-100"
              }
              ${!isOpen ? "justify-center" : ""}
              `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={item.to} className="flex items-center gap-3">
                    <div className="w-5 h-5 text-current flex-shrink-0">
                      <item.icon />
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          variants={textVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="text-md font-medium whitespace-nowrap"
                        >
                          {item.text}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>

                  {/* Toggle Arrow */}
                  {item.submenu && isOpen && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(item.id);
                      }}
                      className="cursor-pointer"
                    >
                      {isExpanded(item.id) ? (
                        <ArrowDropDownIcon fontSize="medium" />
                      ) : (
                        <ArrowRightIcon fontSize="medium" />
                      )}
                    </div>
                  )}

                  {!isOpen && activeItem === item.id && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-800 rounded-l-full"
                    />
                  )}
                </motion.div>

                {/* Submenu */}
                {item.submenu && isOpen && isExpanded(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-2 flex flex-col gap-1 rounded-xl "
                  >
                    {item.children.map((subitem) => (
                      <motion.div
                        key={subitem.id}
                        onClick={() => {
                          setActiveItem(subitem.id);
                        }}
                        className={`flex items-center gap-5 p-3 justify-start rounded-lg cursor-pointer transition-all duration-200 relative
                      ${
                        activeItem === subitem.id
                          ? "bg-blue-700 text-white shadow"
                          : "hover:bg-gray-100 text-gray-500"
                      }
                    `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link
                          to={subitem.to}
                          className="w-6 h-6  text-current flex-shrink-0"
                        >
                          <subitem.icon />
                        </Link>
                        <Link
                          to={subitem.to}
                          className="text-xs font-medium whitespace-nowrap "
                        >
                          {subitem.text}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarMenu;
