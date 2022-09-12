<template>
  <div class="lange">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img src="../../../assets/images/lang.png" alt="" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :disabled="chs" @click="toLang('chs')"
            >中文</el-dropdown-item
          >
          <el-dropdown-item :disabled="!chs" @click="toLang('en')"
            >英文</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core';
import { useI18n } from 'vue-i18n';
const i18n = useI18n();
const chs = computed(() => {
  return i18n.locale.value === 'chs' ? true : false;
});
const toLang = (lang: string) => {
  i18n.locale.value = lang;
};
</script>

<style scoped lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.lange {
  display: flex;
  padding-right: 15px;
}
.el-dropdown {
  img {
    width: 30px;
    height: 30px;
  }
}
.primary {
  color: rgb(64, 158, 255) !important;
}
</style>
