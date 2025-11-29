import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Book, Code, Layers, Palette, Database, Menu, X, ChevronRight, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

const DocsLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const menuItems = [
    { 
      title: 'Getting Started',
      icon: Book,
      path: '/docs',
      exact: true
    },
    { 
      title: 'Project Structure',
      icon: Layers,
      path: '/docs/structure'
    },
    { 
      title: 'Components',
      icon: Code,
      path: '/docs/components'
    },
    { 
      title: 'Theme & Design',
      icon: Palette,
      path: '/docs/theme'
    },
    { 
      title: 'State Management',
      icon: Database,
      path: '/docs/state'
    }
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex">
      {/* Sidebar - Desktop */}
      <aside 
        className="hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)] w-[280px] z-30 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border overflow-hidden shrink-0"
      >
        <div className="p-6 flex-1 overflow-y-auto scrollbar-thin">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Documentation
          </h2>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    active 
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-emerald-500' : 'text-gray-400'}`} />
                  <span className="whitespace-nowrap">{item.title}</span>
                  {active && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-dark-border space-y-4">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
              Need Help?
            </h3>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mb-3">
              Check the main README or contact the team.
            </p>
            <a 
              href="https://github.com/Sulagna-pradhan/CUSAATHI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs font-medium text-emerald-700 dark:text-emerald-300 hover:underline"
            >
              View Repository &rarr;
            </a>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-colors"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed left-0 top-16 bottom-0 z-50 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border flex flex-col"
          >
            <div className="p-6 flex-1 overflow-y-auto">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Documentation
              </h2>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path, item.exact)
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive(item.path, item.exact) ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-dark-border">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main 
        className="flex-1 transition-all duration-300 w-full"
      >
        <div className="container-custom py-12 max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DocsLayout;
