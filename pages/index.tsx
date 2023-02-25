import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [isAuthorized, setAuthorization] = useState(false);
  const [launchCode, setLaunchCode] = useState('');
  const router = useRouter();

  const getCode = async () => {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ name: 'McKenzie' }),
    });

    const data = await response.json();

    if (data.authorize) {
      setAuthorization(true);
      setLaunchCode(data.code);
    }
  };

  useEffect(() => {
    getCode();
  }, []);

  const addCookie = () => {
    setCookie('user', true, {
      path: '/',
    });

    router.replace('/');
  };

  const removeCookie = () => {
    deleteCookie('user', {
      path: '/',
    });

    router.replace('/');
  };

  const verifyOTP = async (name: string) => {
    const response = await fetch('/api/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ name }),
    });

    const data = await response.json();

    if (data.authorize) {
      setAuthorization(true);
      setLaunchCode(data.code);
    } else {
      setAuthorization(false);
      alert('Invalid OTP');
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Cookie tutorial</h2>

        {!getCookie('user') && (
          <button onClick={addCookie} className={styles.button}>
            Complete new user registration!
          </button>
        )}

        {getCookie('user') && (
          <div className={styles.dashboard}>
            {!isAuthorized ? (
              <button
                onClick={() => verifyOTP('McKenzie')}
                className={styles.verifybutton}
              >
                Verify OTP
              </button>
            ) : (
              <div>
                <h2>Welcome Mr.President</h2>
                <h4>Launch Code</h4>
                <p>{launchCode}</p>
              </div>
            )}

            <button onClick={removeCookie} className={styles.resetbutton}>
              Reset new user registration
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
