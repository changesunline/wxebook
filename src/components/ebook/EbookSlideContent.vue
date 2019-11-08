<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
          class="slide-contents-search-input"
          type="text"
          :placeholder="$t('book.searchHint')"
          @click="hideOrShowSearchPage"
        />
      </div>
      <div
        class="slide-contents-search-cancel"
        v-cloak
        v-show="searchVisible"
        @click="hideOrShowSearchPage"
      >{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper">
      <div class="slide-contents-book-img-wrapper">
        <img class="slide-contents-book-img" :src="cover" alt />
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title" v-if="metadata">{{metadata.title}}</div>
        <div class="slide-contents-book-author" v-if="metadata">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <div class="progress-text">{{$t('book.haveRead2')}}</div>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ebookmixin } from '../../util/mixin'
export default {
  name: 'EbookSlideContents',
  data () {
    return {
      searchVisible: false
    }
  },
  mixins: [ebookmixin],
  methods: {
    hideOrShowSearchPage () {
      this.searchVisible = !this.searchVisible
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.ebook-slide-contents {
  width: 100%;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    box-sizing: border-box;
    padding: 0 px2rem(15);
    .slide-contents-search-input-wrapper {
      flex: 1;
      border-radius: px2rem(3);
      border: 1px solid #fff;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        outline: none;
        border: none;
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      box-sizing: border-box;
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      @include columnLeft;
      .slide-contents-book-title {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: 0 px2rem(10);
        box-sizing: border-box;
        // overflow: hidden;
        width: px2rem(153.75);
        @include left;
        @include ellipsis2(2);
      }
      .slide-contents-book-author {
        width: px2rem(153.75);
        font-size: px2rem(12);
        line-height: px2rem(14);
        padding: 0 px2rem(10);
        box-sizing: border-box;
        margin-top: px2rem(5);
        @include ellipsis2(1);
        @include left;
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(90);
      @include columnLeft;
      .slide-contents-book-progress {
        display: flex;
        .progress {
          font-size: px2rem(14);
          line-height: px2rem(16);
        }
        .progress-text {
          font-size: px2rem(12);
          line-height: px2rem(14);
          margin-left: px2rem(2);
        }
      }
      .slide-contents-book-time {
        font-size: px2rem(12);
        line-height: px2rem(14);
        margin-top: px2rem(5);
      }
    }
  }
}
</style>
