<template>
  <div class="student-container">
    <el-container>
      <el-header>
        <span>课程管理</span>
      </el-header>
      <el-main>
        <div class="select-menu">
          <el-select v-model="level" placeholder="请选择年龄段" size="large" class="select-class" @change="getCourseList">
            <el-option label="3岁" value="3" />
            <el-option label="4岁" value="4" />
            <el-option label="5岁" value="5" />
            <el-option label="6岁" value="6" />
            <el-option label="7岁" value="7" />
            <el-option label="8岁" value="8" />
            <el-option label="9岁" value="9" />
          </el-select>
          <el-select v-model="course" placeholder="请选择课程主题" size="large" class="select-class" @change="selectCourse">
            <el-option v-for="item in courses.data" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <el-table :stripe="true" :data="data_source.data">
          <el-table-column align="center" type="index" label="序号" width="80" />
          <el-table-column align="center" prop="courseName" label="主题" width="100" />
          <el-table-column align="left" prop="show_content" label="最近成长记录" />
          <el-table-column align="center" prop="createdAt" label="时间" width="100" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small" @click="
                dialogRecordVisible = true;
                current = data_source.data[scope.$index]
              ">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="dialogRecordVisible" title="成长记录" width="80%">
    <div class="html-content">
      <p v-html="current.content"></p>
    </div>
  </el-dialog>
</template>
        
        
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useClipboard } from "@vueuse/core";
import { Search } from '@element-plus/icons-vue'

import {
  form,
  select,
  search,
  option_status,
  
  current,
  Record,
  data_source,
  getList,

  level,
  course,
  courses,
  getCourseList,

} from "./search";
import { AnyColumn } from "element-plus/es/components/table-v2/src/common";
const dialogFormVisible = ref(false);
const dialogRecordVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });

const rules = reactive<FormRules>({
  course: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  mould: [{ required: false, message: "请输入小名", trigger: "blur" }],
  behavior: [{ required: false, message: "请选择联系人", trigger: "blur" }],
});
const edit = (e: Record) => {
  form.id = e.id;
  dialogFormVisible.value = true;
  option_status.value = 1;
  dialogFormVisible.value = true;
  option_status.value = 1;
};


const selectGrade = (val: number) => {
  getList();
};
const selectCourse = (val: number) => {
  getList();
};

</script>
<style lang="scss">
.student-container {
  padding: 20px;

  .ep-container {
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

      .search-input-class {
        margin: 10px 0;
        display: flex;
        width: 300px;
        height: 30px;

        .ep-input__wrapper {
          width: 200px;
        }
      }
    }

    .ep-main {
      .select-menu {
        display: flex;
        flex-direction: row;

        .select-class {
          margin: 10px 0;
          display: flex;
          flex-direction: row;

          .ep-input__wrapper {
            width: 160px;
          }
        }

        .select-class:last-child {
          margin-left: 20px;
        }
      }

      .select-class {
        margin: 10px 0;
        display: flex;
        width: 200px;

        .ep-input__wrapper {
          width: 200px;
        }
      }

    }
  }
}

.insert-dialog {
  display: flex;
  flex-direction: row;

  .dialog-tabs {
    flex: 0.6;
    margin: 0 10px 0 0;

    .ep-radio--large {
      width: 100%;
      word-break: break-all;
      white-space: pre-line;
      height: auto;
      text-align: left;
      padding: 10px 0;
    }

    .ep-badge {
      --ep-badge-bg-color: var(--ep-color-danger);
      --ep-badge-radius: 10px;
      --ep-badge-font-size: 12px;
      --ep-badge-padding: 6px;
      --ep-badge-size: 12px;
      position: relative;
      vertical-align: middle;
      display: inline-block;
      margin: 10px 5px;
    }

    .course {
      .radio-button {
        text-align: left;

        .ep-button {
          margin-top: 10px;
          height: 30px;
          padding: 8px 10px;
        }
      }
    }

    .start {
      .ep-radio-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }

    .end {
      .ep-radio-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }

  .dialog-description {
    flex: 0.4;
  }
}

.html-content {
  p {
    margin: 0;
    padding: 0;
    text-align: left;
  }
}

.ep-dialog {
  .ep-dialog__footer {
    text-align: center;
  }

  .student-time {
    .ep-select {
      margin-right: 20px;
    }
  }
}
</style>