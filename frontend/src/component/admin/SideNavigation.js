import { useContext } from 'react';
import { Link } from 'react-router-dom';

import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PendingIcon from '@mui/icons-material/Pending';

import styles from './SideNavigation.module.css';
import AuthContext from '../../context/AuthContext';

const SideNavigation = () => {

  const { logoutUser } = useContext(AuthContext);

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <h2>Nova</h2>
        <ul>
          <li><Link to="/admin/transactions" className={styles.link}><CurrencyExchangeIcon className={styles.fas} /><span>Transactions</span></Link></li>
          <li><Link to="/admin/payment/pending" className={styles.link}><PendingIcon className={styles.fas} /><span>Payment Pending</span></Link></li>
          <li><Link to="/admin/users" className={styles.link}><GroupIcon className={styles.fas} /><span>Users</span></Link></li>
          <li onClick={logoutUser}><Link to="/signin" className={styles.link}><LogoutIcon className={styles.fas} /><span>Logout</span></Link></li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavigation;