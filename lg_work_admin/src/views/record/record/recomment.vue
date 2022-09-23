<template>
  <div class="student-container">
    <el-container>
      <el-header>
        <span>成长记录</span>
      </el-header>
      <el-main>
        <el-select
          v-model="select"
          placeholder="请选择班级"
          size="large"
          class="select-class"
          @change="selectGrade"
        >
          <el-option
            v-for="item in grade.data"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-table :stripe="true" :data="data_source.data">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
            width="180"
          />
          <el-table-column
            align="center"
            prop="new_record.courseName"
            label="最近课程主题"
            width="180"
          />
          <el-table-column
            align="left"
            prop="new_record.show_content"
            label="最近成长记录"
          />
          <el-table-column
            align="center"
            prop="time"
            label="时间"
            width="100"
          />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  dialogRecordVisible = true;
                  getRecordList(data_source.data[scope.$index]);
                "
                >查看</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  option_status = 0;
                  dialogFormVisible = true;
                  select_student = data_source.data[scope.$index];
                  getCourseList();
                  resetForm(ruleFormRef);
                "
              >
                新增</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <el-dialog
    class="insert-dialog"
    v-model="dialogFormVisible"
    :title="option_status == 0 ? '新增成长记录' : '修改成长记录'"
    width="90%"
  >
    <el-tabs tab-position="left" style="height: 500px" class="dialog-tabs">
      <el-tab-pane label="课程主题">
        <el-radio-group v-model="form.course">
          <el-radio-button
            v-for="item in courses.data"
            :key="item.id"
            :label="item"
            size="large"
            >{{ item.name }}</el-radio-button
          >
        </el-radio-group>
      </el-tab-pane>
      <el-tab-pane label="开始语">Config</el-tab-pane>
      <el-tab-pane label="课程内容">Role</el-tab-pane>
      <el-tab-pane label="课堂表现">Task</el-tab-pane>
      <el-tab-pane label="细节描述">Task</el-tab-pane>
      <el-tab-pane label="结束语">Task</el-tab-pane>
    </el-tabs>
    <el-descriptions
      title="User Info"
      class="dialog-description"
      direction="vertical"
    >
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu
        Province</el-descriptions-item
      >
    </el-descriptions>
  </el-dialog>
  <el-dialog v-model="dialogRecordVisible" title="成长记录" width="80%">
    <el-table :stripe="true" :data="records.data">
      <el-table-column align="center" type="index" label="序号" width="100" />
      <el-table-column
        align="center"
        prop="courseName"
        label="课程主题"
        width="100"
      />
      <el-table-column align="left" prop="content" label="内容" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button link type="primary" size="small">查看</el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="copy(records.data[scope.$index].content)"
          >
            复制</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>
      
      
  <script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { useClipboard } from "@vueuse/core";

import {
  form,
  select,
  option_status,
  select_student,
  getCourseBy,
  Record,
  data_source,
  getList,
  option,
  courses,
  getCourseList,
  grade,
  moulds,
  getGradeList,
  getMouldsList,
  records,
  getRecordList,
} from "./record";
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
const resetForm = (formEl: FormInstance | undefined) => {
  console.log("sdf");
  if (!formEl) return;
  formEl.resetFields();
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      option(formEl);
    } else {
      console.log("error submit!", fields);
    }
  });
};
const selectGrade = (val: number) => {
  getList();
};
const selectCourse = (val: any) => {
  getCourseBy(val.id);
};
getGradeList();
getMouldsList();
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
    }

    .ep-main {
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
  .ep-dialog__body {
    display: flex;
    flex-direction: row;
    .dialog-tabs {
      flex: 0.5;
    }
    .dialog-description {
      flex: 0.5;
    }
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