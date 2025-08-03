<template>
  <div class="settings">
    <p class="title">Settings</p>
    <div class="settings-container">
      <div class="perview-container">
        <p class="sub-title">Preview</p>
        <div class="preview" :style="containerStyles">
          <p class="text" :style="textStyles">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِیْمِ</p>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="slider-container">
            <label for="textSize">Text size: {{ textSize }}</label>
            <input type="range" id="textSize" min="10" max="50" v-model="textSize" @input="handleTextSizeChange" />
          </div>
        </div>
        <div class="item">
          <div class="slider-container">
            <label for="letterSpacing">Spacing: {{ letterSpacing }}</label>
            <input type="range" id="letterSpacing" min="0" max="10" v-model="letterSpacing" @input="handleLetterSpacingChange" />
          </div>
        </div>
        <div class="item">
          <div class="color-picker">
            <p>Text color</p>
            <div class="text-color-picker" :style="{backgroundColor: textColor}" @click.self="showTextColorPicker = true"></div>
            <ColorPickerPopup
              v-if="showTextColorPicker"
              v-model="showTextColorPicker"
              :initialColor="textColor"
              @colorSelected="onTextColorChange"
            />
          </div>
        </div>
        <div class="item">
          <div class="color-picker">
            <p>Background color</p>
            <div class="text-color-picker" :style="{backgroundColor: backgroundColor}" @click.self="showBackgroundColorPicker = true"></div>
            <ColorPickerPopup
              v-if="showBackgroundColorPicker"
              v-model="showBackgroundColorPicker"
              :initialColor="backgroundColor"
              @colorSelected="onBackgroundColorChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useState } from '../store/state';
import ColorPickerPopup from '../components/ColorPickerPopup.vue';

const state = useState()
const textStyles = computed(() => {
  return {
    color: state.textColor,
    fontSize: `${state.fontSize}px`,
    letterSpacing: `${state.letterSpacing}px`
  }
})
const containerStyles = computed(() => {
  return {
    background: state.backgroundColor
  }
})
const textSize = ref(state.fontSize)
const letterSpacing = ref(state.letterSpacing)

const handleTextSizeChange = () => {
  state.setFontSize(textSize.value)
}
const handleLetterSpacingChange = () => {
  state.setLetterSpacing(letterSpacing.value)
}
const showTextColorPicker = ref(false)
const textColor = ref(state.textColor)

const onTextColorChange = (val) => {
  state.setTextColor(val)
  textColor.value = val
}
const showBackgroundColorPicker = ref(false)
const backgroundColor = ref(state.backgroundColor)

const onBackgroundColorChange = (val) => {
  state.setBackgroundColor(val)
  backgroundColor.value = val
}
</script>

<style scoped>
.title {
  margin: 0;
  padding: 10px 20px;
  font-size: 20px;
  font-family: var(--english-fonts);
  background-color: #0e3131;
  color: #fff;
  font-weight: 700;
}
.sub-title {
  font-family: var(--english-fonts);
  font-size: 20px;
  color: #333;
  margin: 10px 20px;
}
.settings-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
}
.list {
  flex: 1;
  overflow-y: auto;
}
.preview {
  margin: 0 20px;
  padding: 20px;
  height: 220px;
  border: 1px solid #eee;
  place-content: center;
  border-radius: 4px;
}
.text {
  font-family: var(--arabic-indo-pak-font);
  text-align: center;
  direction: rtl;
}
.item {
  width: 90%;
  margin: 10px auto;
  border: 1px solid #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.slider-container {
  width: 80%;
  margin: 20px;
  font-size: 20px;
  font-family: var(--english-fonts);
}
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: #ddd;
  border-radius: 5px;
  outline: none;
  margin-top: 20px;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  background: #0e3131;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
input[type="range"]::-moz-range-thumb {
  height: 20px;
  width: 20px;
  background: #0e3131;
  border-radius: 50%;
  cursor: pointer;
}
.text-color-picker {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
}
.color-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  font-size: 20px;
  font-family: var(--english-fonts);
}
</style>