<template>
  <!--使用卡片代码块-->
  <el-card class="box-card">

    <!--面包屑代码块-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索块  + 添加按钮-->
    <el-row>
      <!--搜索块-->
      <el-col :span="18">
        <div style="margin-top: 30px;">
          <el-input placeholder="请输入内容" v-model="query" class="input-with-select" @input="checkintFn()">
                  <el-button slot="append" icon="el-icon-search" >搜索</el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" style="margin-top: 30px;">
        <el-button type="primary" plain @click="showDiaAdd()">添加用户</el-button>
      </el-col>
    </el-row>

    <!--表格显示-->
    <template>
      <el-table
          :data="tableData"
          style="width: 100%; margin-top: 30px;">
          <el-table-column
            prop="id"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建日期">
            <template slot-scope="scope">
              {{scope.row.create_time | dataSet}}
            </template>
          </el-table-column>
          <el-table-column
            label="用户状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchUser(scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="用户操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="修改" placement="bottom">
                <el-button type="primary" icon="el-icon-edit" circle @click="EditUser(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <el-button type="danger" icon="el-icon-delete" circle @click="RemoveUser(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="角色" placement="bottom">
                <el-button type="success" icon="el-icon-check" circle @click="roleUser(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
    </template>

    <!--分页-->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="upDataEditUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看角色对话框 -->
    <el-dialog title="角色修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="roleNameRolu" placeholder="请选择角色">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option v-for="(v, i) in rolesArray" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdataroleUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>
<script>
export default {
  data: function () {
    return {
      tableData: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: -1,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        rid: ''
      },
      formLabelWidth: '100px',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisible: false,
      rolesArray: [],
      roleNameRolu: ''
    }
  },
  mounted () {
    this.getUserlist()
  },
  methods: {
    // 用户状态
    async switchUser (user) {
      await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
    },
    // 角色修改
    async roleUser (user) {
      // 将上面的用户数据获取到
      this.form.username = user.username
      this.form.id = user.id
      // 通过用户的ID获取用户的角色ID
      const res = await this.$http.get('users/' + user.id)
      // 将每个用户的角色ID拿到
      this.roleNameRolu = res.data.data.rid
      this.dialogFormVisible = true
      const {
        data: {
          data
        }
      } = await this.$http.get('roles')
      this.rolesArray = data
    },
    // 角色修改提交
    async UpdataroleUser () {
      const res = await this.$http.put(`users/${this.form.id}/role`, {
        rid: this.roleNameRolu
      })
      console.log(res)
      this.dialogFormVisible = false

      this.$message.success(res.data.meta.msg)
    },
    // 获取数据
    async getUserlist () {
      // 设置需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
      this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
      // 结构数据  获取值
      const {
        data: {
          data: {
            pagenum,
            total,
            users,
            rid
          }
        }
      } = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // 将获取的值返回给data
      this.pagenum = pagenum
      this.tableData = users
      this.total = total
      this.rid = rid
    },
    // 修改数据
    async EditUser (user) {
      const {
        data: {
          data: {
            email,
            mobile,
            username
          },
          meta: {
            status
          }
        }
      } = await this.$http.get('users/' + user.id)

      if (status === 200) {
        this.dialogFormVisibleEdit = true
        this.form.username = username
        this.form.email = email
        this.form.mobile = mobile
        this.form.id = user.id
      }
    },
    // 修改数据提交
    async upDataEditUser () {
      const {
        data: {
          meta: {
            msg,
            status
          }
        }
      } = await this.$http.put('users/' + this.form.id, {
        id: this.form.id,
        email: this.form.email,
        mobile: this.form.mobile
      })
      if (status === 200) {
        this.$message.success(msg)
        this.dialogFormVisibleEdit = false
        this.form = {}
        this.getUserlist()
      }
    },
    // 删除数据
    async RemoveUser (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {
          data: {
            meta: {
              msg
            }
          }
        } = await this.$http.delete('users/' + user.id)

        this.$message({
          type: 'success',
          message: msg
        })
        this.getUserlist()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页第几页
    handleSizeChange (val) {
      this.pagesize = val
      this.getUserlist()
    },
    // 分页每页几条数据
    handleCurrentChange (val) {
      this.pagenum = 1
      this.pagenum = val
      this.getUserlist()
    },
    // 添加
    async addUser () {
      const {
        data: {
          meta: {
            msg,
            status
          }
        }
      } = await this.$http.post('users', this.form)
      if (status === 201) {
        this.dialogFormVisibleAdd = false
        this.form = {}
        this.getUserlist()
      }
      this.$message.success(msg)
    },
    // 显示添加弹窗
    showDiaAdd () {
      this.dialogFormVisibleAdd = true
      this.form = {}
    },
    // 搜索
    checkintFn () {
      this.pagenum = 1
      this.getUserlist()
    }
  }
}
</script>
<style>
</style>
