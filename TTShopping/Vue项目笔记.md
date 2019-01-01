

# Vue 电商后台管理系统开发文档

## 项目准备

### 将 API Server 部署到本地

1. 创建一个名为 `itcast_mall` 的数据库
2. 将 `itcast.sql` 导入 `itcast_mall` 数据库中
3. 解压 `api-server.zip`
4. 将 `api-server/config/default.json` 文件中 `db_config` 修改为自己的配置信息
5. 打开终端，在 `api-server` 目录下执行 `node app.js`

### API 接口文档

>  课程包/接口文档/docs/**index.html** 或者 接口文档/**README.md**

### Postman 接口测试

> 用Postman测试几个接口



---



## 项目起步

### vue-cli初始化项目

**安装(如果安装过,则不用再次安装)：**

```shell
npm install -g vue-cli
```

**查看使用帮助：**

```shell
vue --help
```

```
C:\Users\xxx\Desktop>vue --help

  Usage: vue <command> [options]

  Options:

    -V, --version  output the version number
    -h, --help     output usage information

  Commands:

    init           generate a new project from a template
    list           list available official templates
    build          prototype a new project
    help [cmd]     display help for [cmd]
```

**基于 [webpack](https://github.com/vuejs-templates/webpack) 模板初始化项目：**

```shell
# 基于 webpack 模板初始化一个名称为 mallmanager 的项目
vue init webpack mallmanager
```

> 在安装时会遇到一些选项

![1534326963793](media\1534326963793.png)

启动开发模式：

```shell
cd mallmanager
npm run dev
```

在浏览器中打开 `http://localhost:8080/` 访问测试。



### 项目文件结构

![1534327041580](media\1534327041580.png)

```
.
├── build
├── config
├── node_modules
├── src
│   ├── assets
│   ├── common 存储一些公共的业务组件
│   ├── components
│   ├── router
│   ├── App.vue
│   └── main.js
├── static
│   └── .gitkeep
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── .postcssrc.js
└── README.md
```

```
build   webpack打包相关配置文件目录
config  webpack打包相关配置文件目录
docs  我们自己添加的文档目录
  开发文档.md  案例开发步骤文档
  接口文档.md  后台 API 接口文档
node_modules  第三方包
src  项目源码
  assets  存储资源，例如 css、img、fonts
  components  存储所有公共组件
  router  路由
    index.js  路由配置文件
  App.vue  单页面应用程序的根组件
  main.js  开机键，负责把根组件替换到根节点
static  可以放一些静态资源
  .gitkeep  没啥用，用来充当一个文件就可以提交我们的 static 目录，未来有了其它文件可以把它删掉
.babelrc  es6转es5配置文件，给 babel 编译器用的
.editorconfig  给编辑器看的
.eslintignore  给eslint代码风格校验工具使用的，用来配置忽略代码风格校验的文件或是目录
.eslintrc.js  给eslint代码风格校验工具使用的，用来配置代码风格校验规则
.gitignore  给git使用的，用来配置忽略上传的文件
.postcssrc.js  给postcss用的，postcss类似于 less、sass 预处理器
index.html  单页面应用程序的单页
package-lock.json  锁定第三方包的版本，以及保存包的下载地址
package.json  项目说明，用来保存依赖项等信息
REAMDE.md  项目说明文档
```

### 自动打开浏览器

> 运行npm run dev时自动打开浏览器 
>
> 修改package.json的script选项

`package.json`

```js
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --open"
```

### 代码风格

项目采用 [JavaScript Standard Style](https://standardjs.com/) 代码风格，以下是一些基本规范细则。

- **使用两个空格** – 进行缩进
- **字符串使用单引号** – 需要转义的地方除外
- **不再有冗余的变量** – 这是导致 _大量_ bug 的源头!
- **无分号** – [这](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)[没什么不好。](http://inimino.org/~inimino/blog/javascript_semicolons)[不骗你！](https://www.youtube.com/watch?v=gsfbh17Ax9I)
- 行首不要以 `(`, `[`, or ``` 开头
  - 这是省略分号时**唯一**会造成问题的地方 – _工具里已加了自动检测！_
  - [详情](https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md#semicolons)
- **关键字后加空格** `if (condition) { ... }`
- **函数名后加空格** `function name (arg) { ... }`
- 坚持使用全等 `===` 摒弃 `==` 一但在需要检查 `null || undefined` 时可以使用 `obj == null`。
- 一定要处理 Node.js 中错误回调传递进来的 `err` 参数。
- 使用浏览器全局变量时加上 `window` 前缀 – `document` 和 `navigator` 除外
  - 避免无意中使用到了这些命名看上去很普通的全局变量， `open`, `length`, `event` 还有 `name`。

说了那么多，看看[这个遵循了 Standard 规范的示例文件](https://github.com/expressjs/body-parser/blob/master/index.js) 中的代码吧。或者，这里还有[一大波使用了此规范的项目](https://raw.githubusercontent.com/standard/standard-packages/master/all.json) 代码可供参考。

> 在package.json的script中添加lintfixed选项
>
> 通过指令自动按照代码规范对代码进行修正

`package.json` 

```json
 "lint": "eslint --ext .js,.vue src",
 "lintfix": "eslint --ext .js,.vue src --fix",
```

`在终端中`

```shell
// 自动修正代码
npm run lintfix
```

> 修改完配置文件后, 要重新npm run dev

### Git 版本控制

**初始化本地仓库并完成一次提交**

```shell
git init
git status
git add .
git commit -m ":tada: Initial commit"
```

**在 GitHub 上创建一个在线仓库**

将本地项目推送到 GitHub。

```shell
git remote add origin https://github.com/你的GitHub用户名/admin-vue.git
git push -u origin master
```

**Git 工作流程 Workflow**

[阮一峰 - Git 工作流程](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html)

**拉出分支开始工作吧**

- 功能性分支
- dev-login
- 功能分支开发完成之后测试没问题了合并到 master 分支
- 之后就可以删除掉特性分支

```shell
git checkout -b dev-login
git checkout master
git branch -d dev-login
```

### 简化代码

> 将vue-cli生成的无用代码进行删除

### 导入 ElementUI

> 项目使用的是[element-ui](http://element-cn.eleme.io/#/zh-CN/component/quickstart)

安装依赖：

```shell
npm install element-ui
```

在 `src/main.js` 中加载使用：

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```

## 登录

### 配置路由

1. 新建views/login.vue
2. 配置路由
3. 测试组件

`views/login.vue`

```html
<template>
  <div>
    login
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

```

`routes/index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    path: '/',
    redirect: { name: 'login' }
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})

```

### 布局登录页面

> 在[element-ui](http://element-cn.eleme.io/#/zh-CN/component/form)中找类似的效果对应的代码进行修改

`element-ui`中的代码

```html
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="名称">
    <el-input v-model="formLabelAlign.name"></el-input>
  </el-form-item>
  <el-form-item label="活动区域">
    <el-input v-model="formLabelAlign.region"></el-input>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input v-model="formLabelAlign.type"></el-input>
  </el-form-item>
</el-form>
```

`views/login.vue`

```html
<template>
  <div>
    <el-form label-position="top" label-width="80px" :model="formData">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary">主要按钮</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  }
}
</script>

<style>
</style>

```

### 调整样式

接下来我们开始调整 `/login.vue`  组件样式：

- 注意：这里遵循一个原则，不要直接去使用 Element 组件自带的类名
- 如果你想为 Element 组件添加自定义样式，那么建议你给它加你自己的类名来控制

`/login.vue/template`

```html
<template>
  <div class="login-wrap">

    <el-form class="login-form" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button class="login-button" type="primary">登录</el-button>
    </el-form>
  </div>
</template>
```

`/login.vue/style`

```css
<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-wrap .login-form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-form .login-button {
  width: 100%;
}
</style>
```

`App.vue`

```css
<style>
#app{
  height: 100%;
}
</style>
```

`在assets中添加公共样式,然后在main.js中引入`

`assets/css/style.css`

```css
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}
```

`main.js`

```js
import '@/assets/css/style.css'
```

### 导入axios

> 接下来要实现登录功能
>
> 登录功能要用到ajax请求, 所以我们可以先安装axios然后配置
>
> 这里,我们将axios改成vue插件

1. 安装axios
2. 新建plugins/http.js
3. 导入axios
4. 配置baseUrl

`assets/http.js`

```js
import axios from 'axios'

const httpHelper = {}
// 配置Vue插件
httpHelper.install = function fn (Vue) {
  axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
  Vue.prototype.$http = axios
}

export default httpHelper

```

`main.js`

```js
import http from '@/plugins/http.js'
Vue.use(http)
```

### 登录功能

1. 绑定click事件
2. 发送登录请求
   1. 获取表单数据
   2. 如果登录成功,将token保存在session中并提示用户登录成功
   3. 如果登录失败,提示用户登录失败



`login.vue/template`

```html
<el-button @click="handleLogin" class="login-button" type="primary">登录</el-button>
```

`login.vue/script`

```js
<script>
export default {
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http.post('login', this.formData)
        .then((res) => {
          const data = res.data
          const {meta: {status, msg}} = data
          if (status === 200) {
            const token = data.data.token
            sessionStorage.setItem('token', token)
            this.$message.success(msg)
          } else {
            this.$message.error(msg)
          }
        })
    }
  }
}
</script>
```

### 使用async和await

> 将login.vue中的网络请求换一种方式去写
>
> 这里使用了async和await

`login.vue/script`

```js
methods: {
    async handleLogin () {
      const res = await this.$http.post('login', this.formData)
      const data = res.data
      const { meta: { status, msg } } = data
      if (status === 200) {
        const token = data.data.token
        sessionStorage.setItem('token', token)
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
  }
```

## Home

> 登录成功后, 会跳转到Home页,接下来我们开始写Home页

### 新建home组件

1. 新建home.vue
2. 参照[element-ui](http://element-cn.eleme.io/#/zh-CN/component/container)文档 找到布局容器
3. 配置路由 导入home组件

`home.vue`

```html
<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>

```

`route/index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})
```

### 样式调整

`home.vue/template`

```html
<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside  class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>
```

`home.vue/style`

```css
.container {
  height: 100%;
}

.header {
  background-color: #b3c0d1;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
```

### 头部组件

#### 页面结构:

>  这里我们使用的是 Element 组件库自带的 [Layout 布局](http://element.eleme.io/#/zh-CN/component/layout) 来完成 Header 组件基本结构。

```html
  <el-header class="header">
      <el-row>
       <el-row>
  	   <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
       <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
	</el-row>
      </el-row>
    </el-header>
```

`调整后`

```html
  <el-header class="header">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="/static/logo.png" alt="">
            </div>
          </el-col>
          <el-col :span="19" class="middle">
              <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="1">
              <a href="#"  class="loginout">退出</a>
          </el-col>
        </el-row>
    </el-header>
```

#### 样式调整

`home.vue/style`

```css
.header .middle{
    line-height: 60px;
    color: #fff;
    text-align: center;
  }
  .header .loginout{
    line-height: 60px;
    text-decoration: none;
  }
```

`style.css`

```css
html,
body,
h2 {
    height: 100%;
    margin: 0;
    padding: 0;
}
```

### 左侧导航菜单

> 这里我们使用element-ui的[NavMenu导航菜单](http://element-cn.eleme.io/#/zh-CN/component/menu)

`home.vue/template`

```html
 <el-aside class="aside" width="200px">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
</template>
        <el-menu-item-group>
<template slot="title">
   分组一
</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
<template slot="title">
   选项4
</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
```

> 修改后

```html
 <el-aside class="aside" width="200px">
        <!-- default-active:默认展开项
          :unique-opened: 只允许同时展开一项
          :router 开启路由模式
          开启后, 设置el-menu-item的index值 为路由标识
        -->
        <el-menu default-active="2-1" class="menu" :unique-opened="true" :router="true">
        <!-- 用户管理-->
          <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>用戶管理</span>
            </template>
          <el-menu-item index="/user">
              <i class="el-icon-location"></i>
            用戶列表
          </el-menu-item>
        </el-submenu>
        <!-- 权限管理-->
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-locat	ion"></i>
          <span>權限管理</span>
        </template>
                  <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
            角色列表
          </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-view"></i>
            權限列表
          </el-menu-item>
        </el-submenu>
        <!-- 商品管理-->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
                  <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
            商品列表
          </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-view"></i>
            分類參數
          </el-menu-item>
           <el-menu-item index="3-1">
              <i class="el-icon-view"></i>
            商品分類
          </el-menu-item>
        </el-submenu>
        <!--订单管理-->
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>訂單管理</span>
            </template>
          <el-menu-item index="4-1">
              <i class="el-icon-location"></i>
            訂單列表
          </el-menu-item>
        </el-submenu>
        <!--数据统计-->
          <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>數據統計</span>
            </template>
          <el-menu-item index="5-1">
              <i class="el-icon-location"></i>
            數據報表
          </el-menu-item>
        </el-submenu>

        </el-menu>
      </el-aside>
```

`home.vue/style`

```css
  .aside .menu{
    height: 100%;
  }
```

### 登录成功后跳转到home页

`login.vue/script`

```js
// 省略
if (status === 200) {
        const token = data.data.token
        sessionStorage.setItem('token', token)
        this.$router.push({name: 'home'})
        // this.$message.success(msg)
      } 
// 省略
```

### 判断用户是否登录

> 如果用户没登录 ,就无法进入到home页
>
> 所以, 要进行判断验证 token

`home.vue/script`

```js
export default {
  beforeCreate () {
    // 从session中获取token 判断是否有token
    const token = sessionStorage.getItem('token')
    if (!token) {
      // 返回登录页
      this.$router.push({name: 'login'})
      this.message.warning('请先登录')
    }
  }
}
</script>
```

> 注意,这里我们无法验证效果, 因为真正的验证是在服务端去处理的,
>
> 我们这里先把客户端的代码写完

### 用户退出

1. 找到退出的按钮,绑定click事件
2. 在退出的事件中
   1. 删除session中的token
   2. 跳转到登录页
   3. 提示用户退出成功

`home.vue/template`

```html
          <a href="#" class="loginout" @click.prevent="handleSignout">退出</a>
```

`home.vue/script`

```js
  methods: {
    handleSignout () {
      // 删除session中的token
      sessionStorage.clear()
      // 跳转到登录页
      this.$router.push({name: 'login'})
      // 提示
      this.$message.success('退出成功')
    }
  }
```

### 合并分支

```shell
// 查看所有分支 *开头的表示当前分支
git branch
// 切换到master
git checkout master
// 将dev-login分支合并到当前的master分支
git merge dev
// 将合并后的master推送到服务器
git push
// 创建新分支用于开发下一个功能
git checkout -b dev-users
```

##  用户列表

> 用户列表的视图在home组件中,我们先配置相应的路由

### 用户列表路由配置

`src/views/user/user.vue`

> 新建user.vue用户列表组件

```html
<template>
  <div>
    用户列表组件
  </div>
</template>
<script>
export default {
}
</script>
<style>
</style>
```

`home.vue/template`

```html
<el-main class="main">
        <!--视图容器 -->
        <router-view></router-view>
</el-main>
```

`route/index.js`

```js
// 省略
import User from '@/views/user/user'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'user',
      path: '/user',
      component: User
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})
```

### 用户列表页面元素

> 用户列表页面由[面包屑](http://element-cn.eleme.io/#/zh-CN/component/breadcrumb)、[搜索框](http://element-cn.eleme.io/#/zh-CN/component/input)、[表格](http://element-cn.eleme.io/#/zh-CN/component/table)、分页组件

`user.vue/template` 提供容器 用到[element-ui的卡片](http://element-cn.eleme.io/#/zh-CN/component/card)

```html
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input class="searchInput" clearable placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
       <el-table
      :data="tableData"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
      type="index"
      width="50">
    </el-table-column>

      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style>
.box-card{
  height: 100%;
}
.searchArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput{
  width: 350px;
}
</style>

```

### 用户列表数据渲染

> 将表格中的假数据进行替换,
>
> 通过网络请求获取数据,渲染到页面中

`user.vue`

```js
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input class="searchInput" clearable placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
       <el-table
      :data="list"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
      type="index"
      width="50">
    </el-table-column>

      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const res = await this.$http.get('users?pagenum=1&pagesize=10')
      // console.log(res)
      const data = res.data
      const { meta: { msg, status } } = data
      if (status === 200) {
        const {data: {users}} = data
        this.list = users
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.box-card{
  height: 100%;
}
.searchArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput{
  width: 350px;
}
</style>

```

> 注意: 此时 template中的数据还没进行替换 没使用list返回的数据
>
> 因为此时 网络请求失败,提示"无效的token"

### 验证token

>  API文档中,除了登录接口, 
>
> 其他的接口访问都是受保护的,必须提供登录成功交换到的token给服务器才可以
>
> 我们这里服务器要求必须在请求头中通过一个Authorization字段提供token令牌

`user.vue`

```html
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input class="searchInput" clearable placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
       <el-table
      :data="list"
      style="width: 100%">
      <!-- 序号 -->
      <el-table-column
      type="index"
      width="50">
    </el-table-column>

      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="300">
      </el-table-column>
       <el-table-column
        prop="mg_state"
        label="用户状态"
        width="300">
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const res = await this.$http.get('users', {
        headers: {
          Authorization: window.sessionStorage.getItem('token')
        },
        params: {
          pagenum: 1,
          pagesize: 10
        }
      })
      // console.log(res)

      const data = res.data
      const { meta: { msg, status } } = data
      if (status === 200) {
        const {data: {users}} = data
        this.list = users
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.box-card{
  height: 100%;
}
.searchArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput{
  width: 350px;
}
</style>

```

### 用户列表-用户操作

> [自定义列](http://element-cn.eleme.io/#/zh-CN/component/table)
>
> 添加一列、找到按钮、选择最小按钮、删掉多余代码

`user.vue/template`

```html
        <el-table-column
        label="操作" width="300">
       <template slot-scope="scope">
        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
      </template>

      </el-table-column>
```

### 用户列表-用户状态

> 使用element-ui中的[switch](http://element-cn.eleme.io/#/zh-CN/component/switch)

`user.vue/template`

```html
 <el-table-column
        label="用户状态"
        >
          <template slot-scope="scope">
            <!-- scope.row就是当前绑定的数据对象 -->
         <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
      </template>
      </el-table-column>
```

### 用户列表-处理日期

> 将数据中的日期格式化之后显示在视图中
>
> 使用moment 

```shell
npm i moment
```

`main.js`

```js
import moment from 'moment'
// 全局过滤器
// 格式化日期
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString)
})

```

`user.vue/template`

```html
  <el-table-column
        label="创建日期">
        <template slot-scope="scope">
            {{scope.row.create_time | fmtDate('YYYY-MM-DD')}}
        </template>
      </el-table-column>
```

### 加载动画

> 在用户列表加载时,使用[加载动画,](http://element-cn.eleme.io/#/zh-CN/component/loading)提高用户体验

`user.vue/template`

```html
<!--省略-->
<!-- 表格 -->
       <el-table
       v-loading="loading"
      :data="list"
<!--省略-->
```

`user.vue/script`

```js
data () {
    return {
      list: [],
      loading: true
    }
    
   
 async loadData () {
     
     // 发送请求之前
      this.loading = true
      const res = await this.$http.get('users', {
        headers: {
          Authorization: window.sessionStorage.getItem('token')
        },
        params: {
          pagenum: 1,
          pagesize: 10
        }
      })
      // console.log(res)
      // 发送请求之后
      this.loading = false
      const data = res.data
      
 // 省略
```

### 分页处理

- 分页逻辑分析
  - 分页所需数据
    - 请求数据前
      - currentPage	当前页码
      - pageSize        每页显示多少条数据
    - 请求数据后
      - total               总共多少条数据 

- 分页步骤
  - 页面搭建
  - 配置分页参数
  - 当页码改变后，重新请求该页码的数据
  - 当每页条数发生变化，重新请求数据
- 页面搭建  [pagination](http://element-cn.eleme.io/#/zh-CN/component/pagination)

```html
  <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
```

```js
methods: {
    handleSizeChange(val) {
      // size发生变化
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // 页码发生变化
      console.log(`当前页: ${val}`);
    }
}
```

**参数说明：**

| 属性/方法       | 说明                               |
| :-------------- | ---------------------------------- |
| @size-change    | 当每页多少条数据改变执行           |
| @current-change | 当前页码改变执行                   |
| :current-page   | 数据绑定，当前页码                 |
| :page-sizes     | 数据绑定，每页显示多少天数据，列表 |
| :page-size      | 数据绑定，当前每页多少条数据       |
| :total          | 数据绑定，总共多少页数据           |

- 配置分页参数

```js
  data() {
    return {
      ......
       // 分页相关的属性
      pagenum: 1,
      pagesize: 2,
      total: 0
      .......
    }
  },
  methods: {
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.loadData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.loadData()
    },
    async loadData () {
      this.loading = true
      const res = await this.$http.get('users', {
        headers: {
          Authorization: window.sessionStorage.getItem('token')
        },
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res)
      this.loading = false
      const data = res.data
      const { meta: { msg, status } } = data
      if (status === 200) {
        const { data: { users, total } } = data
        this.list = users
        // 获取总共多少条数据
        this.total = total
      } else {
        this.$message.error(msg)
      }
    }
  }
```

### 用户列表-搜索功能

> 网络请求时的query参数就是查询所需要的参数

- 业务分析
- 接口测试

- 绑定点击搜索事件处理函数
- 调用加载用户列表数据方法

`user.vue/template`

```html
 <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
```

`user.vue/script`

```js
data () {
    return {
      // 省略
      // 搜索参数
      searchValue: ''
    }
  },
      
methods: {
    // 搜索
    handleSearch () {
      this.loadData()
    },
      
     // 省略
        
     // 在请求时添加一个参数
           params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.searchValue
        }  
}
```

### 用户状态

- 业务分析

- 接口测试

- [Switch 开关](http://element-cn.eleme.io/#/zh-CN/component/switch) 的 change 事件
- 自定义事件绑定传参

`user.vue/template`

```html
 <el-table-column
         label="用户状态">
          <template slot-scope="scope">
            <!-- scope.row就是当前绑定的数据对象 -->
         <el-switch
         @change="handleSwitchChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
      </template>
      </el-table-column>
```

`user.vue/script/methods`

```js
 async handleSwitchChange (user) {
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      // console.log(user)
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      )
      const data = res.data
      // console.log(data)
      const { meta: { status, msg } } = data
      if (status === 200) {
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
```

### 删除功能

- 业务分析

- 接口测试
- 注册点击删除事件处理函数
- 使用 [MessageBox 弹框](http://element-cn.eleme.io/#/zh-CN/component/message-box) 给出删除操作提示
- 根据用户 id 执行删除操作
- 删除成功，重新加载当前分页数据

`user.vue/template`

```html
  <el-table-column
        label="操作" width="300">
       <template slot-scope="scope">
        <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="handleDelete(scope.row.id)" plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
      </template>
      </el-table-column>
```

`user.vue/script/methods`

```js
  handleDelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${id}`)
          const data = res.data
          // console.log(data)
          const { meta: { status, msg } } = data

          if (status === 200) {
            // 删除成功 重新加载数据
            this.pagenum = 1
            this.loadData()
          } else {
            this.$message({
              type: 'success',
              message: msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: msg
          })
        })
    }
```

### 添加用户

- 业务分析

- 接口测试
- [DIalog 对话框](http://element-cn.eleme.io/#/zh-CN/component/dialog)
- 表单布局 + 数据绑定

- 提交表单添加用户
- 添加用户成功，重新加载用户列表

#### 显示用户信息输入框

`user.vue/template`

```html
<!-- 省略 -->

<!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
           <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button @click="addUserDialogFormVisible = true" type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>

<!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addUserDialogFormVisible">
      <el-form
      label-width="100px"
      :model="formData">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
         <el-input v-model="formData.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
         <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
         <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialogFormVisible = false">确 定</el-button>
      </div>
</el-dialog>
```

`user.vue/script/data`

```js
 // 控制添加用户的对话框显示与隐藏
      addUserDialogFormVisible: false,
      // 绑定表单数据
      formData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
```

#### 处理添加用户的表单提交

`user.vue/template`

```html
 <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
```

`user.vue/script/methods`

```js
async addUser () {
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      const res = await this.$http.post('users', this.formData)
      const data = res.data
      const { meta: { status, msg } } = data
      if (status === 201) {
        // 添加成功
        // 隐藏对话框
        this.addUserDialogFormVisible = false
        // 提示成功
        this.$message.success(msg)
        // 重新加载数据
        this.loadData()
        // 清空文本输入框的值
        for (const key in this.formData) {
          this.formData[key] = ''
        }
      } else {
        this.$message.error(msg)
      }
    }
```

### 表单验证

> 对新用户的信息进行验证, 使用[表单验证](http://element-cn.eleme.io/#/zh-CN/component/form)

`user.vue/template`

```html

```

`user.vue/script/data`

```json
 // 表单验证规则
      formRules: {
        username: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }]
      }
```

`user.vue/script/methods`

```js

```

> 在await最近的外层函数要加上async 否则报错

### 编辑用户

- 业务分析

- 接口测试
- 注册点击编辑时间处理函数
- 使用 [Dialog 对话框](http://element-cn.eleme.io/#/zh-CN/component/dialog) 弹出编辑窗口
- 将要编辑的用户信息渲染到编辑窗口中
- 处理编辑操作

#### 显示编辑的页面

`user.vue/template`

```html
     <el-table-column
        label="操作" width="300">
       <template slot-scope="scope">
        <el-button @click="editUserDialogFormVisible = true" plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="handleDelete(scope.row.id)" plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
      </template>

      </el-table-column>

<!--省略-->

<!-- 编辑用户 -->
       <el-dialog title="编辑用户" :visible.sync="editUserDialogFormVisible">
      <el-form
      ref="myform"
      :rules="formRules"
      label-width="100px"
      :model="formData">
        <el-form-item label="用户名" prop="username" >
          <el-input disabled v-model="formData.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
         <el-input v-model="formData.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话">
         <el-input v-model="formData.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
</el-dialog>
```

`user.vue/script/data`

```json
      editUserDialogFormVisible: false

```

#### 处理编辑的表单提交

 `user.vue/template`

```html
      <!-- 编辑用户 -->
        <el-button @click="handleEdit" type="primary">确 定</el-button>

```

`user.vue/script/methods`

```js
 async handleEdit () {
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      const res = await this.$http.put(`users/${this.formData.id}`, {
        mobile: this.formData.mobile,
        email: this.formData.email
      })
      const data = res.data
      const { meta: { status, msg } } = data
      if (status === 200) {
        this.$message.success(msg)
        this.editUserDialogFormVisible = false
        this.loadData()
         for (const key in this.formData) {
        	this.formData[key] = ''
         }
      } else {
        this.$message.error(msg)
      }
    }
```

### 分配角色

#### 显示分配角色的对话框

`user.vue/template`

```html
        <el-button @click="setRoleDialogFormVisible=true"  plain size="mini" type="success" icon="el-icon-check" circle></el-button>

<!-- 分配角色 -->
       <el-dialog title="分配角色" :visible.sync="setRoleDialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="用户名" prop="username" >
          <el-input disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色">
            <el-select>
              <el-option disabled label="请选择" value="-1">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
</el-dialog>

```

`user.vue/script/data`

```js
      setRoleDialogFormVisible: false

```

#### 显示角色

`user.vue/template`

```html
 <!-- 分配角色 -->
       <el-dialog title="分配角色" :visible.sync="setRoleDialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="用户名" prop="username" >
            {{currentUsername}}
        </el-form-item>
        <el-form-item label="角色">
            <el-select v-model="currentRoleId">
              <el-option disabled label="请选择" :value="-1">
              </el-option>
              <el-option
              v-for="item in roles"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
</el-dialog>
```

`user.vue/script/data`

```js
 currentUsername: '',
      currentRoleId: -1,
      roles: []
```

`user.vue/script/methods`

```js
 // 获取角色名称
    async handleShowSetRole (user) {
      this.currentUsername = user.username
      this.setRoleDialogFormVisible = true
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      const res = await this.$http.get('roles')
      this.roles = res.data.data
    }
```

#### 显示当前用户的角色

`user.vue/script/methods`

```js
 const res1 = await this.$http.get(`users/${user.id}`)
      this.currentRoleId = res1.data.data.rid
```

#### 分配角色功能

`user.vue/template`

```html
        <el-button @click="handleSetRole" type="primary">确 定</el-button>
```

`user.vue/script/methods`

```js
 // 获取角色名称
    async handleShowSetRole (user) {
      this.currentUserId = user.id
       // 省略代码
        
    }
        
// 分配角色
    async handleSetRole () {
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {
        rid: this.currentRoleId
      })
      const data = res.data
      const { meta: { status, msg } } = data
      if (status === 200) {
        this.setRoleDialogFormVisible = false
        this.$message.success(msg)
        // 重置数据
        this.currentUsername = ''
        this.currentRoleId = -1
        this.currentUserId = -1
      } else {
        this.$message.error(msg)
      }
    },
```

## 权限管理

### 权限列表展示

1. 新建views/roles/rights.vue
2. 在index.js中的home下配置路由

`roles/right.vue/template`

```html
<template>
    <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表格 -->
       <el-table
       class="td"
       height="450px"
       border
       stripe
      :data="list"
      style="width: 100%">
       <el-table-column
       type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
```

`roles/right.vue/script`

```js
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.$http.defaults.headers.common['Authorization'] = sessionStorage.getItem('token')
      const res = await this.$http.get('rights/list')
      const data = res.data
      console.log(data)
      this.list = data.data
    }
  }
}
```

`roles/right.vue/style`

```css
.box-card{
  height: 100%;
  /* overflow: auto; */
}
.td{
  margin-top: 20px;
}
```

### 设置axios拦截器

`plugins/http.js`

```js
import axios from 'axios'

