<template>
  <div class="home-page">
    <h1 class="home-title">My Quran</h1>
    <h2 class="home-tasmiah">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ</h2>
    <div class="cards-container" @click="goToRoute()">
      <div class="card" v-for="item in menuItems" :key="item.title">
        <img class="icon" :src="getIcon(item.icon)" :alt="item.title">
        <p class="title">{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useState } from '@store/state'
import { useRouter } from 'vue-router'

const state = useState();
const router = useRouter();
const menuItems = state.homeTiles;

const icons = import.meta.glob('@/assets/icons/*.png', {
  eager: true,
  import: 'default',
})

const getIcon = (filename) => icons[`/src/assets/icons/${filename}`] || ''
const goToRoute = () => router.push({name: 'nextPage', params: {pageNumber: state.currentPage}})

</script>
<style scoped>
.home-page {
  background: linear-gradient(#fff, #0e3131);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
.home-title {
  font-family: var(--english-fonts);
  text-align: center;
  color: #0e3131;
}
.home-tasmiah {
  font-family: var(--arabic-indo-pak-font);
  text-align: center;
  direction: rtl;
  font-size: 34px;
  color: #0e3131;
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
</style>