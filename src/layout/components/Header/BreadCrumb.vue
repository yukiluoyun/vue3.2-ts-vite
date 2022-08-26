<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';
const route = useRoute();
const breadcrumbList: Ref<RouteLocationMatched[]> = ref([]);

const getBreachCrumbList = () => {
  // console.log('child==', route.matched.children);
  // 要有item.meta ，item.meta.title会用到，item.children.length !== 1 等于1只有登录，见F:\2022\vue3\51cto\vue3.2-vite\src\router\index copy.ts
  let list = route.matched.filter(
    (item) => item.meta && item.meta.title && item.children.length !== 1
  );
  const first = list[0]; //实际会有两条，

  if (route.path !== '/index') {
    list = [{ path: '/index', meta: { title: '首页' } } as any].concat(list); //如果是只有一级的菜单，在前面手动再加一个“首页",纯粹是为了样式上好看
  }
  breadcrumbList.value = list;
};
getBreachCrumbList();
watch(
  () => route.path,
  () => {
    getBreachCrumbList();
  }
);
</script>

<style lang="scss" scoped></style>
