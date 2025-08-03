<template>
  <div class="popup-overlay" @click.self="close">
    <div class="popup">
      <h3 class="title">Select a Color</h3>
      <ColorPicker class="picker" v-model="tempColor" format="hex" @changeColor="updateColor" />
      <div class="actions">
        <button @click="emitColor">Select</button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ColorPicker from '@caohenghu/vue-colorpicker'

const props = defineProps({
  modelValue: { type: Boolean, required: true },         // popup visibility
  initialColor: { type: String, default: '#ff0000' }     // initial color
})
const emit = defineEmits(['update:modelValue', 'colorSelected'])

const tempColor = ref(props.initialColor)

const close = () => emit('update:modelValue', false)

const updateColor = (val) => {
  tempColor.value = val.hex }

const emitColor = () => {
  emit('colorSelected', tempColor.value)
  close()
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.title {
  font-family: var(--english-fonts);
  font-size: 20px;
  margin-bottom: 20px;
  color: #0e3131;
}
.picker {
  margin: 0 auto;
  width: 90%;
  overflow: hidden;
}
.popup {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 300px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 10px;
}
.actions button {
  font-family: var(--english-fonts);
  border: none;
  background-color: #0e3131;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
}
</style>