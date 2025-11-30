import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/contexts/AuthContext';
import { Button, Card } from '../../components/common';
import { Clock, LogOut } from 'lucide-react';

export const PendingApproval = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/dev-team/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4">
      <Card className="w-full max-w-md p-8 shadow-xl border-t-4 border-t-yellow-500 text-center">
        <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Approval Pending
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Your account has been created and verified, but it requires administrator approval before you can access the dashboard.
          <br /><br />
          Please check back later or contact the administrator.
        </p>

        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mx-auto"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </Card>
    </div>
  );
};


