// useNotifications.js
// Hook qui charge et gère les notifications (Fx14, Fx15, Fx16).

import { useState, useEffect } from "react";
import { getNotifications, markAllAsRead } from "../services/notificationService";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount]     = useState(0);
  const [loading, setLoading]             = useState(false);

  useEffect(() => {
    setLoading(true);
    getNotifications()
      .then((data) => {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      })
      .finally(() => setLoading(false));
  }, []);

  async function readAll() {
    await markAllAsRead();
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return { notifications, unreadCount, loading, readAll };
}
