import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Task Manager</h1>
        <p className="text-gray-400 text-sm mt-1">{user?.name}</p>
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded mt-1 inline-block">
          {user?.role}
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/dashboard')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          📊 Dashboard
        </Link>
        <Link
          to="/employees"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/employees')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          👥 Employees
        </Link>
        <Link
          to="/tasks"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
            isActive('/tasks')
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-gray-800'
          }`}
        >
          ✅ Tasks
        </Link>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;