<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <transition name="slide-right">
        <div class="content" v-show="settingVisible === 3">
          <div class="content-page-wrapper">
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookMark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item" @click="selectTab(1)" :class="{'selected': currentTab === 1}">{{$t('book.navigation')}}</div>
              <div class="content-page-tab-item" @click="selectTab(2)" :class="{'selected': currentTab === 2}">{{$t('book.bookmark')}}</div>
            </div>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu"></div>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
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
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        flex: 0 0 px2rem(48);
        height: px2rem(48);
        width: 100%;
        display: flex;
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          @include center;
        }
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
import EbookSlideContent from './EbookSlideContent'
export default {
  name: 'EbookSlide',
  mixins: [ebookmixin],
  data () {
    return {
      currentTab: 1,
      content: EbookSlideContent,
      bookMark: null
    }
  },
  methods: {
    hide () {
      console.log('aaaaaaa')
    },
    selectTab (e) {
      this.currentTab = e
    }
  },
  components: {
    EbookSlideContent
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
</style>
