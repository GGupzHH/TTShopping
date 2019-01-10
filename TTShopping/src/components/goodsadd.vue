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
    <el-form class="form" label-position="left" :model="fromdata">
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
          <el-form-item :label="item1.attr_name" v-for="item1 in categoriesList" :key="item1.attr_id">
            <el-checkbox
              class="checknos"
              checked
              :label="item2"
              border
              size="medium"
              v-for="(item2, i) in item1.attr_vals.split(',')"
              :key="i">
            </el-checkbox>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item, i) in propertyShopping" :key="i">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              style="width: 100%;margin-top: 20px;"
              action="http://localhost:8888/api/private/v1/upload"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="headers"
              list-type="picture">
              <el-button size="small" type="primary" style="width: 100%;">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容" class="quillBox">
          <el-form-item>
            <el-button type="primary" @click="addGoods()" style="width: 100%;margin-top: 20px;">添加商品</el-button>
            <!-- 富文本 -->
            <quill-editor v-model="fromdata.goods_introduce" class="quill"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
<script>
// 引入富文本插件所需样式和包
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  data: function () {
    return {
      active: '1',
      fromdata: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        goods_cat: '',
        pics: [],
        attrs: []
      },
      options: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      selectedOptions: [],
      checked5: '',
      categoriesList: [],
      propertyShopping: [],
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }
  },
  components: {
    quillEditor
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
          this.categoriesList = res.data.data
        }
      } else if (this.active === '3') {
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        this.propertyShopping = res.data.data
      } else if (this.active === '4' || this.active === '5' || this.active === '1') {

      } else {
        this.$message.warning('请先选择三级分类')
      }
    },
    // 文件上传成功触发的钩子
    handleSuccess (response) {
      this.fromdata.pics.push({
        pic: response.data.tmp_path
      })
    },
    // 文件删除的时候触发的钩子
    handleRemove (file, fileList) {
      console.log(file, fileList)
      const INDEX = this.fromdata.pics.findIndex(item => {
        return item.pic === file.response.data.tmp_path
      })
      this.fromdata.pics.splice(INDEX, 1)
    },
    // 添加商品
    async addGoods () {
      // 将级联选择的数组转换成字符串放到数据里面
      this.fromdata.goods_cat = this.selectedOptions.join(',')
      const arr1 = this.categoriesList
      const arr2 = this.propertyShopping
      console.log(arr1)
      const newArr1 = arr1.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      const newArr2 = arr2.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      const arr = [...newArr1, ...newArr2]
      console.log(arr)
      this.fromdata.attrs = arr
      const res = await this.$http.post(`goods`, this.fromdata)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg)
        this.$router.push({
          name: 'goods'
        })
      }
    }
  }
}
</script>
<style scoped>
.alert {
  margin-top: 15px;
}
.card {
  min-height: 100%;
}
.el-upload--picture {
  width: 100%;
}
.quill {
  margin-top: 30px;
  min-height: 300px;
  width: 950px;
}
.ql-container {
  min-height: 300px;
}
.el-form-item__content {
  width: 100%;
}
.quillBox {
  width: 100%;
}
</style>
