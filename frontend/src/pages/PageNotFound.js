import styles from './PageNotFound.module.css';


const PageNotFoundPage = () => {
  return (
    <div className={styles.main}>
      <div className={styles.fof}>
        <h1>Error 404</h1>
      </div>
    </div>
  );
};

export default PageNotFoundPage;