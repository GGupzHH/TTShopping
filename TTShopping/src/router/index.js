import Vue from 'vue'
import Router from 'vue-router'
// 引入登录组件
import login from '@/components/login.vue'
import Home from '@/components/home.vue'
Vue.use(Router)

// 配置路由对象  并且将new放回的对象导出   然后在main.js中使用，在vue选项中使用
export default new Router({
  routes: [
  // 配置登录路由
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
