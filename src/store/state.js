import { defineStore } from 'pinia'
import QURAN from '@data/quran.json'
import QURAN_INFO from '@data/quranMeta.json'

export const useState = defineStore('state', {
  state: () => ({
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
    homeTiles: [
      {
        title: 'Resume',
        icon: '@assets/icons/book.png',
        route: 'NextPage',
      },
      {
        title: 'Goto Page No',
        icon: '@assets/icons/goto.png',
        route: 'NextPage',
      },
      {
        title: 'GoTo Surah',
        icon: '@assets/icons/goto.png',
        route: 'NextPage',
      },
      {
        title: 'GoTo Juz',
        icon: '@assets/icons/goto.png',
        route: 'NextPage',
      },
      {
        title: 'Bookmarks',
        icon: '@assets/icons/bookmark-white.png',
        route: 'BookmarksPage',
      },
      {
        title: 'Settings',
        icon: '@assets/icons/settings.png',
        route: 'SettingsPage',
      },
    ],
  }),
  // persist: {
  //   key: 'my-quran-web',
  // },
  actions: {
    setFontSize(value) { this.fontSize = value },
    setLetterSpacing(value) { this.letterSpacing = value },
    setTextColor(value) { this.textColor = value },
    setBackgroundColor(value) { this.backgroundColor = value },

    setCurrentPageNumber(value) { this.currentPage = value },

    initializeDefaults() {
      if (this.firstLoad) {
        this.quran = QURAN
        this.quranInfo = QURAN_INFO
        this.firstLoad = false
        this.lastPage = 604,
        this.firstPage = 1,
        this.currentPage = 1,
        this.currentPageText = null,
        this.currentPageSura = null,
        this.currentPageJuz = null,
        this.bookmarks = [],
        this.fontSize = 35,
        this.letterSpacing = 0,
        this.textColor = '#000',
        this.backgroundColor = '#fff',
        this.homeTiles = [
          {
            title: 'Resume',
            icon: 'book.png',
            route: 'NextPage',
          },
          {
            title: 'Goto Page No',
            icon: 'goto.png',
            route: 'NextPage',
          },
          {
            title: 'GoTo Surah',
            icon: 'goto.png',
            route: 'NextPage',
          },
          {
            title: 'GoTo Juz',
            icon: 'goto.png',
            route: 'NextPage',
          },
          {
            title: 'Bookmarks',
            icon: 'bookmark-white.png',
            route: 'BookmarksPage',
          },
          {
            title: 'Settings',
            icon: 'settings.png',
            route: 'SettingsPage',
          },
        ]
      }
    },
  },
});