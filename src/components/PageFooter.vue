<template>
  <div class="page-footer" :style="styles">
    <p class="juz-number"> {{ juzName }} - {{ juz }}</p>
    <p class="page-number">{{ state.currentPage }}</p>
    <p class="manzil-number">منزل - {{ manzilNumber }}</p>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useState } from '@store/state';

const state = useState()
const styles = computed(() => { return {
  backgroundColor: state.backgroundColor,
  color: state.textColor
}})
const manzilNumber = computed(() => {
  const page = state.quran.flatMap(item =>
    item.ayahs.filter(ayah => ayah.page === state.currentPage)
  );
  return page[page.length - 1]?.manzil
})

const juz = computed(() => {
  const page = state.quran.flatMap(item =>
    item.ayahs.filter(ayah => ayah.page === state.currentPage)
  );
  return page[0]?.juz
})

const juzName = computed(() => {
  const juzDetails = (state.quranInfo.juzs.references.find(item => item.juz === juz.value))
  return juzDetails?.name
})

</script>
<style scoped>
.page-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 3px;
}
</style>