<template>
  <div v-if="show && !state.isInstalled" class="install-banner">
    <template v-if="isIOS">
      <p>
        📲 Install My Quran on your iPhone:
        Tap Share button <span class="ios-icon">▢↑</span> and choose
        <strong>"Add to Home Screen"</strong>
      </p>
    </template>

    <template v-else>
      <p>📲 Install My Quran for offline use</p>
      <button @click="installApp">Install</button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useState } from '@store/state'

const state = useState()
const show = ref(false)
const isIOS = ref(false)
let deferredPrompt = null

// Check if app is already installed
const checkIfInstalled = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

const checkIfIOS = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  return /iphone|ipad|ipod/.test(ua) && !window.MSStream
}

onMounted(() => {
  isIOS.value = checkIfIOS()
  state.setInstalled(checkIfInstalled())

  if (!state.isInstalled) {
    if (isIOS.value) {
      // Show instructions for iOS
      show.value = true
    } else {
      // Android / Chrome
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault()
        deferredPrompt = e
        show.value = true
      })
    }
  }
})

const installApp = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      state.setInstalled(true)
      show.value = false
    } else {
      // User dismissed — will show next time
      show.value = true
    }
    deferredPrompt = null
  }
}
</script>

<style scoped>
.install-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0e3131;
  color: white;
  padding: 12px;
  text-align: center;
  z-index: 999;
  font-family: var(--english-fonts, sans-serif);
  font-size: 14px;
}
button {
  margin-left: 10px;
  padding: 6px 12px;
  background: white;
  color: #0e3131;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.ios-icon {
  display: inline-block;
  font-weight: bold;
  font-size: 16px;
  background: white;
  color: #0e3131;
  padding: 2px 4px;
  border-radius: 8px;
}
</style>