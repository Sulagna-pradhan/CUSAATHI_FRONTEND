import { useState, useEffect } from 'react';
import { Card, LoadingSpinner } from '../../components/common';
import { Activity, User, Shield, Globe, Trash2, Edit2, CheckCircle, XCircle, Clock } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: Record<string, any>;
  timestamp: any;
}

const ActivityLog = () => {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const q = query(
        collection(db, 'activities'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );
      const querySnapshot = await getDocs(q);
      const fetchedActivities: ActivityLog[] = [];
      querySnapshot.forEach((doc) => {
        fetchedActivities.push({ id: doc.id, ...doc.data() } as ActivityLog);
      });
      setActivities(fetchedActivities);
    } catch (error) {
      console.error("Error fetching activities: ", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'register': return <User className="w-5 h-5" />;
      case 'approve': return <CheckCircle className="w-5 h-5" />;
      case 'reject': return <XCircle className="w-5 h-5" />;
      case 'role_change': return <Shield className="w-5 h-5" />;
      case 'subdomain_add': return <Globe className="w-5 h-5" />;
      case 'subdomain_delete': return <Trash2 className="w-5 h-5" />;
      case 'member_edit': return <Edit2 className="w-5 h-5" />;
      case 'member_delete': return <Trash2 className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'register': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'approve': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'reject': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'role_change': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'subdomain_add': return 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30';
      case 'subdomain_delete': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'member_edit': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'member_delete': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getActionLabel = (action: string) => {
    return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate();
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.action === filter);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading activity log..." />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Activity Log</h1>
        <p className="text-gray-600 dark:text-gray-400">Track all team activities and changes.</p>
      </div>

      {/* Filter */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by action:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="all">All Activities</option>
            <option value="register">Registrations</option>
            <option value="approve">Approvals</option>
            <option value="role_change">Role Changes</option>
            <option value="subdomain_add">Sub-domain Additions</option>
            <option value="subdomain_delete">Sub-domain Deletions</option>
            <option value="member_edit">Member Edits</option>
            <option value="member_delete">Member Deletions</option>
          </select>
        </div>
      </Card>

      {/* Activity List */}
      <Card className="p-6">
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`p-3 rounded-lg ${getActionColor(activity.action)}`}>
                {getActionIcon(activity.action)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {getActionLabel(activity.action)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      by <span className="font-medium">{activity.userName}</span>
                    </p>
                    {Object.keys(activity.details).length > 0 && (
                      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {JSON.stringify(activity.details, null, 2)}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredActivities.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No activities found.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ActivityLog;
