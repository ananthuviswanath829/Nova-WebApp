import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';

import SignInPage from './pages/authentication/SignIn';
import SignUpPage from './pages/authentication/SignUp';
import AccountVerificationPage from './pages/authentication/AccountVerification';
import PageNotFoundPage from './pages/PageNotFound';
import UserProfilePage from './pages/user/UserProfile';
import FeedsPage from './pages/Feeds';
import UserProfileEditPage from './pages/user/UserProfileEdit';
import SearchResultPage from './pages/friend/SearchResult';
import PersonProfilePage from './pages/friend/PersonProfile';
import FriendsListPage from './pages/friend/FriendsList';
import FriendRequestListPage from './pages/friend/FriendRequestList';
import ChatPage from './pages/message/Chat';
import WorkListPage from './pages/work/WorkList';
import WorkCreatePage from './pages/work/WorkCreate';
import WorkEditPage from './pages/work/WorkEdit';
import PaymentPage from './pages/payment/Payment';
import UserListPage from './pages/admin/UserList';

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

        <Route path='/person/profile/:id' element={
                                    <AuthProvider>
                                      <SearchProvider>
                                        <PrivateRoute Component={PersonProfilePage}/>
                                      </SearchProvider>
                                    </AuthProvider>}
                                  />
        
        <Route path='/friends/list' element={
                                    <AuthProvider>
                                      <SearchProvider>
                                        <PrivateRoute Component={FriendsListPage}/>
                                      </SearchProvider>
                                    </AuthProvider>}
                                  />
        
        <Route path='/friend/requests' element={
                                    <AuthProvider>
                                      <SearchProvider>
                                        <PrivateRoute Component={FriendRequestListPage}/>
                                      </SearchProvider>
                                    </AuthProvider>}
                                  />
        
        <Route path='/chat' element={
                                <AuthProvider>
                                  <SearchProvider>
                                    <PrivateRoute Component={ChatPage}/>
                                  </SearchProvider>
                                </AuthProvider>}
                              />
        
        <Route path='/work/list' element={
                                <AuthProvider>
                                  <SearchProvider>
                                    <PrivateRoute Component={WorkListPage}/>
                                  </SearchProvider>
                                </AuthProvider>}
                              />

        <Route path='/work/create' element={
                                        <AuthProvider>
                                          <SearchProvider>
                                            <PrivateRoute Component={WorkCreatePage}/>
                                          </SearchProvider>
                                        </AuthProvider>}
                                      />

        <Route path='/work/edit/:id' element={
                                        <AuthProvider>
                                          <SearchProvider>
                                            <PrivateRoute Component={WorkEditPage}/>
                                          </SearchProvider>
                                        </AuthProvider>}
                                      />
        
        <Route path='/payment' element={
                                        <AuthProvider>
                                          <SearchProvider>
                                            <PrivateRoute Component={PaymentPage}/>
                                          </SearchProvider>
                                        </AuthProvider>}
                                      />

        <Route path='/admin/home' element={
                                        <AuthProvider>
                                          <AdminRoute Component={UserListPage}/>
                                        </AuthProvider>}
                                      />

        <Route path='/account/verification/:code' element={<AccountVerificationPage />} />
        <Route path='/page-not-found' element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;