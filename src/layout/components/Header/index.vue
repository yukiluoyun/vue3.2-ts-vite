<template>
  <div class="container">
    <el-row :gutter="24" style="display: flex; align-items: center">
      <el-col :span="19"> <BreadCrumb /></el-col>
      <el-col :span="1"> <ScreenFull /></el-col>
      <el-col :span="1"> <LanguageBar /></el-col>
      <el-col :span="3"> <UserBar /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from './BreadCrumb.vue';
import UserBar from './UserBar.vue';
import LanguageBar from './LanguageBar.vue';
import ScreenFull from './ScreenFull.vue';
import {} from 'vue';
</script>

<style lang="scss" scoped>
.container {
  flex: 1;
  .el-row {
    width: 100%;
  }
}
</style>
