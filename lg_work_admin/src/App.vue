<template>
  <el-main>
    <router-view />
  </el-main>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}
.ep-menu--vertical {
  height: calc(100vh - 56px);
}
.ep-main {
  background-color: #f0f2f5;
}
</style>
