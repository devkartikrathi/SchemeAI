"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const tabs = [
    { name: "Home", href: "/" },
    {
      name: "Schemes",
      href: "#",
      dropdown: [
        { name: "Farmers", href: "/schemes/farmers" },
        { name: "Youth", href: "/schemes/youth" },
        { name: "Senior Citizens", href: "/schemes/senior-citizens" },
      ],
    },
    {
      name: "Services",
      href: "#",
      dropdown: [
        { name: "Apply for Scheme", href: "/services/apply" },
        { name: "Check Status", href: "/services/status" },
        { name: "Download Forms", href: "/services/forms" },
      ],
    },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) setActiveDropdown(null); // Reset dropdowns when opening
  };

  const toggleDropdown = (tabName: string) => {
    setActiveDropdown(activeDropdown === tabName ? null : tabName);
  };

  const HamburgerMenu = () => (
    <motion.button
      onClick={toggleMenu}
      className="text-white focus:outline-none relative w-6 h-5"
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
    >
      <motion.span
        className="absolute block h-[2px] bg-gradient-to-r from-blue-400 to-teal-500"
        style={{ originX: 0.25 }}
        variants={{
          closed: { rotate: 0, y: 0, width: "100%" },
          open: { rotate: 45, y: 6, width: "100%" },
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute block h-[2px] bg-gradient-to-r from-teal-500 to-blue-400"
        style={{ originX: 0.75 }}
        variants={{
          closed: { rotate: 0, y: 10, width: "75%" },
          open: { rotate: -45, y: 4, width: "100%" },
        }}
        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
      />
    </motion.button>
  );

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-display font-bold">
            GovSchemes
          </Link>

          <div className="md:hidden">
            <HamburgerMenu />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {tabs.map((tab) => (
              <li key={tab.name} className="relative">
                <Link
                  href={tab.href}
                  className="hover:text-accent transition-colors font-medium"
                  onMouseEnter={() => setActiveDropdown(tab.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span className="flex items-center">
                    {tab.name}
                    {tab.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                  </span>
                </Link>
                {tab.dropdown && activeDropdown === tab.name && (
                  <AnimatePresence>
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                    >
                      {tab.dropdown.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-4 py-2 text-sm text-primary hover:bg-secondary hover:text-white"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary border-b-2 border-gradient-to-r from-blue-400 to-teal-500"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="space-y-4">
                {tabs.map((tab) => (
                  <li key={tab.name}>
                    <div className="flex justify-between items-center">
                      <Link
                        href={tab.href}
                        className="text-white hover:text-accent transition-colors"
                        onClick={(e) => {
                          if (tab.dropdown) {
                            e.preventDefault();
                            toggleDropdown(tab.name);
                          } else {
                            setIsMenuOpen(false); // Close menu when clicking non-dropdown links
                          }
                        }}
                      >
                        {tab.name}
                      </Link>
                      {tab.dropdown && (
                        <button
                          onClick={() => toggleDropdown(tab.name)}
                          className="p-1 focus:outline-none"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${activeDropdown === tab.name ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Dropdown */}
                    {tab.dropdown && activeDropdown === tab.name && (
                      <AnimatePresence>
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-2 space-y-2"
                        >
                          {tab.dropdown.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="block px-4 py-2 text-gray-300 hover:text-white bg-white/10 rounded"
                                onClick={() => setIsMenuOpen(false)} // Close menu when clicking links
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      </AnimatePresence>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

