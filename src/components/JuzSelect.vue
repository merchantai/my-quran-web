<template>
  <ul class="list">
    <li class="list-item" v-for="item in suraList" :key="item.juz" @click="gotoJuz(item.juz)">
      <p class="number">{{ item.juz }}. </p>
      <p class="arabic-name">{{ item.name }}</p>
    </li>
  </ul>
</template>
<script setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '@store/state';

const router = useRouter()
const state = useState()
const emit = defineEmits(['closeSheet'])

const gotoJuz = (juzNumber) => {
  let currentPage = null
  for (let sura of state.quran) {
    if (sura.ayahs.some(item => item.juz === juzNumber && item.juzStart)) {
      currentPage = sura.ayahs.find(item => item.juz === juzNumber && item.juzStart).page
      break
    }
  }
  state.setCurrentPageNumber(currentPage)
  emit('closeSheet')
  nextTick(() => router.push({name: 'nextPage', params: {pageNumber: state.currentPage}}))
}
const suraList = state.quranInfo.juzs.references
</script>
<style scoped>
.list {
  margin: 20px;
  list-style: none;
}
.list-item {
 display: flex;
 align-items: center;
 gap: 15px;
 font-size: 20px;
 margin-top: 10px;
 padding: 20px 10px;
 border: 1px solid #ccc;
 border-radius: 8px;
 color: #0e3131;
 box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>