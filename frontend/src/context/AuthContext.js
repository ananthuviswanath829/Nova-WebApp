import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext();

export default AuthContext;

const baseURL = 'http://127.0.0.1:8000';

export const AuthProvider = ({ children }) => {

  const savedAuthTokens = localStorage.getItem('authTokens');
  const [authTokens, setAuthTokens] = useState(() => savedAuthTokens ? JSON.parse(savedAuthTokens) : null);
  const [user, setUser] = useState(() => savedAuthTokens ? jwt_decode(savedAuthTokens) : null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const resObj = {
    axiosError: false,
    errMsg: '',
    errHeading: '',
    successMsg: '',
    showAlert: false,
  };

  const [apiRes, setApiRes] = useState(resObj);

  const loginUser = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post(`${baseURL}/api/token/`, {
        'username': formData.get('email'), 
        'password': formData.get('password'),
      });

      const data = response.data;
      const jwt_data = jwt_decode(data.access);
      if (jwt_data.is_verified_user) {
        setAuthTokens(data);
        setUser(jwt_data);
        localStorage.setItem('authTokens', JSON.stringify(data));
        if (jwt_data.is_superuser) {
          navigate('/admin/transactions');
        } else {
          navigate('/');
        }
      } else {
        navigate('/email-not-verified');
      }
    } catch (err) {
      setApiRes({
        ...apiRes,
        axiosError: true,
        errMsg: JSON.stringify(err.response.data),
        errHeading: 'Sign In',
      });
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    setUser: setUser,
    setAuthTokens: setAuthTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
    apiRes: apiRes,
    setApiRes: setApiRes,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};