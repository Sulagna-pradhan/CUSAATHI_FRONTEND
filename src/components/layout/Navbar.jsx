import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, User, Sun, Moon, Search, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, useAuth } from '../../contexts';
import { Button, Avatar } from '../common';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Notices', path: '/notices' },
    { name: 'Resources', path: '/resources' },
    { name: 'Community', path: '/community' },
    { name: 'Career', path: '/career' },
    { name: 'Tools', path: '/tools' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-600 dark:bg-primary-500 rounded-lg flex items-center justify-center shadow-soft group-hover:shadow-soft-lg transition-shadow">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              CUSAATHI
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
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg'
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
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors inline-block"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Notifications */}
            {isAuthenticated && (
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors">
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
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg rounded-lg transition-colors"
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
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-gray-200 dark:border-dark-border overflow-hidden bg-white dark:bg-dark-card"
          >
            <div className="container-custom py-4 space-y-2">
              {/* Mobile Search */}
              <div className="md:hidden mb-4">
                <Link to="/search">
                  <Button variant="outline" className="w-full justify-start text-gray-500 font-normal">
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
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-bg'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Buttons */}
              {!isAuthenticated && (
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-dark-border">
                  <Link to="/register" className="flex-1">
                    <Button variant="primary" size="md" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
