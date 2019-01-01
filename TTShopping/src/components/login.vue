<template>
  <div class="login-box">
    <div class="login-boxson">
      <el-container>
        <el-aside width="110px" class="l-user">用户名：</el-aside>
        <el-main>
          <el-input placeholder="请输入邮箱" v-model="fromdata.username" clearable ></el-input>
        </el-main>
      </el-container>
      <el-container>
        <el-aside width="110px" class="l-user">密&nbsp;&nbsp;&nbsp;&nbsp;码：</el-aside>
        <el-main>
          <el-input type="password" placeholder="请输入密码" v-model="fromdata.password" clearable ></el-input>
        </el-main>
      </el-container>
      <el-button type="primary" class="l-btn" @click="loginfn()">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      fromdata: {
        username: '',
        password: ''
      }

    }
  },
  methods: {
    async loginfn () {
      const {data: {data, meta: {msg, status}}} = await this.$http.post('login', this.fromdata)
      if (status === 200) {
        localStorage.setItem('token', data.token)
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style scoped>
.login-box {
  height: 100%;
  background-color: #0099cc;
  background: url(../assets/loginbj.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

.login-boxson {
  padding-top: 30px;
  width: 400px;
  height: 225px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px -5px 30px #ccc,
              -5px 5px 30px #ccc;
  position: absolute;
  top: 50%;
  margin-top: -112px;
  right: 7%;
}

.l-user {
  line-height: 80px;
}

.l-btn {
  width: 93%;
}
</style>
