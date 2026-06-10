import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import API from '../../utils/api';
import toast from 'react-hot-toast';

// Stat Card Component
const StatCard = ({ title, value, color, icon }) => (
  <div className={`bg-white rounded-xl shadow p-6 border-l-4 ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await API.get('/dashboard');
      setStats(response.data.stats);
    } catch (error) {
      toast.error('Failed to fetch dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in_progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-20 text-gray-500 text-lg">
          Loading dashboard...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Welcome! Here's what's happening today.</p>
      </div>

      {/* Stat Cards Row 1 — Employees */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          👥 Employee Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard
            title="Total Employees"
            value={stats?.employees?.total || 0}
            color="border-blue-500"
            icon="👥"
          />
          <StatCard
            title="Active Employees"
            value={stats?.employees?.total || 0}
            color="border-green-500"
            icon="✅"
          />
        </div>
      </div>

      {/* Stat Cards Row 2 — Tasks */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          📋 Task Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Tasks"
            value={stats?.tasks?.total || 0}
            color="border-purple-500"
            icon="📋"
          />
          <StatCard
            title="Pending"
            value={stats?.tasks?.pending || 0}
            color="border-gray-400"
            icon="⏳"
          />
          <StatCard
            title="In Progress"
            value={stats?.tasks?.in_progress || 0}
            color="border-yellow-500"
            icon="🔄"
          />
          <StatCard
            title="Completed"
            value={stats?.tasks?.completed || 0}
            color="border-green-500"
            icon="🎉"
          />
        </div>
      </div>

      {/* Bottom Section — Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🕐 Recent Tasks
          </h2>
          {stats?.recent_tasks?.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No tasks yet</p>
          ) : (
            <div className="space-y-3">
              {stats?.recent_tasks?.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {task.employee_name || 'Unassigned'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}>
                      {task.status?.replace('_', ' ')}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Employees */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            👤 Recent Employees
          </h2>
          {stats?.recent_employees?.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No employees yet</p>
          ) : (
            <div className="space-y-3">
              {stats?.recent_employees?.map((emp) => (
                <div
                  key={emp.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {emp.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {emp.name}
                    </p>
                    <p className="text-xs text-gray-400">{emp.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Priority Breakdown */}
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          📊 Tasks by Priority
        </h2>
        <div className="flex gap-4 flex-wrap">
          {stats?.priority_breakdown?.map((item) => (
            <div
              key={item.priority}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg ${getPriorityColor(item.priority)}`}
            >
              <span className="font-bold text-lg">{item.count}</span>
              <span className="capitalize font-medium">{item.priority} priority</span>
            </div>
          ))}
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;