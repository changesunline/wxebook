<template>
  <div class="search-bar">
    <div class="search-bar-title-wrapper">
      <div class="title-icon-back-wrapper">
        <span class="icon-back icon"></span>
      </div>
      <div class="title-text-wrapper">
        <span class="title-text title">{{$t('home.title')}}</span>
      </div>
      <div class="title-icon-shake-wrapper">
        <span class="icon-shake icon"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { ebookmixin } from '@/util/mixin'
export default {
  name: 'SearchBar',
  mixins: [ebookmixin],
  data () {
    return {}
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.search-bar {
  width: 100%;
  height: 100%;
}
</style>
