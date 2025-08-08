import { Navigate, Outlet, useLoaderData, useLocation } from 'react-router-dom';
import type { AccountInfo } from './util/loaders/auth';
import { useState } from 'react';
import { AccountContext } from './util/context';

export function RequireAuth() {
  const accountInfo = useLoaderData() as AccountInfo;
  const [account, setAccount] = useState(accountInfo);

  const location = useLocation();
  const token = sessionStorage.getItem('token');
  if (!token)
    return <Navigate to='/welcome' replace state={{ from: location }} />;

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      <Outlet />
    </AccountContext.Provider>
  );
}

export function RequireNoAuth() {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  if (token) return <Navigate to='/' replace state={{ from: location }} />;
  return <Outlet />;
}
