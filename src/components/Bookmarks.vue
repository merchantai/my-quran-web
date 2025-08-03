<template>
  <div class="bookmarks">
    <p class="no-bookmarks" v-if="state.bookmarks?.length === 0">No saved bookmarks</p>
    <div class="bookmark" v-for="bookmark in state.bookmarks" @click="gotoBookmark(bookmark)">
      <div class="bookmark-details">
        <div class="first-row">
          <p class="page-no">Page {{ bookmark }}</p>
          <p class="juz-no text">{{getJuzNumberFromPage(bookmark)}} - {{ getJuzNamerFromPage(bookmark) }}</p>
        </div>
        <div class="sura-names">
          <p class="text" v-for="item in getSuraNames(bookmark)" :key="item.number">{{ item.number }} - {{ item.name }}</p>
        </div>
      </div>
      <img class="delete-bookmark" @click.stop="deleteBookmark(bookmark)" src="@/assets/icons/delete.svg" alt="delete bookmark">
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, ref } from 'vue';
import { useState } from '../store/state';
import { useRouter } from 'vue-router';

const state = useState()
const router = useRouter()
const emit = defineEmits(['closeSheet'])
const bookmarks = computed(() => state.bookmarks)

const getJuzNumberFromPage = (pageNumber) => {
  const page = state.quran.flatMap(item =>
    item.ayahs.filter(ayah => ayah.page === pageNumber)
  );
  return page[0]?.juz
}

const getSuraNames = (pageNumber) => {
  let suraNames = []
  for (const sura of state.quran) {
    if (sura.ayahs.find(a => a.page === pageNumber && a.numberInSurah === 1)) {
      suraNames.push({number: sura.number, name: sura.name.replace('سُورَةُ' , '').trim()})
    }
  }
  if (!suraNames.length) {
    for (const sura of state.quran) {
      if (sura.ayahs.find(a => a.page === pageNumber)) {
        suraNames.push({number: sura.number, name: sura.name.replace('سُورَةُ', '').trim()})
      }
    }
  }
  return suraNames
}

const getJuzNamerFromPage = (pageNumber) => {
  const juzDetails = (state.quranInfo.juzs.references.find(item => item.juz === getJuzNumberFromPage(pageNumber)))
  return juzDetails?.name
}

const gotoBookmark = (page) => {
  state.setCurrentPageNumber(page)
  emit('closeSheet')
  nextTick(() => router.push({name: 'nextPage', params: {pageNumber: state.currentPage}}))
}

const deleteBookmark = (page) => {
  state.deleteBookmark(page)
}
</script>
<style scoped>
.bookmerks {
  margin: 20px;
}
.bookmark {
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
.no-bookmarks {
  text-align: center;
  font-size: 20px;
  font-family: var(--english-fonts);
  color: #0e3131;
}
.bookmark-details {
  flex: 1;
  max-width: 80%;
}
.first-row {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.delete-bookmark {
  display: block;
  height: 30px;
}
.text {
  font-size: 20px;
  font-weight: 700;
  direction: rtl;
  text-align: right;
}
</style>