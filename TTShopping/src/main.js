/* The Vue build version to load with the `import` command */
// mian导包   在main中导入的  后面可以直接使用
import Vue from 'vue'
// 导入App根组件
import App from './App'

import router from './router'
// 导入element库和样式文件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入首页css文件  @默认指向src目录下的文件
import '@/assets/index.css'
// 导入封装好的
import Http from './plugins/http'

// 使用导入的方法
Vue.use(Http)
Vue.use(ElementUI)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 引入根组件
  components: { App },
  template: '<App/>'
})
