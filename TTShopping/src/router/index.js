import Vue from 'vue'
import Router from 'vue-router'
// 全局引入提示
import { Message } from 'element-ui'
// 引入登录组件
const login = () => import('@/components/login.vue')
const Home = () => import('@/components/home.vue')
const Users = () => import('@/components/users.vue')
const Rights = () => import('@/components/rights.vue')
const Roles = () => import('@/components/roles.vue')
const Goods = () => import('@/components/goodsList.vue')
const GoodsAdd = () => import('@/components/goodsadd.vue')
const Params = () => import('@/components/params.vue')
const Categories = () => import('@/components/categories.vue')
const Orders = () => import('@/components/orders.vue')
const Reports = () => import('@/components/reports.vue')

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
        },
        {
          name: 'params',
          path: '/params',
          component: Params
        },
        {
          name: 'categories',
          path: '/categories',
          component: Categories
        },
        {
          name: 'orders',
          path: '/orders',
          component: Orders
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
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
