<template>
    <div class="ebook-reader">
      <div id="read"></div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Epub from 'epubjs'
  global.epub = Epub
    export default {
      name: "EbookReader",
      computed: {
        ...mapGetters([
          'fileName'
        ])
      },
      methods: {
        prevPage () {
          if (this.rendition) {
            this.rendition.prev()
          }
        },
        nextPage () {
          if (this.rendition) {
            this.rendition.next()
          }
        },
        toggleMenu () {},
        initEpub () {
          const url = 'http://192.168.5.54:8090/epub/' +
            this.fileName + '.epub'
          this.book = new Epub(url)
          this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            method: 'default'
          })
          this.rendition.display()
          this.rendition.on('touchstart', event => {
            this.touchStartX = event.changedTouches[0].clientX
            this.touchStartTime = event.timeStamp
          })
          this.rendition.on('touchend', event => {
            const offSetX = event.changedTouches[0].clientX - this.touchStartX
            const time = event.timeStamp - this.touchStartTime
            console.log(offSetX)
            console.log(time)
            if (offSetX < -40 && time <= 500) {
              this.prevPage()
            } else if (offSetX > 40 && time <= 500) {
              this.nextPage()
            } else {
              this.toggleMenu()
            }
          })
        }
      },
      mounted () {
        // console.log(this.$route.params.fileName)
        this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/')).then(
          () => {
            this.initEpub()
          }
        )
      }
    }
</script>

<style lang="scss" scoped>
</style>
