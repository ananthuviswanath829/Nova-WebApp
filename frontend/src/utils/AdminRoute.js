import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


const AdminRoute = ({ Component }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return user.is_superuser ? <Component /> : <Navigate to='/signin' />;
  } else {
    return <Navigate to='/signin' />;
  }
};

export default AdminRoute;