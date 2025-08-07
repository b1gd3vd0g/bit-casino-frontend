import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='min-h-screen bg-neutral-950 font-[vt323] text-emerald-400'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
