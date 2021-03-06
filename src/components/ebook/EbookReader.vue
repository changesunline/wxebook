<template>
  <div class="ebook-reader">
    <div class="reader-wrapper" @click="toggleTitleAndMenu">
      <div id="read"></div>
    </div>
  </div>
</template>

<script>
import { ebookmixin } from '../../util/mixin'
import Epub from 'epubjs'
import { Promise } from 'q'
import {
  getFontFamily,
  saveFontFamily,
  getFontSize,
  saveFontSize,
  getTheme,
  getLocation
} from '../../util/localStorage'

global.epub = Epub
export default {
  name: 'EbookReader',
  mixins: [ebookmixin],
  methods: {
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },

    toggleTitleAndMenu () {
      // this.$store.dispatch('setMenuVisible', !this.menuVisible)
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },
    // 初始化字体样式
    initFontFamily () {
      let fontFamily = getFontFamily(this.fileName)
      if (!fontFamily) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.currentBook.rendition.themes.font(fontFamily)
        this.setDefaultFontFamily(fontFamily)
      }
    },
    // 初始化字体大小
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.currentBook.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        this.setDefaultTheme(defaultTheme)
      } else {
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style)
        })
        this.setDefaultTheme(defaultTheme)
        this.rendition.themes.select(defaultTheme)
      }
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      // 渲染epub，对localStorage里的缓存字体信息渲染
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initFontFamily()
        this.initFontSize()
        this.initTheme()
        this.initGlobalStyle()
      })
      // 加载主题样式
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => { })
      })
    },
    initGesture () {
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offSetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (offSetX < -40 && time <= 500) {
          this.nextPage()
        } else if (offSetX > 40 && time <= 500) {
          this.prevPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()
      })
    },
    initEpub () {
      const url = `${process.env.VUE_APP_RES_URL}/epub/` +
        this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) *
          (getFontSize(this.fileName) / 16))
      }).then((locations) => {
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    },
    parseBook () {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        // this.setNavigation(nav)
        console.log(nav)
      })
    }
  },
  mounted () {
    // console.log(this.$route.params.fileName)
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(
      () => {
        this.initEpub()
      }
    )
  }
}
</script>

<style lang="scss" scoped>
</style>
