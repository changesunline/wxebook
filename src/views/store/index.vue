<template>
  <div class="store">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'store',
  data () {
    return {}
  },
  components: {
    
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/global.scss';
.store {
  widows: 100%;
  height: 100%;
}
</style>
