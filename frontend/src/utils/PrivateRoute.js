import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const PrivateRoute = ({ Component }) => {
  const { user } = useContext(AuthContext);

  return user ? <Component /> : <Navigate to='/signin' />;
}

export default PrivateRoute;