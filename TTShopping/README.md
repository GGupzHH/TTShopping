#TTshopping

## 项目介绍
>  TTshopping是一个后台管理系统，最高权限的管理员可以改变普通用户的登录状态和权限，也可以添加商品、添加商品信息，通过不同的分类来展示商品， 最高权限的管理员也可以查看订单列表， 删除和修改 最后就是数据报表。
## 技术栈
>  vue + element-ui + vue-router + axios
>  树形表格展示插件 element-tree-grid
>  富文本编辑器 vue-quill-editor
>  时间转换插件 moment
>  数据可视化插件 echarts
## 项目功能展示
1. 登录
2. 首页
   1. 用户管理
      1. 用户列表
   2. 权限管理
      1. 角色列表
      2. 权限列表
   3. 商品管理
      1. 商品列表
      2. 分类参数
      3. 商品分类
   4. 订单管理
      1. 订单列表
   5. 数据统计
      1. 数据报表
## 项目过程
### 1. 使用vue-cli2构建项目目录
1 使用npm install 配置相关的包


### 2. 使用vue-router配置路由
1 使用路由嵌套 配置子组件路由


### 3. 使用element-UI完成子组件的开发
1 使用element中的卡片，表格，layout布局等一些组件完成页面搭建
2 使用element第三方插件 element-tree-grid 实现树形表格的构建


### 4. axios处理请求，获取数据
1 使用axios.baseURL设置固定请求地址
2 使用axios.interceptors.request.use设置请求拦截 在用户登录的情况下， 将用户保存在本地token放到请求头一起发送给后台
3 使用push实现编程式导航 实现渲染不同的组件
5 使用promise获取异步请求的数据
6 使用async获取异步请求的数据
7 使用结构赋值结构返回的对象
8 利用Vue数据驱动视图的原理将数据渲染到页面中

### 5. 使用echarts实现数据可视化


## 项目优化

### 优化一
##### 在数据没有获取到之前 使用element中的Loading 加载


### 优化二
##### 在axios中设置响应拦截统一处理响应提示


### 优化三
##### 使用路由懒加载，按需加载， 处理SPA页面首页加载慢的问题
>  使用之前
```js
  import login from '@/components/login.vue'
```
>  使用之后
```js
  const login = () => import('@/components/login.vue')
```

### 优化四
##### 使用webpack打包 会出现一个dist文件夹 文件夹里面是打包好的代码
##### 问题：所有的第三方插件都被打包到了vendor文件中 文件还是太大
>  解决 使用cdn加载方式

### 优化五
##### 改变加载方式 使用cdn加载
1 在build文件夹下的webpack.base.conf.js 配置文件中添加cdn加载方式
```js
// key   指得是cdn加载的包名  在package中的包名
// value 指的是当前第三方资源暴露给全局的变量
externals: {
  "vue": "Vue",
  "element-ui": "ELEMENT",
  "axios": "axios",
  "vue-router": "VueRouter",
  "moment": "moment",
  "echarts": "echarts"
},
```
2 vlaue的值要和main.js中引入的对象名相同
>  例：
```js
import ELEMENT from 'element-ui'
```
3 在首页中引入index.html中引入cdn链接地址
```html
<script src="https://cdn.bootcss.com/vue/2.5.21/vue.min.js"></script>
<script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/moment.js/2.23.0/moment.min.js"></script>
<script src="https://cdn.bootcss.com/echarts/4.2.0-rc.1/echarts.min.js"></script>
```
> 注意： css引入不需要在webpack.base.conf.js中配置 直接在index.html中引入即可


## 遇到的问题

##### 问题一： 在组件中操作DOM的时候， 获取DOM的值时， 会获取到DOM改变之前的内容
##### 解决方法： 使用Vue自带的方法 $nextTick 就可以获实时获取DOM元素内容

##### 问题二： 打包之后页面排版出现问题
##### 解决方法： 在每个组件的style标签中 加上scoped
##### 作用： 使每个组件的样式都只在当前组件产生作用

# 项目完成 如果有不正确的见解或地方请多指教


