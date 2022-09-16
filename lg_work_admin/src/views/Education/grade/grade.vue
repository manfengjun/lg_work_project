<template>
  <div class="grade-container">
    <el-container>
      <el-header>
        <span>班级管理</span>
        <el-button
          :bg="true"
          type="primary"
          :icon="Plus"
          @click="dialogFormVisible = true"
          >新增</el-button
        >
      </el-header>
      <el-main>
        <el-table :stripe="true" :data="list.data" style="width: 100%">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="name" label="班级名称" width="180" />
          <el-table-column prop="name" label="课程日期" width="120" />
          <el-table-column prop="name" label="课程时间" width="120" />
          <el-table-column prop="teacherName" label="课程老师" width="120" />
          <el-table-column prop="roomName" label="课程教室" width="120" />
          <el-table-column prop="level" label="年龄段" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button link type="primary" size="small">编辑</el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="deleteById(list.data[scope.$index].id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="dialogFormVisible" title="新增班级" width="50%">
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="left"
    >
      <el-form-item label="班级名称" label-width="80px" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="课程时间"
        prop="week"
        label-width="80px"
        class="grade-time"
      >
        <el-select v-model="form.week" placeholder="请选择日期">
          <el-option label="周一" value="周一" />
          <el-option label="周二" value="周二" />
          <el-option label="周三" value="周三" />
          <el-option label="周四" value="周四" />
          <el-option label="周五" value="周五" />
          <el-option label="周六" value="周六" />
          <el-option label="周日" value="周日" />
        </el-select>
        <el-time-picker v-model="form.time" placeholder="请选择时间" />
      </el-form-item>
      <el-form-item
        label="课程教室"
        prop="week"
        label-width="80px"
        class="grade-time"
      >
        <el-select v-model="form.room" value-key="id" placeholder="请选择教室">
          <el-option
            v-for="item in room.data"
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
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import GradeTarget from "~/api/apis/grade";
import RoomTarget from "~/api/apis/room";
import Storage from "@service/storage/storage";
import { SpiAxios } from "@service/spi/spi";
import { list, room, getRoomList} from './grade'
const dialogFormVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const form = reactive({
  name: "",
  level: "",
  week: "",
  time: "",
  room: {},
  teacher: {},
});
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入教室名称", trigger: "blur" }],
  level: [{ required: true, message: "请输入年龄段", trigger: "blur" }],
  week: [{ required: true, message: "请输入年龄段", trigger: "blur" }],
  time: [{ required: true, message: "请输入年龄段", trigger: "blur" }],
  teacher: [{ required: true, message: "请输入年龄段", trigger: "blur" }],
  room: [{ required: true, message: "请输入年龄段", trigger: "blur" }],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      SpiAxios.create(GradeTarget.insert(form))
        .http()
        .then((data) => {
          ElMessage.success("添加成功");
          list.data.push(data);
          formEl.resetFields();
        })
        .catch((err) => {
          ElMessage.error(err.msg);
          console.log(err);
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const deleteById = (id: number) => {
  SpiAxios.create(GradeTarget.deleteById({ id: id }))
    .http()
    .then((data) => {
      ElMessage.success("删除成功");
    })
    .catch((err) => {
      console.log(err);
    });
};
getRoomList();
</script>
<style lang="scss">
.grade-container {
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
  }
}

.ep-dialog {
  .ep-dialog__footer {
    text-align: center;
  }
  .grade-time {
    .ep-select {
      margin-right: 20px;
    }
  }
}
</style>