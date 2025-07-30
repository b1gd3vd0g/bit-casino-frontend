import { BrowserRouter, Route, Routes } from 'react-router-dom';

import WelcomePage from './pages/welcome_page';

function App() {
  return (
    <div className='min-h-screen bg-gray-400 font-[vt323]'>
      <BrowserRouter>
        <main>
          <Routes>
            <Route index element={<WelcomePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
