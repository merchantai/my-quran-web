import { defineStore } from 'pinia'
import QURAN from '@data/quran.json'
import QURAN_INFO from '@data/quranMeta.json'
import homeTiles from './homeTiles'

const getState = () => {
  return {
    firstLoad: true,
    quran: QURAN,
    quranInfo: QURAN_INFO,
    lastPage: 604,
    firstPage: 1,
    currentPage: 1,
    currentPageText: null,
    currentPageSura: null,
    currentPageJuz: null,
    bookmarks: [],
    fontSize: 35,
    letterSpacing: 0,
    textColor: '#000',
    backgroundColor: '#fff',
    homeTiles: homeTiles,
}}

export const useState = defineStore('state', {
  state: () => getState(),
  // persist: {
  //   key: 'my-quran-web',
  // },
  actions: {
    setFontSize(value) { this.fontSize = value },
    setLetterSpacing(value) { this.letterSpacing = value },
    setTextColor(value) { this.textColor = value },
    setBackgroundColor(value) { this.backgroundColor = value },
    addBookmark(page) { this.bookmarks.push(page).sort() },
    deleteBookmark(page) { this.bookmarks = this.bookmarks.filter(item => item !== page).sort() },
    toggleBookmark(page) {
      const index = this.bookmarks.indexOf(page)
      if (index === -1) this.bookmarks.push(page)
      else this.bookmarks = this.bookmarks.filter(item => item !== page)
    this.bookmarks = this.bookmarks.sort()
    },

    setCurrentPageNumber(value) { this.currentPage = value },

    initializeDefaults() {
      if (this.firstLoad) getState()
    },
  },
});