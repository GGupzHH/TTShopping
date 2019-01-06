<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  /***
   * 1. props是选项
   * 2. props值可以是字符串数组
   * 3. props中的数据和data中数据用法一样
   * 4. props中的数据的值来源于外部（data中的数据的值来源于本身）
   *
   */
  props: ['level1', 'level2']
}

// props 传值（数据来源来源于外部）
// 1. 声明数据  props：[]
// 2. 在使用组件时 给a传值  <child-a a="abc"></child-a>
// 3. 在组件template中使用a {{a}}
</script>

<style>
</style>
