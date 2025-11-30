import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Navbar, Footer } from './components/layout';
import { LoadingSpinner } from './components/common';
import { AuthProvider } from './lib/contexts/AuthContext';

import { 
  Login,
  Register,
  Dashboard,
  Profile,
  NoticeList,
  NoticeDetail,
  ResourceHub,
  Forum,
  Groups,
  Alumni,
  Placements,
  ToolsHub,
  CollegeList,
  CollegeDetail,
  Calendar,
  Helpdesk,
  Search,
  Scholarships,
  AiChat,
  DevTeamLogin,
  DevTeamRegister,
  PendingApproval,
  DevTeamLayout,
  DevTeamDashboard,
  TeamMembers,
  SubDomains,
  ActivityLog,
  Tasks
} from './pages';
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Features = lazy(() => import('./pages/Features'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Docs pages (lazy loaded)
const DocsIntroduction = lazy(() => import('./pages/DevTeam/docs/DocsIntroduction'));
const DocsStructure = lazy(() => import('./pages/DevTeam/docs/DocsStructure'));
const DocsComponents = lazy(() => import('./pages/DevTeam/docs/DocsComponents'));
const DocsTheme = lazy(() => import('./pages/DevTeam/docs/DocsTheme'));
const DocsState = lazy(() => import('./pages/DevTeam/docs/DocsState'));


// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <LoadingSpinner size="lg" text="Loading..." />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-dark-bg">
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/features" element={<Features />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Notices */}
              <Route path="/notices" element={<NoticeList />} />
              <Route path="/notices/:id" element={<NoticeDetail />} />
              
              {/* Calendar */}
              <Route path="/calendar" element={<Calendar />} />
              
              {/* Resources */}
              <Route path="/resources" element={<ResourceHub />} />
              <Route path="/resources/:category" element={<ResourceHub />} />
              
              {/* Community */}
              <Route path="/community" element={<Forum />} />
              <Route path="/community/forum" element={<Forum />} />
              <Route path="/community/groups" element={<Groups />} />
              <Route path="/community/alumni" element={<Alumni />} />
              
              {/* Colleges */}
              <Route path="/colleges" element={<CollegeList />} />
              <Route path="/colleges/:id" element={<CollegeDetail />} />
              
              {/* Career */}
              <Route path="/career" element={<Placements />} />
              <Route path="/career/placements" element={<Placements />} />
              
              {/* Tools */}
              <Route path="/tools" element={<ToolsHub />} />
              <Route path="/tools/:category" element={<ToolsHub />} />
              
              {/* Helpdesk */}
              <Route path="/helpdesk" element={<Helpdesk />} />
              
              {/* New Features */}
              <Route path="/scholarships" element={<Scholarships />} />
              <Route path="/ai-chat" element={<AiChat />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              
              {/* Dev Team Routes */}
              <Route path="/dev-team/login" element={<DevTeamLogin />} />
              <Route path="/dev-team/register" element={<DevTeamRegister />} />
              <Route path="/dev-team/pending-approval" element={<PendingApproval />} />
              <Route path="/dev-team" element={<DevTeamLayout />}>
                <Route index element={<Navigate to="/dev-team/dashboard" replace />} />
                <Route path="dashboard" element={<DevTeamDashboard />} />
                <Route path="members" element={<TeamMembers />} />
                <Route path="subdomains" element={<SubDomains />} />
                <Route path="activity" element={<ActivityLog />} />
                <Route path="tasks" element={<Tasks />} />
                {/* Documentation under Dev Team */}
                <Route path="docs" element={<Navigate to="/dev-team/docs/introduction" replace />} />
                <Route path="docs/introduction" element={<DocsIntroduction />} />
                <Route path="docs/structure" element={<DocsStructure />} />
                <Route path="docs/components" element={<DocsComponents />} />
                <Route path="docs/theme" element={<DocsTheme />} />
                <Route path="docs/state" element={<DocsState />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        <Footer />

      </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
