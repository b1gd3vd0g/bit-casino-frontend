import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RequireAuth, RequireNoAuth } from './auth_gates.tsx';
import WelcomePage from './pages/welcome_page.tsx';
import HomePage from './pages/home_page.tsx';

import ByteBuilder from './pages/byte_builder.tsx';
import { authLoader } from './util/loaders/auth.ts';
import { LayoutWithHeader, LayoutWithoutHeader } from './layout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: <RequireNoAuth />,
        children: [
          {
            element: <LayoutWithoutHeader />,
            children: [
              {
                path: 'welcome',
                element: <WelcomePage />
              }
            ]
          }
        ]
      },
      {
        element: <RequireAuth />,
        loader: authLoader,
        children: [
          {
            element: <LayoutWithHeader />,
            children: [
              {
                index: true,
                element: <HomePage />
              },
              {
                path: 'slots/byte_builder',
                children: [
                  {
                    index: true,
                    element: <ByteBuilder />
                  }
                ]
              }
            ]
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
