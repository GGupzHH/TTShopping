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
1.1 使用npm install 配置相关的包
### 2. 使用vue-router配置路由
2.1 使用路由嵌套 配置子组件路由
### 3. 使用element-UI完成子组件的开发
3.1 使用element中的卡片，表格，layout布局等一些组件完成页面搭建
3.2 使用element第三方插件 element-tree-grid 实现树形表格的构建
### 4. axios处理请求，获取数据
4.1 使用axios.baseURL设置固定请求地址
4.2 使用axios.interceptors.request.use设置请求拦截 在用户登录的情况下， 将用户保存在本地token放到请求头一起发送给后台
4.3 使用push实现编程式导航 实现渲染不同的组件
4.5 使用promise获取异步请求的数据
4.6 使用async获取异步请求的数据
4.7 使用结构赋值结构返回的对象

