<template>
  <page :style="styles"/>
</template>

<script setup>
import Page from '@components/Page.vue'
import { useState } from '../store/state';
import { computed } from 'vue';

const props = defineProps({ pageNumber: [Number, String]})
const state = useState()
const styles = computed(() => { return {
  backgroundColor: state.backgroundColor
}})
</script>