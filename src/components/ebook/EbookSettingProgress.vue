<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper">
            <span class="icon-back" @click="prevSection()"></span>
          </div>
          <input
            class="progress"
            type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value="progress"
            :disabled="!bookAvailable"
            ref="progress"
          />
          <div class="progress-icon-wrapper">
            <span class="icon-forward" @click="nextSection()"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { ebookmixin } from '../../util/mixin'
import { getReadTime } from '../../util/localStorage'
import { setInterval } from 'timers';
export default {
  name: 'EbookSettingProgress',
  mixins: [ebookmixin],
  computed: {
    getSectionName () {
      if (this.section) {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href) {
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    getReadTimeText () {
      // console.log(this.$t('book.haveRead'))
      let readTimeByMinutes = this.getReadTimeByMinutes()
      setInterval(() => {
         readTimeByMinutes = this.getReadTimeByMinutes()
      }, 1000*30)
      let readTimeText = this.$t('book.haveRead').replace('$1', readTimeByMinutes)
      return readTimeText
    },
    getReadTimeByMinutes () {
      let readTime = getReadTime(this.fileName)
      let readTimeByMinutes
      if (readTime) {
        readTimeByMinutes = readTime / 60
        return readTimeByMinutes
      } else {
        readTimeByMinutes = 0
      }
    },
    prevSection () {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection () {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    displaySection () {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.currentBook.rendition.display(sectionInfo.href).then(() => {
          this.refreshLocation()
        })
      }
    },
    onProgressChange (progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    onProgressInput (progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBg()
      })
    },
    updateProgressBg () {
      // this.$refs.progress.style.backgroundSize = `${this.progress}% 100%` // 无效
      this.$refs.progress.style.cssText = `background-size: ${this.progress}% 100% !important;`
    },
    displayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.currentBook.rendition.display(cfi)
      // this.refreshLocation()
    }
  },
  updated () {
    this.updateProgressBg()
    // this.getReadTimeText()
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 101;
  width: 100%;
  height: px2rem(90);
  background: white;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .read-time-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    font-size: px2rem(12);
    width: 100%;
    @include center;
    height: px2rem(40);
  }
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress-icon-wrapper {
        font-size: px2rem(20);
      }
      .progress {
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        // background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd;
        // background-size: 0 100% !important;
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: white;
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(10);
      width: 100%;
      color: #333;
      font-size: px2rem(12);
      // text-align: center;
      padding: 0 px2rem(30);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        @include ellipsis;
      }
    }
  }
}
</style>
