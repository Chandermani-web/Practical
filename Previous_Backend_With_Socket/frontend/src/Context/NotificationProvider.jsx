import { useState, useEffect } from "react";
import PopupNotification from "../Components/Notifications/PopupNotification.jsx";
import { useSocket } from "./SocketContext";

const NotificationPopupManager = () => {
  const { notifications: socketNotifications } = useSocket();
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    if (socketNotifications.length > 0) {
      const latest = socketNotifications[socketNotifications.length - 1];
      setPopup(latest);

      const timer = setTimeout(() => setPopup(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [socketNotifications]);

  if (!popup) return null;
  return <PopupNotification data={popup} onClose={() => setPopup(null)} />;
};

export default NotificationPopupManager;
