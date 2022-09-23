<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :collapse="false"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/work/center">
      <el-icon><homeFilled /></el-icon>

      <template #title>中心首页</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><histogram /></el-icon>
        <span>教务中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/work/education/student">
          <template #title>
            <span>学员管理</span>
          </template></el-menu-item
        >
        <el-menu-item index="/work/education/grade">
          <template #title>
            <span>班级管理</span>
          </template></el-menu-item
        >
        <!-- <el-menu-item index="1-3">
          <template #title>
            <span>老师管理</span>
          </template></el-menu-item
        > -->
        <el-menu-item index="/work/education/room">
          <template #title>
            <span>教室管理</span>
          </template></el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><document /></el-icon>
        <span>成长记录</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/work/record/course">
          <template #title>
            <span>课程管理</span>
          </template></el-menu-item
        >
        <el-menu-item index="/work/record/mould">
          <template #title>
            <span>模板管理</span>
          </template></el-menu-item
        >
        <el-menu-item index="/work/record/record">
          <template #title>
            <span>成长记录</span>
          </template></el-menu-item
        >
        <el-menu-item index="/work/record/recomment">
          <template #title>
            <span>成长记录新</span>
          </template></el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Histogram,
  HomeFilled,
} from "@element-plus/icons-vue";

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
