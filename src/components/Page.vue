<template>
  <div>
    <div class="header">
      <PageHeader />
    </div>
    <div class="content" :style="contentStyles" ref="swipeArea">
      <p class="text" :style="styles">
        {{ currentPageText }}
      </p>
    </div>
    <div class="footer">
      <PageFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import PageHeader from '@components/PageHeader.vue'
import PageFooter from '@components/PageFooter.vue'
import { useState } from '@store/state'
import { useSwipe } from '@vueuse/core'

const state = useState()
const router = useRouter()
const currentPage = ref([])
const swipeArea = ref(null)

const styles = {
  fontSize: `${state.fontSize}px`,
  letterSpacing: state.letterSpacing,
  textColor: state.textColor,
  backgroundColor: state.backgroundColor,
}
const contentStyles = {
  border: `1px solid ${state.textColor}`
}

onMounted(() => {
  currentPage.value = getPage()
})

const currentPageText = computed(() => {
  return currentPage.value.length
    ? currentPage.value.map(item => item.text).join(' ')
    : ''
})

const getPage = () => {
  const text = []
  state.quran.forEach(item => {
    item.ayahs.forEach(ayah => {
      if (ayah.page === state.currentPage) text.push(ayah)
    })
  });
  return text
}

// Initialize swipe detection
const { direction } = useSwipe(swipeArea, {
  threshold: 30,
  onSwipeEnd: () => {
    if (direction.value === 'left') {
      state.setCurrentPageNumber(state.currentPage - 1)
      router.replace({name: 'previousPage', params: {pageNumber: state.currentPage}})
    } else if (direction.value === 'right') {
      state.setCurrentPageNumber(state.currentPage + 1)
      router.replace({name: 'nextPage', params: {pageNumber: state.currentPage}})
    }
  },
})
</script>
<style scoped>
.text {
  direction: rtl;
  font-family: var(--arabic-indo-pak-font);
  margin: 8px;
  padding: 8px;
  text-align: justify;
  text-decoration: underline;
  text-underline-offset: 15px;
  text-decoration-thickness: 2px;
}
</style>