// const httpHelper = {}
// 配置Vue插件
// httpHelper.install = function fn (Vue) {
//   axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
//   Vue.prototype.$http = axios
// }
const httpAxios = {}
httpAxios.install = function (Vue) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1'
  })

  instance.interceptors.request.use(function (config) {
    if (config.url.toLowerCase() !== 'login') {
      const token = sessionStorage.getItem('token')
      config.headers.Authorization = token
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(function (response) {
    return response
  })
  Vue.prototype.$http = instance
}
// export default httpHelper
export default httpAxios
```

---

### 角色列表展示

1. 新建views/roles/roles.vue
2. 配置路由
3. 完成roles.vue的展示

`roles/roles.vue/template`

```html
<template>
   <el-card class="box-card">
      <!-- 面包屑 -->
      <!-- <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb> -->
      <cus-Breadcrumb level1='权限管理' level2='角色列表'></cus-Breadcrumb>
      <el-row class="row-add">
        <el-col :span="24">
          <el-button>添加角色</el-button>
        </el-col>
      </el-row>

       <!-- 表格 -->
       <el-table
      :data="list"
      style="width: 100%">
       <el-table-column
       type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
  </el-card>
</template>
```

`roles/roles.vue/script`

```js
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data: resData } = await this.$http.get('roles')
      const { data, meta: { status, msg } } = resData
      if (status === 200) {
        this.list = data
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>
```

`roles/roles.vue/style`

```css
<style>
.row-add{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
```

### 自定义面包屑组件

1. 新建components/common/cusBreadcrumb.vue
2. 在main.js中引入cusBreadcrumb.vue 并注册全局组件
3. 在roles.vue中使用自定义面包屑组件

`components/common/cusBreadcrumb.vue`

```html
<template>
 <!-- 面包屑 -->
      <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.level1}}</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.level2}}</el-breadcrumb-item>
      </el-breadcrumb>
