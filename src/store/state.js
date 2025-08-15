import { defineStore } from 'pinia'
import QURAN from '@data/quran.json'
import QURAN_INFO from '@data/quranMeta.json'
import homeTiles from './homeTiles'

const getState = () => {
  return {
    firstLoad: true,
    quran: QURAN,
    quranInfo: QURAN_INFO,
    lastPage: 610,
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

// لهم ارحمنى بالقرآن واجعله لى إماما ونورا وهدى ورحمة.. اللهم ذكرنى منه ما نسيت وعلمنى منه ما جهلت وارزقنى تلاوته آناء الليل وأطراف النهار واجعله لى حجة يا رب العالمين.. اللهم أصلح لى دينى الذي هو عصمة أمري، وأصلح لى دنياى التي فيها معاشي، وأصلح لى آخرتى التي فيها معادي، وأجعل الحياة زيادة لى في كل خير وأجعل الموت راحة لى من كل شر.. اللهم أجعل خير عمرى آخره وخير عملى خواتمه وخير أيامى يوم ألقاك فيه.. اللهم إنى أسألك عيشة هنية وميتة سوية ومردا غير مخز ولا فاضح.. اللهم إنى أسألك خير المسألة وخير الدعاء وخير النجاح وخير العلم وخير العمل وخير الثواب وخير الحياة وخير الممات وثبتنى وثقل موازينى وحقق إيمانى وارفع درجتى وتقبل صلاتى واغفر خطيئتى وأسألك العلا من الجنة.. اللهم إنى أسألك موجبات رحمتك وعزائم مغفرتك والسلامة من كل إثم والغنيمة من كل بر والفوز بالجنة والنجاة من النار.. اللهم أحسن عاقبتنا في الأمور كلها، وأجرنا من خزى الدنيا وعذاب الآخرة.. اللهم اقسم لنا من خشيتك ما تحول به بيننا وبين معصيتك ومن طاعتك ما تبلغنا بها جنتك ومن اليقين ما تهون به علينا مصائب الدنيا ومتعنا بأسماعنا وأبصارنا وقوتنا ما أحييتنا واجعله الوارث منا واجعل ثأرنا على من ظلمنا وانصرنا على من عادانا ولا تجعل مصيبتنا في ديننا ولا تجعل الدنيا أكبر همنا ولا مبلغ علمنا ولا تسلط علينا من لا يرحمنا.. اللهم لا تدع لنا ذنبا إلا غفرته ولا هما إلا فرجته ولا دينا إلا قضيته ولا حاجة من حوائج الدنيا والآخرة إلا قضيتها يا أرحم الراحمين.. ربنا آتنا في الدنيا حسنة وفى الآخرة حسنة وقنا عذاب النار وصلى الله على سيدنا ونبينا محمد وعلى آله وأصحابه الأخيار وسلم تسليما كثيرا».