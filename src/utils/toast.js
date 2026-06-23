'use client'

/**
 * Affiche un toast temporaire stylisé (remplace alert()).
 * Usage : showToast("Message d'erreur", "error")
 *         showToast("Succès !", "success")
 */
export function showToast(message, type = 'error') {
  if (typeof window === 'undefined') return

  const bg = type === 'success'
    ? 'bg-green-600'
    : 'bg-red-600'

  const toast = document.createElement('div')
  toast.className = `fixed bottom-20 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-2xl text-white text-sm font-medium shadow-lg ${bg} transition-all duration-300 animate-[fadeIn_0.3s_ease-out]`
  toast.textContent = message
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translate(-50%, 10px)'
    setTimeout(() => toast.remove(), 300)
  }, 3500)
}
