<template>
<el-container class="homebox">
  <el-header class="headerHome">
    <el-row :gutter="20" id="righta" style="margin-right: 0px;">
      <el-col :span="4"><img src="@/assets/logo.png"/></el-col>
      <el-col :span="16"><h3>电商后台管理系统</h3></el-col>
      <el-col :span="4" >
        <el-tooltip class="item" effect="dark" content="点击退出哦！" placement="bottom">
          <a href="" class="loginout" @click.prevent="remoUser()">退出</a>
        </el-tooltip>
      </el-col>
    </el-row>

  </el-header>
  <el-container>
    <!--侧边栏导航-->
    <el-col :span="4" class="navlist">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo homeul"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :unique-opened = true
        :collapse-transition= true
        router>
        <el-submenu :index="'' + item1.order" v-for="item1 in menusAry" :key="item1.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{item1.authName}}</span>
          </template>
          <el-menu-item-group v-for="item2 in item1.children" :key="item2.id">
            <el-menu-item :index=" '/' + item2.path"><i class="el-icon-caret-right"></i>{{item2.authName}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-main class="homeMain"><router-view></router-view></el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  data: function () {
    return {
      isCollapse: true,
      menusAry: []
    }
  },
  async created () {
    const res = await this.$http.get('menus')
    this.menusAry = res.data.data
  },
  methods: {
    remoUser () {
      // 当退出的时候 清除存储的token
      localStorage.clear()
      // 并且使用路由巡航  实现页面重定向
      this.$router.push({
        name: 'login'
      })
      this.$message.success('退出成功')
    }
  }
}
</script>
<style>
.headerHome {
  width: 100%;
  padding: 0;
  background-color: #c2cae4;
  padding-left: 20px;
}

.homebox {
  height: 100%;
}

.loginout {
  font-size: 12px;
  line-height: 60px;
  margin-left: 105px;
  text-decoration: none;
  color: #4015a9;
}

#righta {
  margin-right: 0px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.homeul {
  height: 100%;
}
.el-submenu>div{
  padding-left: 0px !important;
}
.homeMain {
  padding-left: 3px;
}
</style>
