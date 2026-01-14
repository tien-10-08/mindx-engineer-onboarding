import { useAuth } from '../contexts/AuthContext';
import { Button, Card } from 'antd';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Welcome to MindX Fullstack
          </h1>
          <Button
            type="primary"
            danger
            icon={<LogOut size={18} />}
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            Logout
          </Button>
        </div>

        <Card className="shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user?.displayName || 'User'}
              </h2>
              <p className="text-gray-500">@{user?.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800 font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="text-gray-800 font-mono text-sm">{user?._id}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

