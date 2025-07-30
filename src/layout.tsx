import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='min-h-screen bg-gray-400 font-[vt323]'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
