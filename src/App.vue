<template>
  <div id="app">
    <router-view name="blank"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style lang="less">
  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
  }

</style>
