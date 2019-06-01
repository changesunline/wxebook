<template>
  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow':!menuVisible || settingVisible >= 0}" v-show="menuVisible">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showAndHideSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showAndHideSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showAndHideSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-a" @click="showAndHideSetting(0)">A</span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import { ebookmixin } from '../../util/mixin'
export default {
  name: 'EbookMenu',
  data() {
    return {
    }
  },
  mixins: [ebookmixin],
  methods: {
    showAndHideSetting (key) {
      if (this.settingVisible >= 0) {
        this.setSettingVisible(-1)
      } else {
        this.setSettingVisible(key)
      }
    }
  },
  components: {
    EbookSettingFont,
    EbookSettingFontPopup
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }
}
</style>
