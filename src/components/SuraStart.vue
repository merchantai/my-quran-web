<template>
  <div class="new-sura">
    <p class="new-sura-english-name">{{ `${surahDetails?.number} - ${surahDetails?.englishName}` }}</p>
    <p class="new-sura-length">{{ surahDetails?.numberOfAyahs }}</p>
    <p class="new-sura-location">{{ surahDetails?.revelationType }}</p>
    <p class="new-sura-arabic-name">{{ `${surahDetails?.number} - ${surahDetails?.name}` }}</p>
  </div>
  <p class="start">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ</p>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useState } from '@store/state';

const props = defineProps({suraNumber: Number})
const state = useState()
const surahDetails = ref(null)

onMounted(() => {
  surahDetails.value = state.quranInfo.surahs.references.find(item => item.number === props.suraNumber)
})
</script>
<style scoped>
.new-sura {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: #ccc;
  padding: 8px 25px;
  font-weight: 700;
  font-family: var(--english-fonts);
  font-size: 14px;
  width: 100%;
}
.new-sura:before, .new-sura:after {
  content: '';
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: -60px;
  transform: rotate(45deg);
  background-color: #ccc;
  z-index: 1;
}
.new-sura:before {
  left: -25px;
}
.new-sura:after {
  right: -25px;
}
.start {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 16px;
  border: 5px solid #ccc;
}
.new-sura-arabic-name {
  direction: rtl;
}
</style>