</template>

<script>
export default {
  name: 'cusBreadcrumb',
  props: ['level1', 'level2']
}
</script>

<style>

</style>

```

`roles.vue/template`

```html
      <cus-Breadcrumb level1='权限管理' level2='角色列表'></cus-Breadcrumb>
```

### 角色列表-操作+加载动画

`views/roles/roles.vue`

```html
 <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button  plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button   plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
```

```js
<script>
export default {
  data () {
    return {
      list: [],
      loading: true
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      const { data: resData } = await this.$http.get('roles')
      const { data, meta: { status, msg } } = resData
      this.loading = false
      if (status === 200) {
        this.list = data
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>
```

### 表格[展开列](http://element.eleme.io/#/zh-CN/component/table#zhan-kai-xing)+三级权限

> 用到element-ui的展开和[tag标签](http://element.eleme.io/#/zh-CN/component/tag#tag-biao-qian)

`views/roles/roles.vue/template`

```html
  <!-- 展开列 -->
       <el-table-column type="expand">
         <template slot-scope="scope">
           <!-- <el-tag @click="handleClose" type="success"></el-tag> -->
           <!-- 一级权限 -->
           <el-row class="level1" v-for="item1 in scope.row.children"
           :key="item1.id">
             <el-col :span="4">
               <el-tag closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
             </el-col>
             <!-- 二级权限 -->
             <el-col :span="20">
                  <el-row v-for="item2 in item1.children"
              :key="item2.id">
                <el-col :span="4">
                  <el-tag closable type="success">{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <!-- 三级权限 -->
                <el-col :span="20">
                  <el-tag class="level3" closable type="warning" v-for="item3 in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
             </el-col>
           </el-row>
         </template>
       </el-table-column>
```

`views/roles/roles.vue/script/methods`

```js
   handleClose () {

    },
```

### 无权限的处理

`views/roles/roles.vue/template`

```html
 <!-- 未设置权限的展示 -->
           <el-row v-if="scope.row.children.length == '0'">
             <el-col :span="24">未分配权限</el-col>
           </el-row>
```

### 删除用户的权限

1. 给三级权限设置@click事件
2. 传递scope.row和当前点击tag的id

`views/roles/roles.vue/template`

```html
@close="handleClose(scope.row.id, item1.id)"
```

`views/roles/roles.vue/script/methods`

```js
  async handleClose (roleId, rightId) {
      const { data: resData } = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      const { meta: { status, msg } } = resData
      if (status === 200) {
        this.$message.success(msg)
        this.loadData()
      } else {
        this.$message.error(msg)
      }
    }
```

### 删除用户权限-优化

`views/roles/roles.vue/template`

```html
@close="handleClose(scope.row, item1.id)"
```

`views/roles/roles.vue/script/methods`

```js
 async handleClose (role, rightId) {
      console.log(role)
      const { data: resData } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      const { data, meta: { status, msg } } = resData
      if (status === 200) {
        this.$message.success(msg)
        role.children = data
      } else {
        this.$message.error(msg)
      }
    }
```

### 分配权限-显示树形结构

1. 弹出分配权限的对话框
2. 对话框中使用[树形结构](http://element.eleme.io/#/zh-CN/component/tree#tree-shu-xing-kong-jian)

`views/roles/roles.vue/template`

```html
 <!-- 分配权限对话框 -->
        <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible"
      width="30%"
      @open="handleOpenDialog"
      >

        <el-tree
        :data="treedata"
        :props="defaultProps"
        show-checkbox
        default-expand-all></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
```

`views/roles/roles.vue/script/data`

```json
 treedata: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
```

`views/roles/roles.vue/script/methods`

```js
 // 打开对话框时,执行
    async handleOpenDialog () {
      console.log(11)
      const { data: resData } = await this.$http.get('rights/tree')
      const { data } = resData
      this.treedata = data
    }
```

### 分类权限-获取选中项节点

> 当前打开的用户的权限并不是所有权限都有
>
> 要展示每个用户对应的权限

`roles/roles.vue/script/data`

```json

```

`roles/roles.vue/script/methods`

```js
 handleShowRightsDialog (role) {
      this.dialogVisible = true
      // console.log(role)
      const arr = []
      role.children.forEach((item1) => {
        item1.children.forEach((item2) => {
          item2.children.forEach((item3) => {
            arr.push(item3.id)
          })
        })
      })
      this.checkedList = arr
      // console.log(this.checkedList)
    }
```

`roles/roles.vue/template`

```html
          <el-button  @click="handleShowRightsDialog(scope.row)" plain size="mini" type="success" icon="el-icon-check" circle></el-button>

<!-- 分配权限对话框 -->
        <el-dialog
      @open="handleOpenDialog"
      title="分配权限"
      :visible.sync="dialogVisible"
      >

        <el-tree
        v-loading="loadingTree"
        :data="treedata"
        :props="defaultProps"
        node-key="id"
        :default-checked-keys="checkedList"
        show-checkbox
        default-expand-all></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
```

### 分配权限-更新权限

`roles/roles.vue/template`

```html
 <!-- 分配权限对话框 -->
        <el-dialog
      @open="handleOpenDialog"
      title="分配权限"
      :visible.sync="dialogVisible"
      >
        <el-tree
        ref="tree"
        v-loading="loadingTree"
        :data="treedata"
        :props="defaultProps"
        node-key="id"
        :default-checked-keys="checkedList"
        show-checkbox
        default-expand-all></el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRoles">确 定</el-button>
      </span>
    </el-dialog>
```

`roles/roles.vue/script/data`

```json
 // 记录当前修改权限的id
      currentRoleId: -1
```

`roles/roles.vue/script/methods`

```js
 // 点击确定按钮,更新用户权限
    async handleSetRoles () {
      // 获取被选这个权限的id
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      // 获取半选中权限的节点的id
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      const newArray = [...checkedKeys, ...halfCheckedKeys]
      // console.log(newArray)
      const {data: resData} = await this.$http.post(`roles/${this.currentRoleId}/rights`, {
        rids: newArray.join(',')
      })
      const {meta: { status, msg }} = resData
      if (status === 200) {
        this.dialogVisible = false
        this.$message.success(msg)
        this.loadData()
      } else {
        this.$message.error(msg)
      }
    }
```

### 动态渲染列表

> 不同身份权限的用户登录时 展示不同的权限的列表

`home.vue/template`

```html
  <el-menu class="menu" :unique-opened="true" :router="true">
            <el-submenu v-for="item in menus"
            :key="item.id"
            :index="''+item.id">

              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName}}</span>
              </template>

              <el-menu-item
              v-for="item1 in item.children"
              :key="item1.id"
              :index='"/" + item1.path'>
                <i class="el-icon-menu"></i>
                {{ item1.authName }}
              </el-menu-item>
            </el-submenu>
        </el-menu>
```

`home.vue/script`

```js
 // 动态渲染侧边栏
    async loadData () {
      const { data: resData } = await this.$http.get('menus')
      const {data, meta: { status, msg }} = resData
      if (status === 200) {
        this.menus = data
        console.log(this.menus)
      } else {
        this.$message.error(msg)
      }
    }
```

## 路由守卫

> 我们目前把token验证写在了home.vue中
>
> 但是在某些项目中,一些功能需要登录,另一些功能不需要登录就可以展示
>
> 此时, 用到了路由守卫
>
> 在通过路由跳转之前,在"路由拦截器"中做一些事情,称之为[路由守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)

`router/index.js`

```js
import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user/user'
import Rights from '@/views/roles/rights'
import Roles from '@/views/roles/roles'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: User
    }, {
      name: 'rights',
      path: '/rights',
      component: Rights
    }, {
      name: 'roles',
      path: '/roles',
      component: Roles
    }]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  }
  ]
})
// 路由的前置守卫
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (to.name === 'login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      router.push({ 'name': 'login' })
      Message.warning('请先登录')
      return
    }
    next()
  }
})
export default router

