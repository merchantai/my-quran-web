<template>
  <div class="home-page">
    <img src="@/assets/icons/title-text.svg" alt="quran text" class="quran-image">
    <h2 class="home-tasmiah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ</h2>
    <div class="cards-container">
      <div class="card" v-for="item in menuItems" :key="item.title" @click="goToRoute(item.title)">
        <img class="icon" :src="getIcon(item.icon)" :alt="item.title">
        <p class="title">{{item.title}}</p>
      </div>
    </div>
    <bottom-sheet :showSheet="showSheet" :onClose="closeSheet" :useDragEffect="true" :max-height="80">
      <template #header>
        <p class="bottom-sheet-title">{{ bottomSheetTitle }}</p>
      </template>
      <component class="component" @closeSheet="closeSheet" :is="selectedComponent" />
    </bottom-sheet>
  </div>
</template>
<script setup>
import { useState } from '@store/state'
import { useRouter } from 'vue-router'
import { BottomSheet } from '@nosadev/vue-bottom-sheet'
import { shallowRef, ref } from 'vue'
import PageSelect from '@components/PageSelect.vue'
import SuraSelect from '@components/SuraSelect.vue'
import JuzSelect from '@components/JuzSelect.vue'
import Bookmarks from '@components/Bookmarks.vue'

const state = useState();
const router = useRouter();
const menuItems = state.homeTiles
const selectedComponent = shallowRef(null)
const showSheet = ref(false)
const bottomSheetTitle = ref('')

const icons = import.meta.glob('@/assets/icons/*.png', {
  eager: true,
  import: 'default',
})

const closeSheet = () => {
  showSheet.value = false
}

const getIcon = (filename) => icons[`/src/assets/icons/${filename}`] || ''
const goToRoute = (title) => {
  switch(title) {
    case 'Resume':
      router.push({name: 'nextPage', params: {pageNumber: state.currentPage}})
      break
    case 'Goto Page No':
      bottomSheetTitle.value = 'Select page number'
      selectedComponent.value = PageSelect
      showSheet.value = true
      break
    case 'GoTo Surah':
      selectedComponent.value = SuraSelect
      bottomSheetTitle.value = 'Select Surah'
      showSheet.value = true
      break
    case 'GoTo Juz':
      selectedComponent.value = JuzSelect
      bottomSheetTitle.value = 'Select Juz'
      showSheet.value = true
      break
    case 'Bookmarks':
      selectedComponent.value = Bookmarks
      bottomSheetTitle.value = 'Bookmarks'
      showSheet.value = true
      break
    case 'Settings':
      router.push({name: 'SettingsPage'})
      break
  }
}

</script>
<style scoped>
.home-page {
  background: linear-gradient(#fff, #0e3131);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  overflow-y: auto;
}
.quran-image {
  width: 150px;
  display: block;
  margin: 20px auto;
}
.home-title {
  font-family: var(--english-fonts);
  text-align: center;
  color: #0e3131;
  margin-top: 40px;
}
.home-tasmiah {
  font-family: var(--arabic-indo-pak-font);
  text-align: center;
  direction: rtl;
  font-size: 34px;
  color: #0e3131;
  margin-bottom: 10px;
}
.cards-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  place-items: center;
  width: 80vw;
  margin: 0 auto;
}
.card {
  background-color: #0e3131;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  width: 150px;
  height: 150px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 16px;
}
.icon {
  height: 50px;
}
.title {
  font-family: var(--english-fonts);
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}
.bottom-sheet-title {
  font-family: var(--english-fonts);
  color: #0e3131;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
}
.component {
  margin: 0 20px;
  margin-bottom: 50px;
}
</style>