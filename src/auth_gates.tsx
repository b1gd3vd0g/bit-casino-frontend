import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function RequireAuth() {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  if (!token)
    return <Navigate to='/welcome' replace state={{ from: location }} />;
  return <Outlet />;
}

export function RequireNoAuth() {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  if (!token) return <Navigate to='/' replace state={{ from: location }} />;
  return <Outlet />;
}
