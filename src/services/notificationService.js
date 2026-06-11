// notificationService.js
// Fonctions d'appel API pour les notifications (Fx14, Fx15, Fx16).

import api from "./api";

// GET /notifications — récupère toutes les notifications de l'utilisateur
export async function getNotifications() {
  const res = await api.get("/notifications");
  return res.data; // { notifications: [...], unreadCount: number }
}

// PUT /notifications/:id/read — marque une notification comme lue
export async function markAsRead(notificationId) {
  const res = await api.put(`/notifications/${notificationId}/read`);
  return res.data;
}

// PUT /notifications/read-all — marque toutes les notifications comme lues
export async function markAllAsRead() {
  const res = await api.put("/notifications/read-all");
  return res.data;
}
