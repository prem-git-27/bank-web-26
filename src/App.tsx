import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');

  useEffect(() => {
    // Check if URL indicates admin login
    const path = window.location.pathname;
    if (path === '/admin') {
      setLoginType('admin');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    if (showSignUp) {
      return <SignUpForm onSwitchToLogin={() => setShowSignUp(false)} />;
    }

    return (
      <LoginForm
        type={loginType}
        onSwitchToSignUp={loginType === 'user' ? () => setShowSignUp(true) : undefined}
      />
    );
  }

  // Redirect if user tries to access admin with user role
  if (loginType === 'admin' && user.role !== 'admin') {
    setLoginType('user');
  }

  return user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;