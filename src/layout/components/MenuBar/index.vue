<template>
  <el-menu
    default-active="1"
    active-text-color="#409eff"
    text-color="#fff"
    class="el-menu-wrap"
    :collapse="collapsed"
  >
    <MenuItem :menus="menus" />
  </el-menu>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import MenuItem from './MenuItem.vue';
import { useStore } from '@/store';
import { menuStore } from '@/pinia/menuStore';
const store = useStore();
defineProps({
  collapsed: {
    type: Boolean
  }
});

const useMenuStore = menuStore();
const menus = useMenuStore.getMenus;
// const menus = store.getters['menuStore/getMenus'];
console.log('menus==', menus);
</script>

<style lang="scss">
.el-menu-wrap {
  // width: 200px;
  min-height: 400px;
  height: 100vh;
  background-color: $menuBg;
  border: none;
}
.el-menu {
  background-color: $menuBg;
  .el-sub-menu {
    .el-menu-item {
      background-color: $subMenuBg;
    }
  }
}
</style>