```

## 商品管理

### 商品分类

#### 列表展示

1. 新建categories.vue
2. 配置路由
3. 搭建界面

`categories.vue/template`

```html
<template>
<el-card class="card-box">
  <cus-Breadcrumb level1='商品管理' level2='商品分类'></cus-Breadcrumb>
  <el-row class="row-add">
        <el-col :span="24">
          <el-button type="success" plain>添加分类</el-button>
        </el-col>
  </el-row>
  <!-- 表格 -->
  <el-table
      height="450px"
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="cat_level"
        label="级别"
        width="180">
        <!-- 级别 -->
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button  plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button  plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
</el-card>
</template>
```

`categories.vue/script`

```js
<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data: resData } = await this.$http.get('categories?type=3')
      const { data } = resData
      this.list = data
    }
  }
}
</script>
```

#### 分页组件

> 接口文档中-商品分类-测试是否有分页功能
>
> ?type=3&pagenum=1&pagesize=5

`categories.vue/template`

```html
 <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
```

`categories.vue/script`

```js
<script>
export default {
  data () {
    return {
      list: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const { data: resData } = await this.$http.get('categories?type=3')
      const { data } = resData
      this.list = data
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
```

#### 分页功能

`categories.vue/script/methods`

```js
methods: {
    async loadData () {
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      const {data: { result, total }} = resData
      this.list = result
      this.total = total
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.loadData()
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.loadData()
      console.log(`当前页: ${val}`)
    }
  }
```

#### 分类名称多级展示

> 这里 我们使用[element-tree-grid](https://github.com/foolishchow/element-tree-grid)组件

1. npm安装
2. 导入
3. 局部注册
4. 配置element-tree-grid组件

``categories.vue/script/template`

```html
 <!--
        treeKey 绑定到id 给每个节点设置一个唯一值
        parentKey 绑定到父id属性 区分父子节点
        levelKey 绑定到层级的属性
        childKey 绑定到储存子元素的属性
       -->
      <el-tree-grid
      prop="cat_name"
      label="分类名称"
      treeKey="cat_id"
      parentKey="cat_pid"
      levelKey="cat_level"
      childKey="children"
      :indentSize="30">
      </el-tree-grid>
```

``categories.vue/script`

```js
const ElTreeGrid = require('element-tree-grid')
// 省略
 components: {
    ElTreeGrid
 }
```

#### 添加商品对话框

1. 点击添加按钮、弹出对话框
   - 对话框中使用[级联选择器](http://element.eleme.io/#/zh-CN/component/cascader)
2. 发送获取商品分类的请求

`categories.vue/template`

```html
<el-button @click="handleShowAddDialog" type="success" plain>添加分类</el-button>
 
<!-- 添加商品的对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="分类">
          <!-- 这里不用自带的下拉框, 找el-ui中的级联选择器 -->
          <el-cascader
            clearable
            change-on-select
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            :props="defaultProps"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
</el-dialog>
```

`categories.vue/script/data`

```js
addDialogFormVisible: true,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: 0
      },
      // 绑定层级下拉框
      selectedOptions: [],
      // 层级下拉框中的数据
      options: [],
      // 层级下拉框中的配置
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
```

`categories.vue/script/methods`

```js
async handleShowAddDialog () {
      // 点击添加按钮, 显示对话框
      this.addDialogFormVisible = true
      // 加载层级数据
      const { data: resData } = await this.$http.get(`categories?type=2`)
      this.options = resData.data
    }
```

#### 添加商品功能

`categories.vue/template`

```html
<el-button type="primary" @click="handleAdd">确 定</el-button>
```

`categories.vue/script/methods`

```js
// 点击对话框的确定按钮, 添加商品分类信息
    async handleAdd () {
      // cat_level cat_pid
      // 分类的父id
      // 如果级联下拉框 没有选择 cat_pid=0
      // 如果级联下拉框 选中一级 cat_pid=selecetdOptions[0]
      // 如果级联下拉框 选中耳机 cat_pid=selectedOptions[1]
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0
        this.form.cat_level = 0
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0]
        this.form.cat_level = 1
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1]
        this.form.cat_level = 2
      }
      // 发送请求 返回201 则添加
      const { data: resData } = await this.$http.post(`categories`, this.form)
      if (resData.meta.status === 201) {
        this.$message.success('添加成功')
        this.loadData()
        this.addDialogFormVisible = false
      } else {
        this.$message.error(resData.meta.msg)
      }
    }
