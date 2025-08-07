import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='min-h-screen bg-background font-vt text-foreground'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
