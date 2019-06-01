<template>
  <transition name="popup-slide-up">
    <div class="ebook-popup-list" v-show="fontFamilyVisible">
      <div class="ebook-popup-title">
        <div class="ebook-popup-title-icon" @click="hide">
          <span class="icon-down2"></span>
        </div>
        <span class="ebook-popup-title-text">{{$t('book.selectFont')}}</span>
      </div>
      <div class="ebook-popup-list-wrapper">
        <div class="ebook-popup-item" v-for="(item, index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
          <div class="ebook-popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
          <div class="ebook-popup-item-check" v-if="isSelected(item)">
            <span class="icon-check"></span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { ebookmixin } from '../../util/mixin'
import { FONT_FAMILY } from '../../util/book'
import { saveFontFamily } from '../../util/localStorage'
export default {
  name: 'EbookSettingFontPopup',
  mixins: [ebookmixin],
  data() {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  methods: {
    setFontFamily (font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (this.defaultFontFamily === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    },
    isSelected (item) {
      return this.defaultFontFamily === item.font
    },
    hide () {
      this.setFontFamilyVisible(false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.ebook-popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 300;
  background-color: #fff;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, .15);
  .ebook-popup-title {
    position: relative;
    padding: px2rem(15);
    box-sizing: border-box;
    border-bottom: px2rem(1) solid #b8b9bb;
    .ebook-popup-title-icon{
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      width: px2rem(30);
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .ebook-popup-title-text {
      @include center;
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .ebook-popup-list-wrapper {
    .ebook-popup-item {
      font-size: px2rem(14);
      box-sizing: border-box;
      padding: px2rem(15);
      display: flex;
      .ebook-popup-item-text {
        flex: 1;
        &.selected {
          color: #346bc9;
          font-weight: bold;
        }
      }
      .ebook-popup-item-check {
        flex: 1;
        text-align: right;
        color: #346bc9;
        font-weight: bold;
      }
    }
  }
}
</style>
