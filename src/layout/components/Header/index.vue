<template>
  <div class="header">
    <BreadCrumb />
    <UserBar />
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue';
import UserBar from './UserBar.vue';
import {} from 'vue';
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-content: center;
}
.el-header {
  display: flex;
  align-items: center;
  :deep .el-row {
    height: 64px;
  }
}
</style>
