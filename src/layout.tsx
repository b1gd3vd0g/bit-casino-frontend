import { Outlet } from 'react-router-dom';
import Header from './header';

export function LayoutWithHeader() {
  return (
    <div className='bg-background font-vt text-foreground'>
      <Header />
      <main className='min-h-screen'>
        <Outlet />
      </main>
    </div>
  );
}

export function LayoutWithoutHeader() {
  return (
    <div className='bg-background font-vt text-foreground'>
      <main className='min-h-screen'>
        <Outlet />
      </main>
    </div>
  );
}
