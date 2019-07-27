<template>
  <div class="store-home">
    <search-bar></search-bar>
  </div>
</template>

<script type="text/ecmascript-6">
import SearchBar from '@/components/home/SearchBar'
export default {
  name: 'storeHome',
  data () {
    return {}
  },
  components: {
    SearchBar
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
</style>
