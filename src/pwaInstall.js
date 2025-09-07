// src/pwaInstall.js
import { ref } from 'vue'

export const deferredPrompt = ref(null)
export function isIosStandalone() {
  return window.navigator.standalone === true // Safari standalone mode
}

// capture the beforeinstallprompt and persist it in deferredPrompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt.value = e
})