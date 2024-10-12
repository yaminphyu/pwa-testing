import { useEffect, useState } from 'react';
import styles from '../styles/InstallPWA.module.css';
import { useAddToHomescreenPrompt } from '@/util/AddToHomescreenPrompt';

const InstallPWA = () => {
    const [ prompt, promptToInstall ] = useAddToHomescreenPrompt();

    useEffect(() => {
        if (window.matchMedia('(display-mode: standalone)').matches) {
            console.log("App is already installed");
        } else {
            console.log("App is not installed");
        }
    }, []);

  console.log('addToHomescreenPrompt >>> ', prompt);

  return (
    <div>
        <div className={styles['install-banner']}>
            <img src="/weibo/favicon.png" alt="App Icon" className="app-icon" />
            <button 
                className={styles['get-now-button']}
                onClick={
                    promptToInstall
                }>
            GET NOW
            </button>
        </div>
    </div>
  );
};

export default InstallPWA;