```

#### 删除商品分类

1. 找到删除按钮、绑定click事件

`categories.vue/template`

```html
          <el-button  @click="handleDelete(scope.row.cat_id)" plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
```

2. 实现handleDelete方法,添加[删除提示框](http://element.eleme.io/#/zh-CN/component/message-box#que-ren-xiao-xi), 发送删除的网络请求

`categories.vue/script/methods`

```js
// 点击删除按钮,弹出删除提示框,发送删除的请求
    async handleDelete (catId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除的网络请求
        const { data: resData } = await this.$http.delete(`categories/${catId}`)
        if (resData.meta.status === 200) {
          this.$message.success('删除成功')
          this.loadData()
        } else {
          this.$message.error(resData.meta.msg)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
```

> 注意
>
> 1. .catch不写的话会报错 1 Uncaught (in promise) cancel 原因是promise结构不完整
> 2. 删除成功后,有个小bug,当前选中的下拉箭头状态需要改变,**待解决**

#### 修改商品分类

1. 找到编辑按钮、绑定click事件

`categories.vue/template`

```html
<el-button  @click="handleEdit(scope.row.cat_id)" plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>

 <!-- 添加修改分类的对话框 -->
    <el-dialog title="修改商品分类" :visible.sync="editDialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editDialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
</el-dialog>
```

2. 实现handleOpenEdit方法,给表单元素赋值,对话框弹出、

`categories.vue/script/data`

```js
addDialogFormVisible: false,
```

`categories.vue/script/methods`

```js
// 点击编辑按钮,弹出编辑对话框
    handleOpenEdit (cat) {
      this.form.cat_name = cat.cat_name
      this.form.cat_id = cat.cat_id
      console.log(this.form)
      this.editDialogFormVisible = true
    },
```

3. 点击编辑分类的对话框中的确定按钮@click="handleEdit",发送编辑的网络请求

`categories.vue/script/methods`

```js
// 点击编辑对话框的确定按钮, 发送编辑分类的网络请求
    async handleEdit () {
      const res = await this.$http.put(`categories/${this.form.cat_id}`, this.form)
      const { meta } = res.data
      if (meta.status === 200) {
        this.editDialogFormVisible = false
        this.$message.success(meta.msg)
        this.loadData()
      } else {
        this.$message.error(meta.msg)
      }
    },
```

### 商品列表

#### 列表展示

1. 新建goods/goodslist.vue

2. 配置路由

3. 商品列表视图+样式(和user.vue的视图很像)

   `goodslist.vue/template`

   ```html
   <template>
   <el-card class="box-card">
     <cus-Breadcrumb level1='商品管理' level2='商品列表'></cus-Breadcrumb>
   
    <!-- 搜索框 -->
     <el-row class="searchArea">
       <el-col :span="24">
         <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
            <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
         </el-input>
         <el-button @click="addGoodDialogFormVisible = true" type="success" plain>添加商品</el-button>
       </el-col>
     </el-row>
   
       <!-- 表格 -->
     <el-table
         height="450px"
         border
         stripe
          v-loading="loading"
         :data="list"
         style="width: 100%">
   
         <!-- 序号 -->
         <el-table-column
         type="index">
         </el-table-column>
   
         <el-table-column
           prop="goods_name"
           label="商品名称"
           >
         </el-table-column>
   
         <el-table-column
           prop="goods_price"
           label="商品价格(元)"
           width="100">
         </el-table-column>
   
         <el-table-column
           prop="goods_weight"
           label="商品重量"
           width="80">
         </el-table-column>
   
         <el-table-column
           label="创建日期" width="120">
           <template slot-scope="scope">
               {{scope.row.add_time | fmtDate('YYYY-MM-DD')}}
           </template>
         </el-table-column>
   
         <el-table-column
           label="操作" width="100">
           <template slot-scope="scope">
           <el-button  plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
           <el-button  plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
           </template>
         </el-table-column>
   
     </el-table>
   
   </el-card>
   </template>
   ```

   `goodslist.vue/style`

   ```css
   <style>
   .searchArea {
     margin-top: 10px;
     margin-bottom: 10px;
   }
   .searchArea .searchInput {
     width: 350px;
   }
   </style>
   ```

4. 商品列表数据的请求

`goodslist.vue/script`

```js
<script>
export default {
  data () {
    return {
      searchValue: '',
      loading: false,
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    handleSearch () {

    },
    async loadData () {
      this.loading = true
      const { data: resData } = await this.$http.get(`goods?pagenum=4&pagesize=10`)
      this.loading = false
      this.list = resData.data.goods
      // console.log(this.list)
    }
  }
}
</script>
```

#### 分页功能

1. 使用[分页组件](http://element.eleme.io/#/zh-CN/component/pagination#pagination-fen-ye)
2. 配置分页组件
3. 获取分页需要的参数

`goods.vue/template`

```html
  <!-- 分页组件 -->
  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
```

`goods.vue/script/data`

```js
 pagenum: 1,
 pagesize: 10,
 total: 0
```

`goods.vue/script/methods`

```js
 handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.loadData()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.loadData()
    },
    async loadData () {
      this.loading = true
      const { data: resData } = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      this.total = resData.data.total
      this.list = resData.data.goods
      this.loading = false
      // console.log(this.list)
    }
```

#### 添加商品-准备组件

1. 新建添加商品的组件goodsadd.vue 、配置路由
2. 找到添加的按钮,绑定click事件

`goodslist.vue/template`

```html
<el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button>
```

#### 添加商品-组件布局

1. 面包屑
2. [alert提示框](http://element.eleme.io/#/zh-CN/component/alert)
3. [步骤条](http://element.eleme.io/#/zh-CN/component/steps#steps-bu-zou-tiao)
4. [tabs标签页](http://element.eleme.io/#/zh-CN/component/tabs)

`goodsadd.vue/template`

```html
<template>
<el-card class="box-card">
  <!-- 面包屑 -->
  <cus-Breadcrumb level1='商品管理' level2='商品列表'></cus-Breadcrumb>
  <!-- 提示框 -->
  <el-alert class="alert" title="添加商品信息" type="info" center :closable="false" show-icon></el-alert>
  <!-- 步骤条 -->
  <el-steps class="steps" :space="400" align-center :active="active*1" finish-status="success">
    <el-step title="基本信息"></el-step>
    <el-step title="商品参数"></el-step>
    <el-step title="商品属性"></el-step>
    <el-step title="商品图片"></el-step>
    <el-step title="商品内容"></el-step>
  </el-steps>
  <!-- tabs选项卡 -->
  <!-- element-ui已经封装好了，当切换时,v-model的值自动切换为el-tabs-pane的name对应的值. -->
  <el-tabs class="tabs" v-model="active" tab-position="left" style="height: 200px;">
    <el-tab-pane name="1" label="基本信息">基本信息</el-tab-pane>
    <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
    <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
    <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
    <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
  </el-tabs>
</el-card>
</template>
```

`goodsadd.vue/script`

```js
<script>
export default {
  data () {
    return {
      active: "1"
    }
  },
  methods: {

  }
}
</script>
```

#### 添加商品-商品分类

1. 设置表单
2. 添加下拉级联选择器
3. 配置级联选择器

`goodsadd.vue/template`

```html
 <!-- tabs选项卡 -->
  <!-- element-ui已经封装好了，当切换时,v-model的值自动切换为el-tabs-pane的name对应的值. -->
  <el-form class="form" label-position="top" :model="form" label-width="80px">
    <el-tabs class="tabs" v-model="active" tab-position="left" style="height: 200px;">

      <el-tab-pane name="1" label="基本信息">
        <el-form-item label="商品名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <!-- 级联选择器 -->
          <el-cascader
            clearable
            :options="options"
            :props="defaultProps"
            v-model="selectedOptions "
            expand-trigger="hover"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-tab-pane>

      <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </el-form>
```

`goodsadd.vue/script`

```js
<script>
export default {
  data () {
    return {
      active: '1',
      form: {

      },
      // 层级下拉框的数据源
      options: [],
      // 层级下拉框的数据源配置
      defaultProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 绑定到层级下拉框上的数据
      selectedOptions: []
    }
  },
  created () {
    this.loadOptions()
  },
  methods: {
    handleChange () {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning('商品只能添加到三级分类')
        this.selectedOptions.length = 0
      }
    },
    async loadOptions () {
      const { data: resData } = await this.$http.get(`categories?type=3`)
      this.options = resData.data
      console.log(this.options)
    }
  }
}
</script>
```

`goodsadd.vue/style`

```css
<style>
.alert{
  margin-top: 26px;
  margin-bottom: 10px;
}
.form{
  height: 400px;
  overflow: auto;
}
</style>
```

#### 添加商品-基本信息

`goodsadd.vue/template`

```html
<el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
```

`goodsadd.vue/script/data`

```js
form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        // 分类id
        goods_cat: ''
      },
