<template>
  <div class="room-container">
    <el-container>
      <el-header>
        <span>教室管理</span>
        <el-button :bg="true" type="primary" :icon="Plus">新增</el-button>
      </el-header>
      <el-main>
        <el-table :stripe="true" :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="序号" width="180" />
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="address" label="课程级别" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">编辑</el-button>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<style lang="scss">
.room-container {
  .ep-header {
    justify-content: space-between;
    display: flex;
    text-align: left;
    padding: 0;
    height: 40px;
    span {
      color: #898989;
    }
    .ep-button {
      height: 30px;
      padding: 8px 30px;
      span {
        color: #ffffff;
      }
    }
  }
  .ep-main {
    padding: 0;
  }
}
</style>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-08",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-06",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-07",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
