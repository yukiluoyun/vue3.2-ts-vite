<template>
  <el-container class="layout">
    <el-aside :style="'width:' + autoWidth">
      <LogoBar :collapsed="collapsed" />
      <MenuBar :collapsed="collapsed" />
    </el-aside>
    <el-container>
      <el-header>
        <el-row>
          <!-- 侧边栏展开折叠 -->
          <el-icon @click="() => (collapsed = !collapsed)">
            <component :is="collapsed ? Expand : Fold" />
          </el-icon>
          <Header />
        </el-row>
      </el-header>
      <el-main>
        <TabBar />
        <AppMain />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import LogoBar from './components/LogoBar/index.vue';
import MenuBar from './components/MenuBar/index.vue';
import AppMain from './components/AppMain/AppMain.vue';
import Header from './components/Header/index.vue';
import TabBar from './components/TabBar/TabBar.vue';
import { Expand, Fold } from '@element-plus/icons-vue';
import { isMobile } from '../utils/isMobile';

const collapsed = ref<boolean>(false);

// 左侧菜单动态显示的宽度：展开与折叠时候
const autoWidth = computed(() => {
  if (collapsed.value && isMobile()) {
    return '0px';
  } else if (collapsed.value) {
    return '64px';
  } else {
    return '200px';
  }
});
</script>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  // background-color: #b3c0d1;
}
.el-aside {
  background-color: $menuBg;
  height: 100vh;
  overflow: hidden;
}
.el-header {
  background-color: #b3c0d1;
  .el-row {
    height: 64px;
    display: flex;
    align-items: center;
  }
}
.el-main {
  // background-color: #e9eef3;
  // color: var(--el-text-color-primary);
  // text-align: center;
  // line-height: 160px;
}
</style>
