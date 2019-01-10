<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// 导出 export default  导出一个对象   就像原来那样  也是一个对象  然后在根组件中使用
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-width: 1100px;
  height: 100%;
}
</style>
