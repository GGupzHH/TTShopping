<template>
  <el-card class="card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 消息提示 -->
    <el-row class="alert">
      <el-col>
        <el-alert :closable="false" title="添加商品信息" type="info" center show-icon></el-alert>
      </el-col>
    </el-row>
    <!--分步-->
    <!--分步双向数据绑定 通过绑定active 自动获取active的值 然后显示对应的步数 number类型-->
    <el-steps :active="active - 0" finish-status="success" align-center style="margin-top: 20px;">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!--标签页-->
    <!--双向数据绑定  获取当前active的值 然后v-model会找到对应name的值  string-->
    <el-form class="form" label-position="left" :model="fromdata" label-width="80px">
      <el-tabs @tab-click="tabclick()" tab-position="left" style="margin-top: 20px; height: 100%;" v-model="active">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="fromdata.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="fromdata.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="fromdata.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="fromdata.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-col :span="8">
            <!--props这是要渲染数据中的key名-->
            <!--options这是要渲染的数据-->
            <!--selectedOptions默认选中  也就是后来选中的value的值-->
              <el-cascader
                expand-trigger="hover"
                style="width: 100%;"
                :options="options"
                clearable
                :props="defaultProp"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </el-col>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">

        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data: function () {
    return {
      active: '1',
      fromdata: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: ''
      },
      options: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      selectedOptions: []
    }
  },
  created () {
    this.getShopItem()
  },
  methods: {
    handleChange () {
      if (this.selectedOptions.length !== 3) {
        this.$message.error('商品只能添加到三级分类')
        this.selectedOptions = []
      }
    },
    // 获取多级链表数据
    async getShopItem () {
      const res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
    },
    // tab切换的时候触发的钩子
    async tabclick () {
      this.handleChange()
      // this.active 可以获取当前的第几个
      // 想要去下一个tab就要第一个选了三级联动 敬业就是得有三级的才可以
      if (this.active === '2') {
        if (this.selectedOptions.length === 3) {
          const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
          console.log(res)
        }
      } else {
        this.$message.warning('请先选择三级分类')
      }
    }
  }
}
</script>
<style>
.alert {
  margin-top: 15px;
}
.card {
  height: 100%;
}
</style>
