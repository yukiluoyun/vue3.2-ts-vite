<template>
  <template v-for="menu in menus" :key="menu.path">
    <el-sub-menu
      v-if="menu.children && menu.children.length > 1"
      :index="menu.path"
    >
      <template #title>
        <el-icon> <component :is="menu.meta.icon"></component></el-icon>
        <span> {{ menu.meta.title }}</span>
      </template>
      <!-- 递归调用，当前组件可以直接调用自己，不用先导入再引用 -->
      <menu-item :menus="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else @click="toPath(menu.name)" :index="menu.path">
      <el-icon> <component :is="menu.meta.icon"></component></el-icon>
      <span> {{ menu.meta.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps(['menus']);

const router = useRouter();
const toPath = (menuName: string) => {
  router.push({ name: menuName });
};
</script>

<style lang="scss" scoped></style>
