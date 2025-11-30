import { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/contexts/AuthContext';
import { LoadingSpinner, Button } from '../../components/common';
import { LayoutDashboard, Users, Globe, LogOut, Shield, Menu, X, BookOpen, ChevronDown, ChevronUp, Activity, CheckSquare } from 'lucide-react';

const DevTeamLayout = () => {
  const { currentUser, userData, loading, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDocsExpanded, setIsDocsExpanded] = useState(location.pathname.startsWith('/dev-team/docs'));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <LoadingSpinner size="lg" text="Verifying access..." />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/dev-team/login" state={{ from: location }} replace />;
  }

  // Show loader if user is logged in but data is not yet fetched
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  // Check if user is approved
  if (userData && !userData.isApproved) {
    return <Navigate to="/dev-team/pending-approval" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const navItems = [
    { path: '/dev-team/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dev-team/members', icon: Users, label: 'Team Members' },
    { path: '/dev-team/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/dev-team/subdomains', icon: Globe, label: 'Sub Domains' },
    { path: '/dev-team/activity', icon: Activity, label: 'Activity Log' },
  ];

  const docsItems = [
    { path: '/dev-team/docs/introduction', label: 'Introduction' },
    { path: '/dev-team/docs/structure', label: 'Project Structure' },
    { path: '/dev-team/docs/components', label: 'Components' },
    { path: '/dev-team/docs/theme', label: 'Theme & Design' },
    { path: '/dev-team/docs/state', label: 'State Management' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">Dev Team</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}

        {/* Documentation Section with Submenu */}
        <div className="space-y-1">
          <button
            onClick={() => setIsDocsExpanded(!isDocsExpanded)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname.startsWith('/dev-team/docs')
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              Documentation
            </div>
            {isDocsExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Docs Submenu */}
          {isDocsExpanded && (
            <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 space-y-1">
              {docsItems.map((docItem) => {
                const isDocActive = location.pathname === docItem.path;
                return (
                  <Link
                    key={docItem.path}
                    to={docItem.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                      isDocActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    {docItem.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-4 px-4">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {currentUser.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Administrator
          </p>
        </div>
        <Button
          variant="outline"
          fullWidth
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dark-bg flex flex-col lg:flex-row">
      {/* Mobile Header - Offset by 4rem (Navbar height) */}
      <div className="lg:hidden sticky top-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white">Dev Team</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Offset by 4rem on desktop */}
      <aside className={`
        fixed lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DevTeamLayout;