```

#### 添加商品-商品动态参数

> 使用[多选框](http://element.eleme.io/#/zh-CN/component/checkbox)

`goodsadd.vue/template`

```html
 <el-tab-pane name="2" label="商品参数">
        <el-form-item v-for="item in dynamicsParams" :key="item.attr_id" :label="item.attr_name">
        <el-checkbox-group v-model="item.attr_vals">
          <el-checkbox border v-for="val in item.attr_vals" :key="val" :label="val"></el-checkbox>
        </el-checkbox-group>
        </el-form-item>
      </el-tab-pane>
```

`goodsadd.vue/script/methods`

```js
async handleTabClick () {
      if (this.active === '2' || this.active === '3') {
        if (this.selectedOptions.length !== 3) {
          this.$message.error('请选择商品的三级分类')
          return
        }
      }
      if (this.active === '1') {
        const { data: resData } = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        this.dynamicsParams = resData.data
        console.log(this.dynamicsParams)
        this.dynamicsParams.forEach((item) => {
          item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(',')
        })
      }
    }
```

#### 添加商品-商品属性

1. 获取静态参数
2. 商品属性展示

#### 添加商品-商品图片

> 使用[上传组件](http://element-cn.eleme.io/#/zh-CN/component/upload#upload-shang-chuan)

`goodsadd.vue/template`

```html
 <el-tab-pane name="4" label="商品图片">
        <!-- action
          必须设置全路径
          必须设置token -->
        <el-upload
          action="http://127.0.0.1:8888/api/private/v1/upload"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :headers="tokenHeader"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-tab-pane>
