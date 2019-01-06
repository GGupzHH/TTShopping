import Vue from 'vue'
import Router from 'vue-router'
// 引入登录组件
import login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import Goods from '@/components/goodsList.vue'
import GoodsAdd from '@/components/goodsadd.vue'

// 全局引入提示
import { Message } from 'element-ui'
Vue.use(Router)

// 配置路由对象  并且将new放回的对象导出   然后在main.js中使用，在vue选项中使用
const router = new Router({
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
      component: Home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          name: 'goodsadd',
          path: '/goods/add',
          component: GoodsAdd
        }
      ]
    }
  ]
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        path: '/'
      })
      Message.success('请先登录！')
    } else {
      next()
    }
  }
})
export default router
