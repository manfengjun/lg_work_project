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
                  records.data = [];
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
                  resetForm();
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
    v-model="dialogFormVisible"
    :title="option_status == 0 ? '新增成长记录' : '修改成长记录'"
    width="90%"
  >
    <div class="insert-dialog">
      <el-tabs tab-position="left" style="height: 500px" class="dialog-tabs">
        <el-tab-pane class="course">
          <template #label>
            <el-badge :value="form.courseId > 0 ? '+1' : ''"
              ><span>课程主题</span></el-badge
            >
          </template>
          <el-radio-group v-model="form.courseId" @change="selectCourse">
            <el-radio
              v-for="item in courses.data"
              :key="item.id"
              :label="item.id"
              size="large"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane class="start">
          <template #label>
            <el-badge :value="form.start_mould.length > 0 ? '+1' : ''"
              ><span>开始语</span></el-badge
            >
          </template>
          <el-radio-group v-model="form.start_mould" @change="preview">
            <el-radio
              v-for="item in moulds.start_moulds"
              :key="item.id"
              :label="item.content"
              size="large"
              >{{ item.content }}</el-radio
            >
          </el-radio-group>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <el-badge :value="form.content_mould.length > 0 ? '+1' : ''"
              ><span>课程内容</span></el-badge
            >
          </template>
          <el-table
            highlight-current-row
            :stripe="true"
            :data="moulds.content_moulds"
            @current-change="selectContent"
          >
            <el-table-column align="left" prop="content" label="模板内容" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <el-badge :value="form.behavior_mould.length > 0 ? '+1' : ''"
              ><span>课堂表现</span></el-badge
            >
          </template>
          <el-input
            v-model="form.behavior_mould"
            :autosize="{ minRows: 10, maxRows: 15 }"
            type="textarea"
            placeholder="请填写课堂表现"
            @change="preview"
          />
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <el-badge :value="form.specific_mould && form.specific_mould.length > 0 ? '+1' : ''"
              ><span>细节描述</span></el-badge
            >
          </template>
          <el-input
            v-model="form.specific_mould"
            :autosize="{ minRows: 10, maxRows: 15 }"
            type="textarea"
            placeholder="请填写细节描述"
            @change="preview"
          />
        </el-tab-pane>
        <el-tab-pane class="end">
          <template #label>
            <el-badge :value="form.end_mould.length > 0 ? '+1' : ''"
              ><span>结束语</span></el-badge
            >
          </template>
          <el-scrollbar height="500px">
            <el-radio-group v-model="form.end_mould" @change="preview">
              <el-radio
                v-for="item in moulds.end_moulds"
                :key="item.id"
                :label="item.content"
                size="large"
                >{{ item.content }}</el-radio
              >
            </el-radio-group>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <el-descriptions title="效果预览" :column="1" class="dialog-description">
        <el-descriptions-item label="姓名">{{
          select_student.name
        }}</el-descriptions-item>
        <el-descriptions-item label="课程主题">{{
          form.courseName
        }}</el-descriptions-item>
        <el-descriptions-item>{{ form.content }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            submitForm(ruleFormRef);
          "
          >保存</el-button
        >
      </span>
    </template>
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
            @click="copy((records.data[scope.$index] as any).content)"
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
  preview,
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
const resetForm = () => {
  form.courseId = 0
  form.courseName = ''
  form.start_mould = ''
  form.content_mould = ''
  moulds.content_moulds = []
  form.behavior_mould = ''
  form.specific_mould = ''
  form.end_mould = ''
  form.content = ''
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!form.courseId || form.courseId <= 0) {
    ElMessage.error('请选择课程主题！')
    return
  }
  if (form.start_mould.length <= 0) {
    ElMessage.error('请选择开始语！')
    return
  }
  if (form.content_mould.length <= 0) {
    ElMessage.error('请选择课程内容！')
    return
  }
  if (form.behavior_mould.length <= 0) {
    ElMessage.error('请填写课堂表现！')
    return
  }
  // if (form.specific_mould.length <= 0) {
  //   ElMessage.error('请填写细节描述！')
  //   return
  // }
  if (form.end_mould.length <= 0) {
    ElMessage.error('请填写结束语！')
    return
  }
  dialogFormVisible.value = false;
  option()
};
const selectGrade = (val: number) => {
  getList();
};
const selectCourse = (val: number) => {
  getCourseBy(val);
  form.courseName = courses.data.filter((e) => {
    return e.id == val;
  })[0].name;
};
const selectContent = (val: any) => {
  if (val) {
    form.content_mould = val.content;
    preview();
  }
  
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
      .ep-radio-group {
        display: flex;
        align-items: flex-start;
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