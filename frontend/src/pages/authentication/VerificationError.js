import styles from './AccountVerification.module.css';
import avatar from '../../images/cross.png';

const VerificationError = () => {
  return (
    <div className={styles.background}>
      <div className={styles.verificationDiv}>
          <div className={styles.imgcontainer}>
            <img src={avatar} alt="Avatar" className={styles.avatar} />
          </div>
          <h1>E-mail not Verified!</h1>
          <h3>Your primary e-mail is not verified. Please verify your e-mail.</h3>
      </div>
    </div>
  );
};

export default VerificationError;