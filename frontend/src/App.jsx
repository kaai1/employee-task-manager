import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Employees from './pages/employees/Employees';
import AddEmployee from './pages/employees/AddEmployee';
import EditEmployee from './pages/employees/EditEmployee';
import Tasks from './pages/tasks/Tasks';
import AddTask from './pages/tasks/AddTask';
import EditTask from './pages/tasks/EditTask';

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/login" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute adminOnly><Dashboard /></ProtectedRoute>
      }/>
      <Route path="/employees" element={
        <ProtectedRoute adminOnly><Employees /></ProtectedRoute>
      }/>
      <Route path="/employees/add" element={
        <ProtectedRoute adminOnly><AddEmployee /></ProtectedRoute>
      }/>
      <Route path="/employees/edit/:id" element={
        <ProtectedRoute adminOnly><EditEmployee /></ProtectedRoute>
      }/>
      <Route path="/tasks" element={
        <ProtectedRoute adminOnly><Tasks /></ProtectedRoute>
      }/>
      <Route path="/tasks/add" element={
        <ProtectedRoute adminOnly><AddTask /></ProtectedRoute>
      }/>
      <Route path="/tasks/edit/:id" element={
        <ProtectedRoute adminOnly><EditTask /></ProtectedRoute>
      }/>
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;