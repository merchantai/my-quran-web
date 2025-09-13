<template>
  <div class="sura-start">
    <div class="new-sura">
      <p class="new-sura-english-name">{{ `${surahDetails?.number} - ${surahDetails?.englishName}` }}</p>
      <p class="new-sura-length">{{ surahDetails?.numberOfAyahs }}</p>
      <p class="new-sura-location">{{ surahDetails?.revelationType }}</p>
      <p class="new-sura-arabic-name">{{ `${surahDetails?.number} - ${surahDetails?.name}` }}</p>
    </div>
    <p v-if="suraNumber !== 9" class="start" :style="styles">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ</p>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import { useState } from '@store/state';

const props = defineProps({suraNumber: Number})
const state = useState()
const surahDetails = ref(null)
const styles = computed(() => { return { backgroundColor: state.backgroundColor, color: state.textColor }})

onMounted(() => {
  surahDetails.value = state.quranInfo.surahs.references.find(item => item.number === props.suraNumber)
})
</script>
<style scoped>
.sura-start {
  margin: 4px 0 8px 0;
}
.new-sura {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ccc;
  padding: 8px 25px;
  font-weight: 700;
  font-family: var(--english-fonts);
  font-size: 14px;
  width: 100%;
}
.start:before, .start:after {
  content: '';
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  transform: rotate(45deg);
  background-color: #ccc;
  z-index: 1;
}
.start:before {
  left: -20px;
}
.start:after {
  right: -20px;
}
.start {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 16px;
  border: 5px solid #ccc;
  position: relative;
  font-family: var(--arabic-indo-pak-font);
}
.new-sura-arabic-name {
  direction: rtl;
}
</style>