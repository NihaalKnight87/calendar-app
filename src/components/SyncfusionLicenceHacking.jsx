/* I didnt commented here becuase this is not a realtime project its just a task. Keep in mind that i do comment every script which i write make it easer for other deverloper to read */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const SyncfusionLicenceHacking = () => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    showAlert && (setShowAlert(false), toast.success("Syncfusion Licence Hack Initiated!. Developed by NihaalKnight"), toast.success("Syncfusion Licence Realtime Hacked Again! Now its free. Developed by NihaalKnight"));
    const intervalId = setInterval(() => {
      toast.success("Syncfusion Licence Hacked! Now its free. Developed by NihaalKnight");
    }, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let observer;
    const removeSyncfusionBanner = () => {
      const banner = document.querySelector('div[style*="z-index: 999999999"]');
      banner && (banner.remove());
    };
    const monitorForBanner = () => {
      observer = new MutationObserver(() => { removeSyncfusionBanner(); });
      observer.observe(document.body, { childList: true, subtree: true, });
      removeSyncfusionBanner();
    };
    monitorForBanner();
    return () => {
      observer && observer.disconnect();
    };
  }, []);
}
const QuickSyncfusionLicenceHacking = () => {
  const clrTimeout = setTimeout(() => {
      const banner = document.querySelector('div > div[style*="z-index: 99999"]');
      banner && (banner.remove(), toast.success("Syncfusion Licence Realtime Hacked Again! Now its free. Developed by NihaalKnight"));
  }, 100);
  const clrTimeout1 = setTimeout(() => {
      const banner = document.querySelector('div > div[style*="z-index: 99999"]');
      banner && (banner.remove(), toast.success("Syncfusion Licence Realtime Hacked Again! Now its free. Developed by NihaalKnight"));
  }, 1000);
  const clrTimeout2 = setTimeout(() => {
      const banner = document.querySelector('div > div[style*="z-index: 99999"]');
      banner && (banner.remove(), toast.success("Syncfusion Licence Realtime Hacked Again! Now its free. Developed by NihaalKnight"));
  }, 5000);
  return () => clearInterval(clrTimeout), clearInterval(clrTimeout1), clearInterval(clrTimeout2);
}
export { SyncfusionLicenceHacking, QuickSyncfusionLicenceHacking};