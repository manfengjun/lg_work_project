<template>
  <div class="room-container">
    <el-container>
      <el-header>
        <span>教室管理</span>
        <el-button
          :bg="true"
          type="primary"
          :icon="Plus"
          @click="
            option_status = 0;
            dialogFormVisible = true;
          "
          >新增</el-button
        >
      </el-header>
      <el-main>
        <el-table :stripe="true" :data="list.data">
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="name" label="教室名称" width="180" />
          <el-table-column prop="level" label="年龄段" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="edit(list.data[scope.$index])"
                >编辑</el-button
              >
              <el-popconfirm
                confirm-button-text="确认"
                cancel-button-text="取消"
                icon-color="#626AEF"
                title="您确认要删除吗?"
                @confirm="deleteById(list.data[scope.$index].id)"
              >
                <template #reference>
                  <el-button link type="primary" size="small">删除</el-button>
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
    width="25%"
  >
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="left"
    >
      <el-form-item label="教室名称" label-width="80px" prop="name">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="年龄段" label-width="80px" prop="level">
        <el-input v-model="form.level" autocomplete="off" />
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
import { Plus, SetUp, User } from "@element-plus/icons-vue";
import RoomTarget from "~/api/apis/room";
import { SpiAxios } from "~/service/spi/spi";
import { dataType } from "element-plus/es/components/table-v2/src/common";
import { Room, option_status, list, getList, option, deleteById } from "./room";
const dialogFormVisible = ref(false);
const ruleFormRef = ref<FormInstance>();
const form = reactive<Room>(new Room());
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入教室名称", trigger: "blur" }],
  level: [
    {
      required: true,
      message: "请输入年龄段",
      trigger: "blur",
    },
  ],
});
const edit = (e: Room) => {
  form.id = e.id;
  form.name = e.name;
  form.level = e.level;
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
getList();
</script>
<style lang="scss">
.room-container {
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
}
</style>