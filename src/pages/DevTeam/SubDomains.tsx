import { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner, Input } from '../../components/common';
import { Plus, Globe, ExternalLink, CheckCircle, XCircle, Trash2, Server } from 'lucide-react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../lib/contexts/AuthContext';
import { logActivity } from '../../lib/utils/activityLogger';

interface SubDomain {
  id: string;
  name: string;
  status: string;
  type: string;
  url?: string;
}

const SubDomains = () => {
  const [domains, setDomains] = useState<SubDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { userData, currentUser } = useAuth();
  const [newDomain, setNewDomain] = useState({
    name: '',
    url: '',
    type: 'Frontend',
    status: 'Live'
  });

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'subdomains'));
      const fetchedDomains: SubDomain[] = [];
      querySnapshot.forEach((doc) => {
        fetchedDomains.push({ id: doc.id, ...doc.data() } as SubDomain);
      });
      setDomains(fetchedDomains);
    } catch (error) {
      console.error("Error fetching domains: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const domainToDelete = domains.find(d => d.id === id);
    if (window.confirm('Are you sure you want to delete this subdomain?')) {
      try {
        await deleteDoc(doc(db, 'subdomains', id));
        setDomains(domains.filter(domain => domain.id !== id));
        
        // Log activity
        if (currentUser && userData) {
          await logActivity({
            userId: currentUser.uid,
            userName: userData.name,
            action: 'subdomain_delete',
            details: { 
              subdomainName: domainToDelete?.name || 'Unknown',
              subdomainUrl: domainToDelete?.url || 'N/A'
            }
          });
        }
      } catch (error) {
        console.error("Error deleting domain: ", error);
      }
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'subdomains'), newDomain);
      setDomains([...domains, { id: docRef.id, ...newDomain }]);
      
      // Log activity
      if (currentUser && userData) {
        await logActivity({
          userId: currentUser.uid,
          userName: userData.name,
          action: 'subdomain_add',
          details: { 
            subdomainName: newDomain.name,
            subdomainUrl: newDomain.url,
            type: newDomain.type,
            status: newDomain.status
          }
        });
      }
      
      setIsAdding(false);
      setNewDomain({ name: '', url: '', type: 'Frontend', status: 'Live' });
    } catch (error) {
      console.error("Error adding domain: ", error);
    }
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading sub-domains..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sub Domains</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and monitor all connected sub-domains.</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center gap-2" 
          onClick={() => setIsAdding(!isAdding)}
        >
          <Plus className="w-4 h-4" />
          {isAdding ? 'Cancel' : 'Add Domain'}
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6 border-2 border-blue-100 dark:border-blue-900/30">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Sub-domain</h3>
          <form onSubmit={handleAddDomain} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Domain Name"
                placeholder="e.g. api.cusaathi.com"
                value={newDomain.name}
                onChange={(e) => setNewDomain({ ...newDomain, name: e.target.value })}
                icon={Globe}
                required
              />
              <Input
                label="Domain URL"
                type="url"
                placeholder="https://api.cusaathi.com"
                value={newDomain.url}
                onChange={(e) => setNewDomain({ ...newDomain, url: e.target.value })}
                icon={ExternalLink}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                <div className="relative">
                  <select
                    value={newDomain.type}
                    onChange={(e) => setNewDomain({ ...newDomain, type: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Internal">Internal Tool</option>
                  </select>
                  <Server className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <div className="relative">
                  <select
                    value={newDomain.status}
                    onChange={(e) => setNewDomain({ ...newDomain, status: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                  >
                    <option value="Live">Live</option>
                    <option value="Development">Development</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                  <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Create Sub-domain
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <Card key={domain.id} className="p-6 hover:shadow-lg transition-shadow relative group">
            <button 
              onClick={() => handleDelete(domain.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                <Globe className="w-6 h-6" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                domain.status === 'Live'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {domain.status === 'Live' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {domain.status}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              {domain.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Type: {domain.type}
            </p>


            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => alert(`Configure ${domain.name}\n\nConfiguration panel coming soon!`)}
              >
                Configure
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => domain.url && window.open(domain.url, '_blank')}
                title={domain.url ? `Visit ${domain.url}` : 'No URL set'}
                disabled={!domain.url}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
        {domains.length === 0 && !isAdding && (
           <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-200 dark:border-gray-700">
             <Globe className="w-12 h-12 mx-auto mb-4 text-gray-400" />
             <p>No sub-domains found.</p>
             <Button variant="ghost" className="mt-2" onClick={() => setIsAdding(true)}>Add your first domain</Button>
           </div>
        )}
      </div>
    </div>
  );
};

export default SubDomains;
