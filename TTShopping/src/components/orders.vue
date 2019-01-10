<template>
  <el-card>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="40">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否付款">
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货">
      </el-table-column>
      <el-table-column label="下单时间" prop="create_time" width="90">
      </el-table-column>
      <el-table-column
        label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle size="mini"></el-button>
          </template>
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
</template>
<script>
export default {
  data: function () {
    return {
      tableData: [],
      total: 0,
      pagesize: 5,
      currentPage: 1
    }
  },
  created () {
    this.getItem()
  },
  methods: {
    async getItem () {
      const res = await this.$http.get(`orders?pagenum=${this.currentPage}&pagesize=${this.pagesize}`)
      this.tableData = res.data.data.goods
      this.total = res.data.data.total
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.currentPage = 1
      this.getItem()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getItem()
    }
  }
}
</script>
<style>
</style>
