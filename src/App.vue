
<template>
  <div class="main-app">
    <RouterView v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </transition>
    </RouterView>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useState } from './store/state'

const state = useState();
onMounted(() => {
  state.initializeDefaults()
})

const route = useRoute()
const transitionName = ref('')

// Normalize to remove dynamic param
const normalizePath = (path) => {
  return path.replace(/\/\d+$/, '').toLowerCase()
}

watch(
  () => route.fullPath,
  () => {
    const basePath = normalizePath(route.path)

    if (basePath === '/previous-page') {
      transitionName.value = 'slide-left'
    } else if (basePath === '/next-page') {
      transitionName.value = 'slide-right'
    } else {
      transitionName.value = 'fade'
    }
  },
  { immediate: true }
)
</script>
<style scoped>
.main-app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100dvh;
}
/* Slide Left (Next Page) */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Slide Right (Previous Page) */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

/* Optional fade for other routes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
