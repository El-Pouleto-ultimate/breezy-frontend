// NotificationsPage.jsx
// Page Notifications — liste toutes les notifications de l'utilisateur.
// Fonctionnalités couvertes : Fx14 mentions · Fx15 likes · Fx16 nouveaux followers

import AppLayout from "../components/layout/AppLayout";
import NotificationList from "../components/notifications/NotificationList";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationsPage() {
  const { notifications, loading, readAll } = useNotifications();

  return (
    <AppLayout>
      <h1 className="text-2xl font-semibold text-breezy-dark mb-5">Notifications</h1>
      <NotificationList
        notifications={notifications}
        loading={loading}
        onReadAll={readAll}
      />
    </AppLayout>
  );
}
