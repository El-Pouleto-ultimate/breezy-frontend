// NotificationList.jsx
// Liste de toutes les notifications (Fx14, Fx15, Fx16).
//
// Props :
//   notifications : tableau de notifications
//   loading       : boolean
//   onReadAll     : function

import NotificationItem from "./NotificationItem";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

export default function NotificationList({ notifications, loading, onReadAll }) {
  if (loading) return <div className="flex justify-center py-8"><Spinner size="lg" /></div>;

  if (notifications.length === 0) {
    return (
      <p className="text-sm text-breezy-muted text-center py-12">
        Aucune notification pour l'instant.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Bouton "Tout marquer lu" */}
      <div className="flex justify-end mb-1">
        <Button variant="secondary" size="sm" onClick={onReadAll}>
          Tout marquer comme lu
        </Button>
      </div>

      {notifications.map((notif) => (
        <NotificationItem key={notif.id} notification={notif} />
      ))}
    </div>
  );
}
