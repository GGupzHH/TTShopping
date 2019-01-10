<template>
  <el-card class="card">
    <!--面包屑-->
    <my-bread level1="商品管理" level2="分类参数"></my-bread>

    <!--提示-->
    <el-alert
      style="margin-top: 15px;"
      title="注意：只允许为第三级分类设置参数"
      type="error">
    </el-alert>

    <!---->
    <el-row class="elrowlist">
      <el-col :span="3">
        <span style="font-size: 14px; line-height: 43px;">请选择商品分类</span>
      </el-col>
      <el-col :span="5">
        <el-cascader
          expand-trigger="hover"
          :options="options"
          :props="defaultProp"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>

    <!--参数设置-->
    <el-tabs tab-position="top" style="min-height: 375px;" @tab-click="clickTab()" v-model="active">
      <el-tab-pane label="动态参数">
        <el-row>
          <el-col :span="3">
            <el-button type="primary" size="mini" :disabled="selectedOptions.length === 0">设置动态参数</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <el-tag
                    :key="tag"
                    v-for="tag in props.row.attr_vals"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag, props.row)">
                    {{tag}}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(props.row)"
                    @blur="handleInputConfirm(props.row)"
                  >
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="#">
          </el-table-column>
          <el-table-column
            label="属性名称"
            prop="attr_name">
          </el-table-column>
          <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数">
        <el-row>
          <el-col :span="3">
            <el-button type="primary" size="mini" :disabled="selectedOptions.length === 0">设置静态参数</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            type="index"
            label="#"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值">
          </el-table-column>
          <el-table-column
            label="操作">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" circle></el-button>
                <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
export default {
  data: function () {
    return {
      options: [],
      selectedOptions: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      active: '0',
      tableData: [],
      inputVisible: false,
      inputValue: '',
      dynamicTags: []
    }
  },
  created () {
    this.getItems()
  },
  methods: {
    handleChange () {
      // 当选择完成三级菜单的时候触发
      this.clickTab()
      if (this.selectedOptions.length !== 3) {
        this.$message.error('请先选择三级分类设置的参数')
      }
    },
    // 获取三级菜单的数据
    async getItems () {
      const res = await this.$http.get(`categories?type=3`)
      this.options = res.data.data
    },
    // 当tab栏切换的时候 触发的钩子函数
    async clickTab () {
      if (this.active === '0') {
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        this.tableData = res.data.data
        this.tableData.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
        })
      } else {
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        this.tableData = res.data.data
      }
    },
    // 删除指定的小标记
    handleClose (tag, closeListArr) {
      closeListArr.attr_vals.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 显示input输入框
    showInput (closeListArr) {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 点击空白或者点击回车的时候触发的函数
    async handleInputConfirm (closeListArr) {
      // 双向绑定  获取此时输入框的内容
      let inputValue = this.inputValue
      if (inputValue) {
        // 如果内容存在 就把写入的数据放大传进来的数组中  也就是页面总的数组  数据双向绑定  所以会在页面中显示
        closeListArr.attr_vals.push(inputValue)
        // 获取发送的数据
        const putData = {
          attr_name: closeListArr.attr_name,
          attr_sel: closeListArr.attr_sel,
          attr_vals: closeListArr.attr_vals.join(',')
        }
        // 发送请求获取数据
        const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${closeListArr.attr_id}`, putData)
        if (res.data.meta.status !== 200) {
          this.$message.error(res.data.meta.msg)
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style scoped>
.elrowlist {
  margin-top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
