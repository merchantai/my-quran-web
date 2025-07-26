<template>
  <div class="page-header" :style="styles">
    <div class="sura-names">
      <p v-for="item in suraNames" :key="item.number">{{ item.number }} - {{ item.name }}</p>
    </div>
    <p class="page-number"> {{ state.currentPage }}</p>
    <p class="juz-number">Juz - {{ juzNumber }}</p>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useState } from '@store/state'

const props = defineProps({juzStart: Boolean})
const state = useState()
const suraNames = ref([])
const pageNumber = state.currentPage

const juzNumber = computed(() => {
  const page = state.quran.flatMap(item =>
    item.ayahs.filter(ayah => ayah.page === state.currentPage)
  );
  return page[0]?.juz
})

const styles = computed(() => {
  return props.juzStart ? { backgroundColor: state.textColor, color: state.backgroundColor } :
  { background: state.backgroundColor, color: state.textColor }
})

onMounted(() => {
  getSuraNames()
})

const getSuraNames = () => {
  for (const sura of state.quran) {
    if (sura.ayahs.find(a => a.page === pageNumber && a.numberInSurah === 1)) {
      suraNames.value.push({number: sura.number, name: sura.name.replace('سُورَةُ' , '').trim()})
    }
  }
  if (!suraNames.value.length) {
    for (const sura of state.quran) {
      if (sura.ayahs.find(a => a.page === pageNumber)) {
        suraNames.value.push({number: sura.number, name: sura.name.replace('سُورَةُ', '').trim()})
      }
    }
  }
}

</script>
<style scoped>
.page-header {
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