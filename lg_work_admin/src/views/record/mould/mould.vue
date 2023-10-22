<template>
  <div class="student-container">
    <el-container>
      <el-header>
        <span>模板管理</span>
        <el-button
          :bg="true"
          type="primary"
          :icon="Plus"
          @click="
            option_status = 0;
            dialogFormVisible = true;
            unref(ruleFormRef)?.resetFields();
          "
          >新增</el-button
        >
      </el-header>

      <el-main>
        <div class="select-menu">
          <el-select
            v-model="level"
            placeholder="请选择年龄段"
            size="large"
            class="select-class"
            @change="getCourseList"
          >
            <el-option label="F1" value="3" />
            <el-option label="F2" value="4" />
            <el-option label="F3" value="5" />
            <el-option label="F4" value="6" />
            <el-option label="F5" value="7" />
            <el-option label="S1" value="8" />
            <el-option label="S2" value="9" />
          </el-select>
          <el-select
            v-model="course"
            placeholder="请选择课程主题"
            size="large"
            class="select-class"
            @change="selectCourse"
          >
            <el-option
              v-for="item in courses.data"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <el-table :stripe="true" :data="data_source.data">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            align="center"
            prop="type"
            label="模板类型"
            width="180"
          />
          <el-table-column align="left" prop="content" label="模板内容" />
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
                @click="
                  (mould_common = true), edit(data_source.data[scope.$index])
                "
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
        <el-divider content-position="center">通用模板</el-divider>
        <el-table :stripe="true" :data="common_source.data">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="100"
          />
          <el-table-column
            align="center"
            prop="type"
            label="模板类型"
            width="180"
          />
          <el-table-column align="left" prop="content" label="模板内容" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  (mould_common = true), edit(common_source.data[scope.$index])
                "
                >编辑</el-button
              >
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon-color="#626AEF"
                title="您确认要删除吗?"
                @confirm="deleteById(common_source.data[scope.$index].id)"
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
    :title="option_status == 0 ? '新增模板' : '修改模板'"
    width="50%"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="模板类型" prop="type" label-width="80px">
        <el-select v-model="form.type" placeholder="请选择模板类型">
          <el-option
            v-for="item in types.data"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="模板内容" label-width="80px" prop="content">
        <el-input
          v-model="form.content"
          :rows="5"
          type="textarea"
          placeholder="Please input"
        />
      </el-form-item>
      <el-form-item label="是否通用" label-width="80px" prop="isCommon">
        <el-switch v-model="form.isCommon" />
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
import { reactive, ref, unref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { Room } from "~/model/base";
import StudentTarget from "~/api/apis/student";
import RoomTarget from "~/api/apis/room";
import Storage from "@service/storage/storage";
import { SpiAxios } from "@service/spi/spi";
import {
  level,
  course,
  option_status,
  Mould,
  data_source,
  getList,
  common_source,
  getCommonList,
  option,
  deleteById,
  courses,
  getCourseList,
  types,
  getTypeList,
  mould_common,
} from "./mould";
const dialogFormVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const form = reactive<Mould>(new Mould());

const rules = reactive<FormRules>({
  type: [{ required: true, message: "请选择模板类型", trigger: "blur" }],
  content: [{ required: true, message: "请填写模板内容", trigger: "blur" }],
  isCommon: [
    { required: false, message: "请选择模板是否通用", trigger: "blur" },
  ],
});
const edit = (e: Mould) => {
  form.id = e.id;
  form.type = e.type;
  form.content = e.content;
  form.isCommon = e.courseId == 1;
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
const selectCourse = (val: number) => {
  getList();
};
getCommonList();
getTypeList();
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