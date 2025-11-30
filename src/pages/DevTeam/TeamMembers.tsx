import { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner, Input, Modal } from '../../components/common';
import { Plus, Search, Trash2, Edit2, CheckCircle, Clock, Filter, Shield, User } from 'lucide-react';
import { collection, query, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/contexts/AuthContext';
import { logActivity } from '../../lib/utils/activityLogger';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  designation: string;
  isApproved: boolean;
}

const TeamMembers = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editForm, setEditForm] = useState({ name: '', designation: '', role: '' });
  const { userData, currentUser } = useAuth();
  const navigate = useNavigate();

  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const q = query(collection(db, 'users')); 
      const querySnapshot = await getDocs(q);
      const fetchedMembers: TeamMember[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMembers.push({ id: doc.id, ...doc.data() } as TeamMember);
      });
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching members: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const memberToDelete = members.find(m => m.id === id);
    if (window.confirm('Are you sure you want to remove this member?')) {
      try {
        await deleteDoc(doc(db, 'users', id));
        setMembers(members.filter(member => member.id !== id));
        
        // Log activity
        if (currentUser && userData) {
          await logActivity({
            userId: currentUser.uid,
            userName: userData.name,
            action: 'member_delete',
            details: { 
              memberName: memberToDelete?.name || 'Unknown',
              memberEmail: memberToDelete?.email || 'N/A'
            }
          });
        }
      } catch (error) {
        console.error("Error deleting member: ", error);
      }
    }
  };

  const handleApprove = async (id: string) => {
    const memberToApprove = members.find(m => m.id === id);
    try {
      await updateDoc(doc(db, 'users', id), {
        isApproved: true
      });
      setMembers(members.map(member => 
        member.id === id ? { ...member, isApproved: true } : member
      ));
      
      // Log activity
      if (currentUser && userData) {
        await logActivity({
          userId: currentUser.uid,
          userName: userData.name,
          action: 'approve',
          details: { 
            memberName: memberToApprove?.name || 'Unknown',
            memberEmail: memberToApprove?.email || 'N/A'
          }
        });
      }
    } catch (error) {
      console.error("Error approving member: ", error);
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    const memberToUpdate = members.find(m => m.id === id);
    const oldRole = memberToUpdate?.role;
    try {
      await updateDoc(doc(db, 'users', id), {
        role: newRole
      });
      setMembers(members.map(member => 
        member.id === id ? { ...member, role: newRole } : member
      ));
      
      // Log activity
      if (currentUser && userData && oldRole !== newRole) {
        await logActivity({
          userId: currentUser.uid,
          userName: userData.name,
          action: 'role_change',
          details: { 
            memberName: memberToUpdate?.name || 'Unknown',
            oldRole: oldRole || 'N/A',
            newRole: newRole
          }
        });
      }
    } catch (error) {
      console.error("Error changing role: ", error);
    }
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setEditForm({ 
      name: member.name, 
      designation: member.designation,
      role: member.role
    });
  };

  const handleEditSubmit = async () => {
    if (!editingMember) return;
    
    try {
      await updateDoc(doc(db, 'users', editingMember.id), {
        name: editForm.name,
        designation: editForm.designation,
        ...(isAdmin && { role: editForm.role })
      });
      
      setMembers(members.map(member => 
        member.id === editingMember.id 
          ? { ...member, name: editForm.name, designation: editForm.designation, ...(isAdmin && { role: editForm.role }) }
          : member
      ));
      
      // Log activity
      if (currentUser && userData) {
        await logActivity({
          userId: currentUser.uid,
          userName: userData.name,
          action: 'member_edit',
          details: { 
            memberName: editForm.name,
            memberEmail: editingMember.email,
            changes: {
              name: editForm.name !== editingMember.name,
              designation: editForm.designation !== editingMember.designation,
              role: isAdmin && editForm.role !== editingMember.role
            }
          }
        });
      }
      
      setEditingMember(null);
    } catch (error) {
      console.error("Error updating member: ", error);
    }
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'approved' && member.isApproved) ||
      (statusFilter === 'pending' && !member.isApproved);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: members.length,
    approved: members.filter(m => m.isApproved).length,
    pending: members.filter(m => !m.isApproved).length,
    admins: members.filter(m => m.role === 'admin').length
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading team members..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Team Members</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your development team access and roles.</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={() => navigate('/dev-team/register')}
        >
          <Plus className="w-4 h-4" />
          Add Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Admins</p>
          <p className="text-2xl font-bold text-blue-600">{stats.admins}</p>
        </Card>
      </div>

      <Card className="p-4">
        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or designation..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(roleFilter !== 'all' || statusFilter !== 'all') && (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs">
                  Active
                </span>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">All Roles</option>
                    <option value="dev-team">Dev Team</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setRoleFilter('all');
                      setStatusFilter('all');
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Showing {filteredMembers.length} of {members.length} members
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Member</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Designation</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Role</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {member.designation || 'N/A'}
                    </span>
                  </td>
                  <td className="p-4">
                    {isAdmin ? (
                      <select
                        value={member.role}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border-none outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <option value="dev-team">Dev Team</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                        {member.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {member.role}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {member.isApproved ? (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" /> Approved
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
                        <Clock className="w-4 h-4" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!member.isApproved && isAdmin && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => handleApprove(member.id)}
                        >
                          Approve
                        </Button>
                      )}
                      <button 
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        onClick={() => openEditModal(member)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {isAdmin && (
                        <button 
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          onClick={() => handleDelete(member.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No team members found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Edit Member Modal */}
      <Modal
        isOpen={editingMember !== null}
        onClose={() => setEditingMember(null)}
        title="Edit Team Member"
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Enter name"
          />
          <Input
            label="Designation"
            value={editForm.designation}
            onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
            placeholder="Enter designation"
          />
          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="dev-team">Dev Team</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="ghost" onClick={() => setEditingMember(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeamMembers;
