import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='bg-background font-vt text-foreground'>
      <main className='min-h-screen'>
        <Outlet />
      </main>
    </div>
  );
}
