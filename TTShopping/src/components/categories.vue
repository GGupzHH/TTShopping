<template>
  <!--使用卡片代码块-->
  <el-card class="box-card">
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <el-row class="rowlist">
      <el-col :span="3"><el-button type="success" plain>添加商品</el-button></el-col>
    </el-row>
    <!--构建树形表格-->
    <el-table min-height="100%" :data="list" style="width: 100%">
    <!-- 使用插件实现树形表格
      prop
      label
      treeKey 每个节点的标识 数据中的key  xx_id
      parentKey  父节点的id值 cat_pid
      levelKey   当前节点的层级 -> 绑定数据中的key名
      childKey  -> children
      -->
      <el-tree-grid
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
      ></el-tree-grid>
      <el-table-column label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column label="是否有效">
        <template slot-scope="scope">
          <span v-if="!scope.row.cat_deleted">有效</span>
          <span v-if="scope.row.cat_deleted">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>
<script>
var ElTreeGrid = require('element-tree-grid')
export default {
  components: {
    ElTreeGrid
  },
  data: function () {
    return {
      list: [],
      pagenum: 1,
      total: 1,
      pagesize: 5
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    handleSizeChange (val) {
      // 每页显示几条
      this.pagesize = val
      this.pagenum = 1
      this.getCateList()
    },
    handleCurrentChange (val) {
      // 当前页数
      this.pagenum = val
      this.getCateList()
    },
    async getCateList () {
      const {
        data: {
          data: {
            total,
            result
          },
          meta: {
            msg,
            status
          }
        }
      } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      if (status === 200) {
        this.$message.success(msg)
        this.total = total
        this.list = result
        console.log(result)
      }
    }
  }
}
</script>
<style>
.rowlist {
  margin-top: 15px;
}
</style>
