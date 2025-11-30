import { useState, useEffect } from 'react';
import { Card, SectionTitle, LoadingSpinner, Button } from '../../components/common';
import { Users, Globe, UserCheck, Clock, CheckCircle, XCircle } from 'lucide-react';
import { collection, getDocs, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/contexts/AuthContext';
import { logActivity } from '../../lib/utils/activityLogger';

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

interface PendingMember {
  id: string;
  name: string;
  email: string;
  designation: string;
  role: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    subdomains: 0,
    pending: 0
  });
  const [pendingMembers, setPendingMembers] = useState<PendingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { userData, currentUser } = useAuth();
  
  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch members count
      const usersSnapshot = await getDocs(collection(db, 'users'));
      
      // Fetch pending members
      const pendingQuery = query(collection(db, 'users'), where('isApproved', '==', false));
      const pendingSnapshot = await getDocs(pendingQuery);
      const pending = pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PendingMember));
      
      // Fetch subdomains count
      const subdomainsSnapshot = await getDocs(collection(db, 'subdomains'));

      setStats({
        members: usersSnapshot.size,
        subdomains: subdomainsSnapshot.size,
        pending: pending.length
      });
      
      setPendingMembers(pending);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (member: PendingMember) => {
    try {
      await updateDoc(doc(db, 'users', member.id), {
        isApproved: true
      });
      
      // Log activity
      if (currentUser && userData) {
        await logActivity({
          userId: currentUser.uid,
          userName: userData.name,
          action: 'approve',
          details: { 
            memberName: member.name,
            memberEmail: member.email
          }
        });
      }
      
      // Update local state
      setPendingMembers(pendingMembers.filter(m => m.id !== member.id));
      setStats(prev => ({ ...prev, pending: prev.pending - 1 }));
    } catch (error) {
      console.error("Error approving member:", error);
    }
  };

  const handleReject = async (member: PendingMember) => {
    if (window.confirm(`Are you sure you want to reject ${member.name}? This will delete their account.`)) {
      try {
        await deleteDoc(doc(db, 'users', member.id));
        
        // Log activity
        if (currentUser && userData) {
          await logActivity({
            userId: currentUser.uid,
            userName: userData.name,
            action: 'reject',
            details: { 
              memberName: member.name,
              memberEmail: member.email
            }
          });
        }
        
        // Update local state
        setPendingMembers(pendingMembers.filter(m => m.id !== member.id));
        setStats(prev => ({ ...prev, pending: prev.pending - 1, members: prev.members - 1 }));
      } catch (error) {
        console.error("Error rejecting member:", error);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back to the Dev Team control center.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
        <StatCard 
          title="Pending Approvals" 
          value={stats.pending} 
          icon={Clock} 
          color="bg-yellow-600" 
        />
      </div>

      {/* Pending Approvals Section - Admin Only */}
      {isAdmin && pendingMembers.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <SectionTitle title="Pending Approvals" />
            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm font-medium">
              {pendingMembers.length} waiting
            </span>
          </div>
          <div className="space-y-3">
            {pendingMembers.map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {member.designation} • {member.role}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-600 border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 flex items-center gap-1"
                    onClick={() => handleApprove(member)}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-1"
                    onClick={() => handleReject(member)}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-8">
        <Card className="p-6">
          <SectionTitle title="Quick Actions" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
            {isAdmin && (
              <button 
                onClick={() => navigate('/dev-team/members')}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 text-left transition-colors"
              >
                <UserCheck className="w-6 h-6 text-purple-600 mb-2" />
                <span className="block font-medium text-gray-900 dark:text-white">Manage Team</span>
              </button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
