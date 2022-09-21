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
                @click="dialogRecordVisible=true;getRecordList(data_source.data[scope.$index])"
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
    width="50%"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="课程主题" prop="course" label-width="80px">
        <el-select
          v-model="form.course"
          placeholder="请选择课程主题"
          size="large"
          class="select-class"
          value-key="id"
          @change="selectCourse"
        >
          <el-option
            v-for="item in courses.data"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="生成模板" label-width="80px" prop="name">
        <el-input
          v-model="form.mould"
          :autosize="{ minRows: 2, maxRows: 8 }"
          type="textarea"
          placeholder="请选择课程主题"
          disabled
        />
      </el-form-item>
      <el-form-item label="课堂表现" label-width="80px" prop="petName">
        <el-input
          v-model="form.behavior"
          :autosize="{ minRows: 2, maxRows: 8 }"
          type="textarea"
          placeholder="请填写课堂表现"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            submitForm(ruleFormRef);
          "
          >保存</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="dialogRecordVisible" title="成长记录" width="50%">
    <el-table :stripe="true" :data="records.data">
      <el-table-column align="center" type="index" label="序号" width="100" />
      <el-table-column
        align="center"
        prop="courseName"
        label="课程主题"
        width="180"
      />
      <el-table-column
        align="center"
        prop="content"
        label="课程主题"
        width="180"
      />
      <el-table-column align="center" prop="time" label="时间" width="100" />
    </el-table>
  </el-dialog>
</template>
    
    
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { Room } from "~/model/base";
import StudentTarget from "~/api/apis/student";
import RoomTarget from "~/api/apis/room";
import Storage from "@service/storage/storage";
import { SpiAxios } from "@service/spi/spi";
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
  getRecordList
} from "./record";
const dialogFormVisible = ref(false);
const dialogRecordVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
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