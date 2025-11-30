import { useState, useEffect } from 'react';
import { Card, SectionTitle, LoadingSpinner } from '../../components/common';
import { Users, Globe } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <Card className="p-6 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-8 h-8 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
  </Card>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    subdomains: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch members count
        const usersSnapshot = await getDocs(collection(db, 'users'));
        // Filter for dev-team role if needed, but for now total users is fine or filter in memory
        // const devTeamMembers = usersSnapshot.docs.filter(doc => doc.data().role === 'dev-team');
        
        // Fetch subdomains count
        const subdomainsSnapshot = await getDocs(collection(db, 'subdomains'));

        setStats({
          members: usersSnapshot.size,
          subdomains: subdomainsSnapshot.size
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back to the Dev Team control center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title="Total Team Members" 
          value={stats.members} 
          icon={Users} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Active Sub-Domains" 
          value={stats.subdomains} 
          icon={Globe} 
          color="bg-emerald-600" 
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="p-6">
          <SectionTitle title="Quick Actions" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <button 
              onClick={() => navigate('/dev-team/register')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors"
            >
              <Users className="w-6 h-6 text-blue-600 mb-2" />
              <span className="block font-medium text-gray-900 dark:text-white">Add Member</span>
            </button>
            <button 
              onClick={() => navigate('/dev-team/subdomains')}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors"
            >
              <Globe className="w-6 h-6 text-emerald-600 mb-2" />
              <span className="block font-medium text-gray-900 dark:text-white">Manage Domains</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
