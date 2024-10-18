import { useEffect, useState } from 'react';
import styles from '../styles/InstallPWA.module.css';
import { useAddToHomescreenPrompt } from '@/util/AddToHomescreenPrompt';

const InstallPWA = () => {
//     const [ prompt, promptToInstall ] = useAddToHomescreenPrompt();

//     useEffect(() => {
//         if (window.matchMedia('(display-mode: standalone)').matches) {
//             console.log("App is already installed");
//         } else {
//             console.log("App is not installed");
//         }
//     }, []);

//   console.log('addToHomescreenPrompt >>> ', prompt);

// const [ prompt, promptToInstall ] = useAddToHomescreenPrompt();
        
    const [prompt, setState] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const promptToInstall = () => {
        if (prompt) {
        return prompt.prompt();
        }
        return Promise.reject(
        new Error(
            'Tried installing before browser sent "beforeinstallprompt" event',
        ),
        );
    };

    useEffect(() => {
        // const ready = (e) => {
        //   e.preventDefault();
        //   setState(e);
        // };

        // window.addEventListener('beforeinstallprompt', ready);

        // return () => {
        //   window.removeEventListener('beforeinstallprompt', ready);
        // };

        let deferredPrompt;

        // Check if the beforeinstallprompt event fires
        const handleBeforeInstallPrompt = (e) => {
        e.preventDefault(); // Prevent the default prompt from showing
        deferredPrompt = e; // Save the event to trigger later
        setState(e);
        setIsVisible(true); // Show the custom install button
        };

        const handleAppInstalled = () => {
        setIsVisible(false); // Hide the button after installation
        setState(null) // Optionally update your redux store
        };

        // Add event listeners
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        // Cleanup event listeners on unmount
        return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
        };
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