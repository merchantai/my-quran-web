<template>
  <div class="page-select">
    <input type="number" class="number" v-model.number="pageNumber" @input="validatePageNumber" min="1" max="604" />
    <button class="go" @click="goToPage">Go</button>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useState } from '@store/state'

const state = useState()
const router = useRouter()
const pageNumber = ref('')
const emit = defineEmits(['closeSheet'])

const validatePageNumber = () => {
  if (pageNumber.value < 1) pageNumber.value = ''
  if (pageNumber.value > 604) pageNumber.value = 604
}

const goToPage = () => {
  if (pageNumber.value < 1) return
  emit('closeSheet')
  state.setCurrentPageNumber(Number(pageNumber.value))
  nextTick(() => router.push({name: 'nextPage', params: {pageNumber: state.currentPage}}))
}
</script>
<style scoped>
.page-select {
  padding: 10px;
}
.number {
  padding: 5px 10px;
  width: 50%;
  font-size: 30px;
  border: 2px solid #0e3131;
  color: #0e3131;
  border-radius: 8px;
}
.number:focus {
  outline: none;
}
.go {
  border: none;
  background-color: #0e3131;
  color: #fff;
  font-size: 30px;
  padding: 5px 20px;
  border: 2px solid #0e3131;
  margin-left: 10px;
  border-radius: 8px;
}
</style>