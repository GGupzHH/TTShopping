<template>
  <el-card class="box-card">
    <!--面包屑-->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>

    <!--添加按钮-->
    <el-row class="row" left>
      <el-col>
        <el-button type="primary">添加角色</el-button>
      </el-col>
    </el-row>
    <!--表格-->
     <el-table
      :data="tableData"
      style="width: 100%; margin-top: 20px;">
      <el-table-column type="expand" class="tabletr1">
        <template slot-scope="props">
          <el-row v-for="(itme1, i) in props.row.children" :key="i" style="border-bottom: 1px solid #ccc; margin-bottom: 15px;" class="table01btn">
            <el-col :span="4">
              <el-tag @close="tagClose(props.row, itme1.id)" closable type="danger">{{itme1.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(item2, i) in itme1.children" :key="i">
                <el-col :span="4">
                  <el-tag @close="tagClose(props.row, item2.id)" closable type="info">{{item2.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                    <el-tag @close="tagClose(props.row, item3.id)" closable v-for="(item3, i) in item2.children" :key="i" style="margin-left: 20px; margin-bottom: 15px;">{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column
        label="角名名称"
        prop="roleName">
      </el-table-column>
      <el-table-column
        label="角色描述"
        prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" plain circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" plain circle></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="checkRole(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--对话框-->
    <el-dialog
      title="提示"
      width="50%"
      :visible.sync="dialogVisible">
      <!--树形结构-->
      <el-tree
        ref="tree"
        :data="treedata"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedArr"
        show-checkbox>
      </el-tree>
      <!--下面按钮-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRights()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>

</template>
<script>
export default {
  data: function () {
    return {
      tableData: [],
      dialogVisible: false,
      treedata: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      checkedArr: [],
      usersId: ''
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    // 获取角色信息
    async getRoles () {
      const res = await this.$http.get('roles')
      this.tableData = res.data.data
    },
    // 删除角色的权限
    async tagClose (role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
      role.children = res.data.data
    },
    // 获取或有的角色权限
    async checkRole (users) {
      // 展示对话框
      this.dialogVisible = true
      const res = await this.$http.get(`rights/tree`)
      // 将请求到的所有权限渲染到页面中
      this.treedata = res.data.data
      // 将当前角色选中的权限渲染
      const newArray = []
      users.children.forEach((item1) => {
        item1.children.forEach((item2) => {
          item2.children.forEach((item3) => {
            newArray.push(item3.id)
          })
        })
      })
      this.usersId = users.id
      this.checkedArr = newArray
    },
    async setRights () {
      // 通过方法获取当前选中和半选中的
      const res = [...this.$refs.tree.getCheckedKeys(), ...this.$refs.tree.getHalfCheckedKeys()]
      const roles = await this.$http.post(`roles/${this.usersId}/rights`, {
        rids: res.join(',')
      })
      this.dialogVisible = false
      this.$message.success(roles.data.meta.msg)
      this.getRoles()
    }
  }
}
</script>
<style>
.el-table__expanded-cell>div:nth-child(1) {
  border-top: 1px solid #ccc;
  padding-top: 15px;
}
.table01btn > div {
  border: 0px !important;
}
</style>
