<template>
  <el-card>
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!--搜索康-->
    <el-row class="searchArea">
      <el-col :span="20">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容" @input="handleSearch()">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!--表格数据展示-->
    <el-table border stripe :data="list" style="width: 100%;margin-top: 15px;margin-bottom: 15px;">
      <!-- 序号 -->
      <el-table-column type="index"></el-table-column>

      <el-table-column prop="goods_name" label="商品名称"></el-table-column>

      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>

      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>

      <el-table-column label="创建日期" width="120">
        <template slot-scope="scope">{{scope.row.add_time | dataSet('YYYY-MM-DD')}}</template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum - 0"
      :page-sizes="[2, 5, 8, 10]"
      :page-size="pagesize"
      layout= 'total, sizes, prev, pager, next, jumper'
      :total= 'total'>
    </el-pagination>
  </el-card>
</template>
<script>
export default {
  data: function () {
    return {
      list: [],
      searchValue: '',
      query: '',
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  created () {
    this.setShopp()
  },
  methods: {
    // 搜索功能
    handleSearch () {
      this.query = this.searchValue
      this.setShopp()
    },
    async setShopp () {
      const res = await this.$http.get(`goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      this.list = res.data.data.goods
      this.total = res.data.data.total
      this.pagenum = res.data.data.pagenum
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.setShopp()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.setShopp()
    }
  }
}
</script>
<style scoped>
.searchArea {
  margin-top: 15px;
}
</style>
