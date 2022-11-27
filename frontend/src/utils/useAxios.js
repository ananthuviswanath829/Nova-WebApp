import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'


const baseURL = 'http://127.0.0.1:8000';

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isTokenExpired) return req;

    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
      refresh: authTokens.refresh
    });

    const data = response.data;
    localStorage.setItem('authTokens', JSON.stringify(data));
    setAuthTokens(data);
    setUser(jwt_decode(data.access));
    req.headers.Authorization = `Bearer ${data.access}`;
    
    return req;
  });

  return axiosInstance;
};

export default useAxios;