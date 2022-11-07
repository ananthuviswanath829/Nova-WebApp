import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import PrivateRoute from './utils/PrivateRoute';

import SignInPage from './pages/authentication/SignIn';
import SignUpPage from './pages/authentication/SignUp';
import AccountVerificationPage from './pages/authentication/AccountVerification';
import PageNotFoundPage from './pages/PageNotFound';
import UserProfilePage from './pages/user/UserProfile';
import FeedsPage from './pages/Feeds';
import UserProfileEditPage from './pages/user/UserProfileEdit';
import SearchResultPage from './pages/SearchResult';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/signin' element={<AuthProvider><SignInPage /></AuthProvider>} />
        <Route path='/signup' element={<AuthProvider><SignUpPage /></AuthProvider>} />

        <Route path='/' element={
                            <AuthProvider>
                              <SearchProvider>
                                <PrivateRoute Component={FeedsPage}/>
                              </SearchProvider>
                            </AuthProvider>}
                          />

        <Route path='/user/profile' element={
                                    <AuthProvider>
                                      <SearchProvider>
                                        <PrivateRoute Component={UserProfilePage}/>
                                      </SearchProvider>
                                    </AuthProvider>}
                                  />
        
        <Route path='/user/profile/edit' element={
                                    <AuthProvider>
                                      <SearchProvider>
                                        <PrivateRoute Component={UserProfileEditPage}/>
                                      </SearchProvider>
                                    </AuthProvider>}
                                  />

        <Route path='/search/result' element={
                                    <AuthProvider>
                                      <SearchProvider>
                                        <PrivateRoute Component={SearchResultPage}/>
                                      </SearchProvider>
                                    </AuthProvider>}
                                  />

        <Route path='/account/verification/:code' element={<AccountVerificationPage />} />
        <Route path='/page-not-found' element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
