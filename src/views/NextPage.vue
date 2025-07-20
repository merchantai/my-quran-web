<template>
  <page />
</template>

<script setup>
import Page from '@components/Page.vue'

const props = defineProps({ pageNumber: [Number, String]})
</script>