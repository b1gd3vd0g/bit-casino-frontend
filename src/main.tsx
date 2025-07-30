import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Layout from './layout.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RequireAuth, RequireNoAuth } from './auth_gates.tsx';
import WelcomePage from './pages/welcome_page.tsx';
import HomePage from './pages/home_page.tsx';
import { homeLoader } from './loaders.ts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <RequireNoAuth />,
        children: [
          {
            path: 'welcome',
            element: <WelcomePage />
          }
        ]
      },
      {
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <HomePage />,
            loader: homeLoader
          }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
