<template>
  <div class="page">
    <div class="header">
      <PageHeader :juzStart="juzStart"/>
    </div>
    <div class="content" :style="contentStyles" ref="swipeArea">
      <div class="page-wrapper" v-for="(ayah, index) in pageStructure" :key="index">
        <div v-if="ayah.number !== 0">
          <SuraStart class="sura-start" :suraNumber="getSuraNumber(ayah.number)"/>
        </div>
        <p :style="styles" class="text" v-html="ayah.text"></p>
      </div>
    </div>
    <div class="footer">
      <PageFooter />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '@store/state'
import { useSwipe } from '@vueuse/core'
import PageHeader from '@components/PageHeader.vue'
import PageFooter from '@components/PageFooter.vue'
import SuraStart from '@components/SuraStart.vue'
import sajdaIcon from '@/assets/icons/sajda.svg'
import qtr from '@/assets/icons/qtr.svg'
import tqtr from '@/assets/icons/tqtr.svg'
import half from '@/assets/icons/half.svg'

const state = useState()
const router = useRouter()
const currentPage = ref([])
const swipeArea = ref(null)
const pageStructure = ref([])
const juzStart = ref(false)

const styles = {
  fontSize: `${state.fontSize}px`,
  letterSpacing: `${state.letterSpacing}px`,
  color: state.textColor,
  backgroundColor: state.backgroundColor,
}
const contentStyles = {
  border: `1px solid ${state.textColor}`,
  margin: '10px'
}

onMounted(() => {
  currentPage.value = getPage()
  createPageStructure()
})

const getCurrentPageAyahs = () => {
  return state.quran.flatMap(item =>
    item.ayahs.filter(ayah => ayah.page === state.currentPage)
  );
};

const getPage = () => {
  const text = getCurrentPageAyahs()
  juzStart.value = text[0].juzStart
  return splitBySuraStart(text)
}

const createPageStructure = () => {
  currentPage.value.forEach(item => {
    pageStructure.value.push({
      number: item[0].numberInSurah === 1 ? item[0].number : 0,
      text: item.map(ayah => `
      <span>${ayah.text}</span>
      ${ayah.sajda ? `<img src="${sajdaIcon}" class="indicator"/>` : ''}
      ${((ayah.hizbQuarter % 8) - 2 === 0) && ayah.hizbQuarterEnd ? `<img src="${qtr}" class="indicator"/>` : ''}
      ${((ayah.hizbQuarter % 8) - 4 === 0) && ayah.hizbQuarterEnd ? `<img src="${half}" class="indicator"/>` : ''}
      ${((ayah.hizbQuarter % 8) - 6 === 0) && ayah.hizbQuarterEnd ? `<img src="${tqtr}" class="indicator"/>` : ''}
      `).join(' ')
    })
  })
}

function splitBySuraStart(text) {
  const result = [];
  let current = [];

  text.forEach((item, index) => {
    if (item.numberInSurah === 1 && current.length > 0) {
      result.push(current);
      current = [];
    }
    current.push(item);
  });

  if (current.length > 0) {
    result.push(current);
  }

  return result;
}

const getSuraNumber = (number) => {
  return state.quran.find(surah => 
    surah.ayahs.some(ayah => ayah.number === number)
  )?.number || null;
}

// Initialize swipe detection
const { direction } = useSwipe(swipeArea, {
  threshold: 30,
  onSwipeEnd: () => {
    if (direction.value === 'left') {
      state.currentPage !== 1 && state.setCurrentPageNumber(state.currentPage - 1)
      router.replace({name: 'previousPage', params: {pageNumber: state.currentPage}})
    } else if (direction.value === 'right') {
      state.currentPage !== 604 && state.setCurrentPageNumber(state.currentPage + 1)
      router.replace({name: 'nextPage', params: {pageNumber: state.currentPage}})
    }
  },
})
</script>
<style scoped>
.content {
  min-height: 100vh;
  overflow-x: hidden;
}
.text {
  direction: rtl;
  font-family: var(--arabic-indo-pak-font);
  margin-right: 4px;
  padding: 8px;
  text-align: justify;
  text-decoration: underline;
  text-underline-offset: 15px;
  text-decoration-thickness: 2px;
  text-wrap: none;
  word-break: keep-all;
}
::v-deep(.indicator) {
  height: 50px;
  margin: 0;
  vertical-align: bottom;
}
</style>