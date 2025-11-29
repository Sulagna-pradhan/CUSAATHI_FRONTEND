import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Search, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../lib/contexts";
import { Button } from "../common";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Notices", path: "/notices" },
    { name: "Resources", path: "/resources" },
    { name: "Community", path: "/community" },
    { name: "Career", path: "/career" },
    { name: "Tools", path: "/tools" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-dark-card border-b border-emerald-100 dark:border-emerald-900/60 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CU SAATHI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Search - Desktop */}
            <div className="hidden md:block">
              <Link
                to="/search"
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors flex items-center justify-center"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            )}

            {/* User Menu / Auth Buttons */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Avatar
                  name={user?.name}
                  src={user?.avatar}
                  size="sm"
                  status="online"
                />
              </Link>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/register">
                  <Button variant="primary" size="md" className="bg-emerald-600 hover:bg-emerald-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-emerald-100 dark:border-emerald-900/60 overflow-hidden bg-white dark:bg-dark-card"
          >
            <div className="container-custom py-4 space-y-2">
              {/* Mobile Search */}
              <div className="md:hidden mb-4">
                <Link to="/search">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-gray-500 font-normal border-emerald-200 dark:border-emerald-800"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Search CUSAATHI...
                  </Button>
                </Link>
              </div>

              {/* Mobile Nav Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
