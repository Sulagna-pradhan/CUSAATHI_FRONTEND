import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../lib/contexts/AuthContext';
import { Button, Input, Card, LoadingSpinner } from '../../components/common';
import { UserPlus, Mail, Lock, User, Calendar, Briefcase } from 'lucide-react';
import { auth } from '../../config/firebase';

export const DevTeamRegister = () => {
  const { signup, sendVerificationEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 'prefer-not-to-say',
    designation: 'Frontend Developer', // Default designation
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, {
        name: formData.name,
        dob: formData.dob,
        gender: formData.gender,
        designation: formData.designation,
      });

      // Send verification email
      if (auth.currentUser) {
        await sendVerificationEmail(auth.currentUser);
        await logout(); // Auto logout after signup
      }
      
      alert('Account created! Please verify your email before logging in.');
      navigate('/dev-team/login');
    } catch (err: any) {
      console.error(err);
      setError('Failed to create an account. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4 py-8">
      <Card className="w-full max-w-2xl p-8 shadow-xl border-t-4 border-t-blue-600">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Join the Dev Team
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account to access the developer dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              placeholder="User Name"
              value={formData.name}
              onChange={handleChange}
              icon={User}
              required
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="user@cusaathi.in"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              icon={Calendar}
              required
            />
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Designation
              </label>
              <div className="relative">
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none"
                >
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Fullstack Developer">Fullstack Developer</option>
                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="DevOps Engineer">DevOps Engineer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Project Manager">Project Manager</option>
                </select>
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={Lock}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              required
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="sm" text="Creating Account..." /> : 'Create Account'}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/dev-team/login" className="text-blue-600 hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};


