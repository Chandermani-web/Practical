import { useState, useEffect } from "react";
import PopupNotification from "../Components/Notifications/PopupNotification.jsx";
import { useSocket } from "./SocketContext";

const NotificationPopupManager = () => {
  const { notifications: socketNotifications } = useSocket();
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [shownIds, setShownIds] = useState(new Set());

  // Add only new notifications to the queue
  useEffect(() => {
    const newNotifications = socketNotifications.filter(
  (n) => !shownIds.has(n._id) && ["like","comment","message","friend_request","post"].includes(n.type)
);


    if (newNotifications.length > 0) {
      setQueue((prev) => [...prev, ...newNotifications]);
      setShownIds((prev) => new Set([...Array.from(prev), ...newNotifications.map(n => n._id)]));
    }
  }, [socketNotifications, shownIds]);

  // Show the first notification in the queue
  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
    }
  }, [queue, current]);

  // Auto-close after 5s
  useEffect(() => {
    if (current) {
      const timer = setTimeout(() => setCurrent(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  if (!current) return null;

  return <PopupNotification data={current} onClose={() => setCurrent(null)} />;
};

export default NotificationPopupManager;
