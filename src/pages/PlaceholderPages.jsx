import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, SectionTitle } from '../components/common';

const PlaceholderPage = ({ title, description, icon: Icon = Construction }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
          <Icon className="w-12 h-12 text-primary-600 dark:text-primary-400" />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text">
          {title}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          We are working hard to bring this feature to you. Stay tuned!
        </p>
        
        <Link to="/">
          <Button size="lg" icon={ArrowLeft} iconPosition="left">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export const Login = () => <PlaceholderPage title="Login" description="Sign in to your CUSAATHI account" />;
export const Register = () => <PlaceholderPage title="Register" description="Create your CUSAATHI account" />;

// Dashboard & Profile
export const Dashboard = () => <PlaceholderPage title="Dashboard" description="Your personalized dashboard" />;
export const Profile = () => <PlaceholderPage title="Profile" description="Manage your profile" />;

// Notices
export const NoticeList = () => <PlaceholderPage title="Notices" description="Browse all notices and announcements" />;
export const NoticeDetail = () => <PlaceholderPage title="Notice Details" description="View notice details" />;

// Resources
export const ResourceHub = () => <PlaceholderPage title="Resources" description="Access academic resources" />;

// Community
export const Forum = () => <PlaceholderPage title="Forum" description="Ask questions and get answers" />;
export const Groups = () => <PlaceholderPage title="Study Groups" description="Join or create study groups" />;
export const Alumni = () => <PlaceholderPage title="Alumni Network" description="Connect with alumni" />;

// Career
export const Placements = () => <PlaceholderPage title="Placements" description="Explore placement opportunities" />;

// Colleges
export const CollegeList = () => <PlaceholderPage title="Colleges" description="Browse all affiliated colleges" />;
export const CollegeDetail = () => <PlaceholderPage title="College Details" description="View college information" />;

// Calendar
export const Calendar = () => <PlaceholderPage title="Academic Calendar" description="Important dates and events" />;

// Helpdesk
export const Helpdesk = () => <PlaceholderPage title="Helpdesk" description="Get help and support" />;

// New Features
export const Scholarships = () => <PlaceholderPage title="Scholarship Saathi" description="Find financial aid opportunities" />;
export const AiChat = () => <PlaceholderPage title="Cusaathi AI" description="Your personal academic assistant" />;

export default PlaceholderPage;
