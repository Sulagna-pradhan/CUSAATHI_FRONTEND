import { useState, useEffect } from 'react';
import { Card, Button, LoadingSpinner, Input, Modal } from '../../components/common';
import { Plus, AlertCircle, Trash2, Edit2, User, Calendar } from 'lucide-react';
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp, where, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../lib/contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  assignedByName: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: any;
  createdAt: any;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const { userData, currentUser } = useAuth();

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    dueDate: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchMembers();
  }, []);

  const fetchTasks = async () => {
    try {
      const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedTasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        fetchedTasks.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const q = query(collection(db, 'users'), where('isApproved', '==', true));
      const querySnapshot = await getDocs(q);
      const fetchedMembers: TeamMember[] = [];
      querySnapshot.forEach((doc) => {
        fetchedMembers.push({ id: doc.id, ...doc.data() } as TeamMember);
      });
      setMembers(fetchedMembers);
    } catch (error) {
      console.error("Error fetching members: ", error);
    }
  };

  const handleAddTask = async () => {
    if (!taskForm.title || !taskForm.assignedTo) {
      alert('Please fill in required fields');
      return;
    }

    const assignedMember = members.find(m => m.id === taskForm.assignedTo);
    
    try {
      const newTask = {
        title: taskForm.title,
        description: taskForm.description,
        assignedTo: taskForm.assignedTo,
        assignedToName: assignedMember?.name || '',
        assignedBy: currentUser?.uid || '',
        assignedByName: userData?.name || '',
        status: 'pending' as const,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate ? Timestamp.fromDate(new Date(taskForm.dueDate)) : null,
        createdAt: Timestamp.now()
      };

      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTasks([{ id: docRef.id, ...newTask }, ...tasks]);
      setIsAddingTask(false);
      resetForm();
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask) return;

    try {
      await updateDoc(doc(db, 'tasks', editingTask.id), {
        title: taskForm.title,
        description: taskForm.description,
        priority: taskForm.priority,
        dueDate: taskForm.dueDate ? Timestamp.fromDate(new Date(taskForm.dueDate)) : null
      });

      setTasks(tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, title: taskForm.title, description: taskForm.description, priority: taskForm.priority }
          : task
      ));
      setEditingTask(null);
      resetForm();
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: 'pending' | 'in-progress' | 'completed') => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), { status: newStatus });
      setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteDoc(doc(db, 'tasks', taskId));
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error("Error deleting task: ", error);
      }
    }
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      assignedTo: task.assignedTo,
      priority: task.priority,
      dueDate: task.dueDate ? new Date(task.dueDate.toDate()).toISOString().split('T')[0] : ''
    });
  };

  const resetForm = () => {
    setTaskForm({
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesAssignee = filterAssignee === 'all' || task.assignedTo === filterAssignee;
    return matchesStatus && matchesAssignee;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    myTasks: tasks.filter(t => t.assignedTo === currentUser?.uid).length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30';
      case 'low': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'No due date';
    return new Date(timestamp.toDate()).toLocaleDateString();
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading tasks..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Task Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Assign and track tasks for your team.</p>
        </div>
        <Button 
          variant="primary" 
          className="flex items-center gap-2"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="w-4 h-4" />
          New Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
          <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">My Tasks</p>
          <p className="text-2xl font-bold text-purple-600">{stats.myTasks}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Assignee</label>
            <select
              value={filterAssignee}
              onChange={(e) => setFilterAssignee(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Members</option>
              <option value={currentUser?.uid}>My Tasks</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Tasks List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{task.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                        {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4" />
                        Assigned to: <strong>{task.assignedToName}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        Due: {formatDate(task.dueDate)}
                      </span>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      Assigned by {task.assignedByName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Status Change Buttons */}
                {task.assignedTo === currentUser?.uid && (
                  <div className="flex gap-2">
                    {task.status !== 'in-progress' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => handleStatusChange(task.id, 'in-progress')}
                      >
                        Start
                      </Button>
                    )}
                    {task.status !== 'completed' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleStatusChange(task.id, 'completed')}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                )}
                
                {/* Edit/Delete Buttons (only for task creator) */}
                {task.assignedBy === currentUser?.uid && (
                  <div className="flex gap-2">
                    <button 
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      onClick={() => openEditModal(task)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
        
        {filteredTasks.length === 0 && (
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">No tasks found matching your filters.</p>
          </Card>
        )}
      </div>

      {/* Add/Edit Task Modal */}
      <Modal
        isOpen={isAddingTask || editingTask !== null}
        onClose={() => {
          setIsAddingTask(false);
          setEditingTask(null);
          resetForm();
        }}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <div className="space-y-4">
          <Input
            label="Task Title *"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
            placeholder="Enter task title"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {!editingTask && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assign To *</label>
              <select
                value={taskForm.assignedTo}
                onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select a team member</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>{member.name} ({member.email})</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
            <select
              value={taskForm.priority}
              onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <Input
            label="Due Date"
            type="date"
            value={taskForm.dueDate}
            onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
          />

          <div className="flex justify-end gap-2 mt-6">
            <Button 
              variant="ghost" 
              onClick={() => {
                setIsAddingTask(false);
                setEditingTask(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={editingTask ? handleUpdateTask : handleAddTask}
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
