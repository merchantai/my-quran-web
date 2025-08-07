<template>
  <div class="popup-overlay" @click.self="close">
    <div class="popup">
      <h3 class="title">Select a Color</h3>
      <ColorPicker
        v-model:pureColor="tempColor"
        format="hex"
        shape="square"
        useType="pure"
        :isWidget="true"
        class="picker"
      />
      <div class="actions">
        <button @click="emitColor">Select</button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import {ColorPicker} from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  initialColor: { type: String, default: '#ff0000' }
})
const emit = defineEmits(['update:modelValue', 'colorSelected'])

const tempColor = ref(props.initialColor)

// Update color if initialColor prop changes
watch(() => props.initialColor, (newColor) => {
  tempColor.value = newColor
})

const close = () => {
  emit('update:modelValue', false)
}

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
.popup {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}
.title {
  font-family: sans-serif;
  font-size: 20px;
  margin-bottom: 20px;
  color: #0e3131;
  text-align: center;
}
::v-deep(.vc-colorpicker) {
  margin: 0 auto;
}
.actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 10px;
}
.actions button {
  font-family: sans-serif;
  border: none;
  background-color: #0e3131;
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>