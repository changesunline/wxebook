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
        initEpub () {
          const url = 'http://192.168.1.101:8889/epub/' +
            this.fileName + '.epub'
          this.book = new Epub(url)
          this.rendition = this.book.renderTo('read', {
            width: innerWidth,
            height: innerHeight,
            method: 'default'
          })
          this.rendition.display()
        }
      },
      mounted () {
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
