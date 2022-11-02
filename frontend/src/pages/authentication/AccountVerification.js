import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Link from '@mui/material/Button';

import styles from './AccountVerification.module.css';
import avatar from '../../images/success-tick.png';


const AccountVerificationPage = () => {
  const navigate = useNavigate();

  const baseURL = 'http://127.0.0.1:8000';
  const docUrIArr = window.location.href.split('/');
  const token = docUrIArr[docUrIArr.length - 1];

  useEffect(() => {
    checkCodeExists();
  }, [])

  const checkCodeExists = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/user/check/verification/token`, {
        params: { token: token }
      });
    } catch (error) {
      navigate('/page-not-found');
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.verificationDiv}>
          <div className={styles.imgcontainer}>
            <img src={avatar} alt="Avatar" className={styles.avatar} />
          </div>
          <h1>Verified!</h1>
          <h3>You have successfully verified account</h3>
          <Link href='/signin' className={styles.loginButton}>Login</Link>
      </div>
    </div>
  );
};

export default AccountVerificationPage;