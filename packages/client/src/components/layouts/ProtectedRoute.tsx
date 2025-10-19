import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '@/zustand/authStore';
import MainLayout from './MainLayout';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth() as { isAuthenticated: boolean };

  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/auth" replace />
  );
};

export default ProtectedRoute;
