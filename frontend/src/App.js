import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

import SignInPage from './pages/authentication/SignIn';
import SignUpPage from './pages/authentication/SignUp';
import AccountVerificationPage from './pages/authentication/AccountVerification';
import PageNotFoundPage from './pages/PageNotFound';
import UserProfilePage from './pages/user/UserProfile';
import FeedsPage from './pages/Feeds';
import UserProfileEditPage from './pages/user/UserProfileEdit';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<AuthProvider><SignInPage /></AuthProvider>} />
        <Route path='/signup' element={<AuthProvider><SignUpPage /></AuthProvider>} />

        <Route path='/' element={
                            <AuthProvider>
                              <PrivateRoute Component={FeedsPage}/>
                            </AuthProvider>}
                          />

        <Route path='/user/profile' element={
                                    <AuthProvider>
                                      <PrivateRoute Component={UserProfilePage}/>
                                    </AuthProvider>}
                                  />
        
        <Route path='/user/profile/edit' element={
                                    <AuthProvider>
                                      <PrivateRoute Component={UserProfileEditPage}/>
                                    </AuthProvider>}
                                  />

        <Route path='/account/verification/:code' element={<AccountVerificationPage />} />
        <Route path='/page-not-found' element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
