import React, { useState } from 'react';
import { LogIn, User, Key, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
  type: 'user' | 'admin';
  onSwitchToSignUp?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ type, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            type === 'admin' ? 'bg-purple-100' : 'bg-blue-100'
          }`}>
            {type === 'admin' ? (
              <Key className={`w-8 h-8 ${type === 'admin' ? 'text-purple-600' : 'text-blue-600'}`} />
            ) : (
              <User className={`w-8 h-8 ${type === 'admin' ? 'text-purple-600' : 'text-blue-600'}`} />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {type === 'admin' ? 'Admin Login' : 'User Login'}
          </h1>
          <p className="text-gray-600 mt-2">
            {type === 'admin' 
              ? 'Access the administration panel'
              : 'Sign in to your finance dashboard'
            }
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : type === 'admin'
                ? 'bg-purple-600 hover:bg-purple-700 active:transform active:scale-98'
                : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-98'
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <LogIn className="w-5 h-5 mr-2" />
            )}
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {type === 'user' && onSwitchToSignUp && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitchToSignUp}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        )}

        {type === 'user' && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Admin?{' '}
              <a href="/admin" className="text-purple-600 hover:text-purple-700 font-medium">
                Admin Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;