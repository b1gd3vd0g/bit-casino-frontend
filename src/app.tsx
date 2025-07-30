import { BrowserRouter, Route, Routes } from 'react-router-dom';

import WelcomePage from './pages/welcome_page';
import HomePage from './pages/home_page';
import { RequireAuth, RequireNoAuth } from './auth_gates';

function App() {
  return (
    <div className='min-h-screen bg-gray-400 font-[vt323]'>
      <BrowserRouter>
        <main>
          <Routes>
            {/* These paths are blocked if you ARE authenticated. */}
            <Route element={<RequireNoAuth />}>
              <Route path='/welcome' element={<WelcomePage />} />
            </Route>
            {/* These paths are blocked behind token authentication. */}
            <Route element={<RequireAuth />}>
              <Route index element={<HomePage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
