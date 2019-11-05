<template>
  <transition name="fade-slide-right">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <div class="content">
        <div class="content-page-wrapper">
          <div class="content-page"></div>
          <div class="content-page-tab"></div>
        </div>
      </div>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 300;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      .content-page {
      }
      .content-page-tab {
      }
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>
<script type="text/ecmascript-6">
import { ebookmixin } from '../../util/mixin'
export default {
  name: 'EbookSlide',
  mixins: [ebookmixin],
  data () {
    return {}
  },
  methods: {
    hide() {
      console.log('aaaaaaa')
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
</style>
