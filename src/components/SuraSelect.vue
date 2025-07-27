<template>
  <ul class="list">
    <li class="list-item" v-for="item in suraList" :key="item.number" @click="gotoSura(item.number)">
      <div class="english">
        <p class="number">{{ item.number }}. </p>
        <p class="englist-name">{{ item.englishName }}</p>
      </div>
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

const gotoSura = (suraNumber) => {
  const currentPage = state.quran.find(a => a.number === suraNumber).ayahs[0].page
  state.setCurrentPageNumber(currentPage)
  emit('closeSheet')
  nextTick(() => router.push({name: 'nextPage', params: {pageNumber: state.currentPage}}))
}
const suraList = state.quranInfo.surahs.references
</script>
<style scoped>
.list {
  margin: 20px;
  list-style: none;
}
.list-item {
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 10px;
 font-size: 20px;
 margin-top: 10px;
 padding: 20px 10px;
 border: 1px solid #ccc;
 border-radius: 8px;
 color: #0e3131;
 box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
.english {
  display: flex;
  gap: 10px;
  font-family: var(--english-fonts);
}
.arabic-name {
  direction: rtl;
}
</style>