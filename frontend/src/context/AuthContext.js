import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AuthContext = createContext();

export default AuthContext;


export const AuthProvider = ({ children }) => {

  const savedAuthTokens = localStorage.getItem('authTokens');
  const [authTokens, setAuthTokens] = useState(() => savedAuthTokens ? JSON.parse(savedAuthTokens) : null);
  const [user, setUser] = useState(() => savedAuthTokens ? jwt_decode(savedAuthTokens) : null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const loginUser = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    let response = await axios.post('http://127.0.0.1:8000/api/token/', {
     'username': formData.get('email'), 
     'password': formData.get('password'),
    })
    const data = response.data;
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/');
    } else {
      console.log(response)
      alert('Invalid credentials');
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
    logoutUser: logoutUser
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