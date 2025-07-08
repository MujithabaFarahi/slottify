import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Spinner } from '@/components/ui/spinner';

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
