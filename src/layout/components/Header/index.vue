<template>
  <BreadCrumb />
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue';
import {} from 'vue';
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  :deep .el-row {
    height: 64px;
  }
}
</style>
