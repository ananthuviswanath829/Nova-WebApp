import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import TopBar from './pages/TopBar';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<AuthProvider><SignInPage /></AuthProvider>} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/' element={<TopBar />} />
      </Routes>
    </div>
  );
};

export default App;
