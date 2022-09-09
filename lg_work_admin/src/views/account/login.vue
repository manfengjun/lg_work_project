<template>
  <el-config-provider namespace="ep">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>登录</span>
        </div>
      </template>
      <el-input v-model="username" placeholder="请输入用户名" />
      <el-input
        v-model="password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
      <el-button type="warning" autocomplete="off" @click="login"
        >登录</el-button
      >
    </el-card>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ref, h } from "vue";
import AccountTarget from "~/api/apis/account";
import storage from "@service/storage/storage";
import { SpiAxios } from "@service/spi/spi";
import { ElMessage, ElNotification } from "element-plus";
import global from "~/core/global";

const username = ref("");
const password = ref("");
const login = () => {
  if (!username.value || username.value.length <= 0) {
    ElMessage({
      message: "请输入用户名",
      type: "warning",
    });
    return;
  }
  if (!password.value || password.value.length <= 0) {
    ElMessage({
      message: "请输入密码",
      type: "warning",
    });
    return;
  }
  let target = AccountTarget.login(username.value, password.value);
  SpiAxios.create(target)
    .http()
    .then((data) => {
      storage.set("token", data.token);
      storage.set("user", data);
      ElMessage({
        message: "登录成功，欢迎回来！",
        type: "success",
      });
      global.$router.push({
        path: "/center/center",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("object", target.headers);
};
</script>

<style lang="scss">
.ep-main {
  height: calc(100vh - 0px);
  background-color: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box-card {
  width: 25%;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #f2711c;
    }
  }
  .ep-input {
    margin: 0 0 20px 0;
    height: 40px;
  }
  .ep-button {
    width: 100%;
    height: 40px;
  }
  .text {
    font-size: 14px;
  }
}
</style>



