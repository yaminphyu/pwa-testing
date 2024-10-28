import { useEffect, useState } from "react";

const usePWAStatus = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleAppInstalled = () => {
      console.log("App is installed");
      setIsInstalled(true);
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the mini-infobar from appearing
      setIsInstalled(false);
      console.log("App can be installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check if the app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  return isInstalled;
};

export default usePWAStatus;
