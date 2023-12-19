<template>
  <div class="student-container">
    <el-container>
      <el-header>
        <span>学生管理</span>
        <el-button
          :bg="true"
          type="primary"
          :icon="Plus"
          @click="
            option_status = 0;
            dialogFormVisible = true;
            unref(ruleFormRef)?.resetFields()
          "
          >新增</el-button
        >
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
        <el-table :stripe="true" :data="data_source.data" style="width: 100%">
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
            prop="petName"
            label="小名"
            width="180"
          />
          <el-table-column
            align="center"
            prop="parent"
            label="联系人"
            width="120"
          />
          <el-table-column align="center" prop="level" label="年龄段" />
          <el-table-column
            align="center"
            fixed="right"
            label="操作"
            width="120"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="edit(data_source.data[scope.$index])"
                >编辑</el-button
              >
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon-color="#626AEF"
                title="您确认要删除吗?"
                @confirm="deleteById(data_source.data[scope.$index].id)"
              >
                <template #reference>
                  <el-button link type="primary" size="small"> 删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    :title="option_status == 0 ? '新增教室' : '修改教室'"
    width="50%"
  >
    <el-form
      :inline="true"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="姓名" label-width="80px" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="小名" label-width="80px" prop="petName">
        <el-input v-model="form.petName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系人" label-width="80px" prop="parent">
        <el-input v-model="form.parent" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄段" prop="level" label-width="80px">
        <el-select v-model="form.level" placeholder="请选择年龄段">
          <el-option label="F1" value="3" />
          <el-option label="F2" value="4" />
          <el-option label="F3" value="5" />
          <el-option label="F4" value="6" />
          <el-option label="F5" value="7" />
          <el-option label="S1" value="8" />
          <el-option label="S2" value="9" />
          <el-option label="Scratch" value="10" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="所在班级"
        prop="grade"
        label-width="80px"
        class="student-time"
      >
        <el-select v-model="form.grade" value-key="id" placeholder="请选择班级">
          <el-option
            v-for="item in grade.data"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
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
</template>
  
  
<script lang="ts" setup>
import { reactive, ref, unref  } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { Room } from "~/model/base";
import StudentTarget from "~/api/apis/student";
import RoomTarget from "~/api/apis/room";
import Storage from "@service/storage/storage";
import { SpiAxios } from "@service/spi/spi";
import {
  select,
  option_status,
  Student,
  data_source,
  getList,
  option,
  deleteById,
  grade,
  getGradeList,
} from "./student";
import { Grade } from "../grade/grade";
const dialogFormVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const form = reactive<Student>(new Student());

const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  petName: [{ required: false, message: "请输入小名", trigger: "blur" }],
  parent: [{ required: false, message: "请选择联系人", trigger: "blur" }],
  level: [{ required: false, message: "请选择年龄段", trigger: "blur" }],
  grade: [{ required: true, message: "请选择班级", trigger: "blur" }],
});
const edit = (e: Student) => {
  form.id = e.id;
  form.name = e.name;
  form.petName = e.petName;
  form.parent = e.parent;
  form.level = e.level;
  form.grade = grade.data.filter((item) => {
    return item.id == e.classId;
  })[0];
  dialogFormVisible.value = true;
  option_status.value = 1;
  dialogFormVisible.value = true;
  option_status.value = 1;
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      option(formEl, form);
    } else {
      console.log("error submit!", fields);
    }
  });
};
const selectGrade = (val: number) => {
  getList();
};
getList();
getGradeList();
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