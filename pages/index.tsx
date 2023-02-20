import type { NextPage } from 'next';
import { useEffect } from 'react';
import useCookies from 'react-cookie/cjs/useCookies';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['new-user']);

  useEffect(() => {
    console.log('Cookies: ', cookies);
  }, [cookies]);

  const removeCookieHandler = () => {
    removeCookie('new-user');
  };

  const setCookieHandler = () => {
    setCookie('new-user', 'true', { path: '/' });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Cookie tutorial</h2>

        {!cookies['new-user'] && (
          <button onClick={setCookieHandler} className={styles.button}>
            Complete new user registration!
          </button>
        )}

        {cookies['new-user'] && (
          <button onClick={removeCookieHandler} className={styles.resetbutton}>
            Reset new user registration
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