```

`goodsadd.vue/script/methods`

```js
 
handleRemove (file, fileList) {
      const index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tem_path
      })
      this.form.pics.splice(index, 1)
      console.log(this.form)
    },
    handleSuccess (response, file, fileList) {
      const { meta, data } = response

      if (meta.status === 200) {
        this.$message.success('图片上传成功')
        this.form.pics.push({
          pic: response.data.tmp_path
        })
      } else {
        this.$message.error(meta.msg)
      }
    },
```

#### 添加商品-商品内容

> 使用[富文本编辑器](https://github.com/surmon-china/vue-quill-editor)

##### 添加商品

`goodsadd.vue/script/methods`

```js
async handleAdd () {
      this.form.goods_cat = this.selectedOptions.join(',')
      const dy = this.dynamicsParams
      const st = this.staticParams
      const arr1 = dy.map((item) => {
        item.attr_vals = item.attr_vals.join(',')
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      const arr2 = st.map((item) => {
        item.attr_vals = item.attr_vals.join(',')
        return {attr_id: item.attr_id, attr_value: item.attr_vals}
      })
      this.form.attrs = [...arr1, ...arr2]
      console.log(this.form.attrs)
      const {data: {meta: {status, msg}}} = await this.$http.post('goods', this.form)
      if (status === 201) {
        this.$message.success(msg)
        this.$router.push({
          name: 'goodslist'
        })
      } else {
        this.$message.error(msg)
      }
    },
```

### 分类参数

#### 分类参数页面展示

1. 新建params.vue
2. 配置路由
3. 页面布局

`params.vue`

```html
<template>
<el-card class="box-card">
  <cus-Breadcrumb level1='商品管理' level2='分类参数'></cus-Breadcrumb>
  <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning"  :closable="false" show-icon></el-alert>
  <el-row>
    <el-col :span="24" class="col">
      <span>请选择商品分类</span>
      <el-cascader
            :options="options"
            v-model="selectedOptions"
            :show-all-levels="false"
            :props="{ label:'cat_name', value:'cat_id'}"
            expand-trigger="hover"
            @change="handleChange">
      </el-cascader>
      <el-tabs v-model="activeName">
        <el-tab-pane label="动态参数" name="many">
          <el-button :disabled="isDisabled" type="primary" size="mini">设置动态参数</el-button>
          <el-table
            :data="dynamicParams"
            style="width: 100%">
            <el-table-column
              type="expand"
              width="40">
              <template slot-scope="scope">
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="handleClose">
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="index"
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primany" icon="el-icon-edit" plain></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button :disabled="isDisabled" type="primary" size="mini">设置静态参数</el-button>
          <el-table
            :data="staticParams"
            style="width: 100%">
            <el-table-column
              type="expand"
              width="40">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column
              prop="index"
              label="#"
              width="40">
            </el-table-column>
            <el-table-column
              prop="attr_name"
              label="属性名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="attr_vals"
              label="属性值"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primany" icon="el-icon-edit" plain></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</el-card>
</template>

<script>
export default {
  data () {
    return {
      options: [],
      selectedOptions: [],
      activeName: 'many',
      dynamicParams: [],
      staticParams: [],
      isDisabled: true,
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.loadOptions()
  },
  methods: {
    handleClose () {
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {

    },
    handleChange () {
      if (this.selectedOptions.length === 3) {
        this.isDisabled = false
        this.loadTableData()
      } else {
        this.isDisabled = true
      }
    },
    async loadOptions () {
      const { data: {data, meta: { status, msg }} } = await this.$http.get(`categories?type=3`)
      if (status === 200) {
        this.options = data
        // console.log(this.options)
      } else {
        this.$message.error(msg)
      }
    },
    async loadTableData () {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning('请选择三级分类')
        return
      }
      const { data: {data, meta: { status, msg }} } =
      await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeName}`)
      if (status === 200) {
        this.dynamicParams = data
        // 动态参数attr_vals -> 数组
        // 在动态参数数组上添加一个属性params 保存
        this.dynamicParams.forEach((item) => {
          console.log(item.attr_vals)
          item.params = item.attr_vals.trim().split(',').length ? [] : item.attr_vals.trim().split(',')
        })
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.alert{
  margin-top: 16px;
}
.col{
  margin-top: 16px;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>

```

#### 删除标签

1. 使用动态参数数组 this.$set()方法
2. 动态渲染el-tag
3. 从视图中删除对应的el-tag
4. 发送请求、更新视图

`params.vue/template`

```html
<el-tag
                  v-for="(item, index) in scope.row.params"
                  :key="index"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)">
                  {{item}}
</el-tag>
```

`params.vue/script/methods`

```js
async handleClose (row, index) {
      row.params.splice(index, 1)
      // 准备请求的数据
      // 准备url上需要的id
      const catId = row.cat_id
      const attrId = row.attr_id
      // console.log(catId, attrId)
      // put携带的对象
      const putData = {
        attr_name: row.attr_name,
        attr_sel: row.attr_sel,
        attr_vals: row.params.join(',')
      }
      // 让数据一致
      row.attr_vals = putData.attr_vals
      // 发送请求
      const url = `/categories/${catId}/attributes/${attrId}`
      const res = await this.$http.put(url, putData)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message.success('更新成功')
      } else {
        this.$message.error('更新失败')
      }
    }
// 修改loadTableData方法中的部分代码
//const arr = item.attr_vals.trim().split(',').length === 0 ? [] : item.attr_vals.trim().split(',')
          // 动态给对象添加的成员, 数据绑定有问题, 所以用arr去处理
          this.$set(item, 'params', arr)
```

#### 添加标签

> 实现handleInputConfirm(row) 方法
>
> 过程和删除标签功能很像
>
>  tab切换时调用this.loadTableData()方法

#### 响应拦截器

`http.js`

```js
instance.interceptors.response.use(function (response) {
    const { data: { meta: { status, msg } } } = response
    if (status !== '200' || status !== '201') {
      Message.error(msg)
    }
    return response
  })
```

> 修改之后 可以将组件中的所有 status等于200和201之外的判断去掉

## 订单管理

### 订单列表展示

1. 新建orders.vue
2. 配置路由
3. 列表展示
4. 省市选择



## 数据统计

1. 新建reports.vue
2. 配置路由
3. 安装echarts
4. 获取数据
5. 展示统计图



## 项目打包

> 结果: 可以在任何web服务器中运行该项目,不依赖webpack、npm、vue-cli等工具
>
>  调整含义 ? 

`操作`

- npm run build
  - 把src下的所有文件进行合并压缩
  - 打包后的代码自动出现在dist文件夹中
  - 把dist放在web服务器中去访问, 给后台运维去部署上线

- 优化

  1. [路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97)

  `要解决的问题`

  ```js
  webpack会
  把我们自己的js文件都合并打包编译到app.xxxx.js中
  把第三方包(element-ui、echarts..)合并编译到vender.xxx.js中
  项目运行时
  会直接把app.xxxx.js和vender.xxx.js都进行下载 很慢
  ```

  `解决方案`

  ```js
  加载的时候 只需要加载一次就可以了 之后就不需要加载了
  优点:第一次加载 慢, 之后 快
  缺点:如果文件太大,第一次加载会很慢
  
  把组件的js文件打包到不同的js文件中
  用户点到哪里,就加载哪里对应的资源文件,按需去加载
  用路由懒加载去实现
  ```

  `代码`

  ```js
  // 将之前的路由中的代入组件 进行改写
  const XXX = () => import('@/XXX.vue')
  ```

  2. [CDN](https://www.bootcdn.cn/)加载第三方包
     1. 在index.html中引入资源
     2. 配置webpack

  

























