<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div style="display: flex">
      <BaseSide />
      <el-main>
        <router-view />
      </el-main>
    </div>
  </el-config-provider>
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
  padding: 0;
}
</style>
