<template>
<el-card class="box-card">
  <!--面包屑-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>

  <!--表格-->
  <template>
    <el-table
      :data="tableData"
      style="width: 100%; margin-top: 20px;">
      <el-table-column
        type="index"
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </template>
</el-card>
</template>
<script>
export default {
  data: function () {
    return {
      tableData: []
    }
  },
  created () {
    this.getRights()
  },
  methods: {
    async getRights () {
      const {
        data: {
          data,
          meta: {
            msg,
            status
          }
        }
      } = await this.$http.get(`rights/list`)
      if (status === 200) {
        this.$message.success(msg)
        this.tableData = data
      }
    }
  }
}
</script>
<style>
</style>
