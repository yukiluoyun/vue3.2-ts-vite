<template>
  <div class="user">
    <el-dropdown>
      <span class="el-dropdown-link">
        <img :src="userInfo.avatar" alt="" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-row>
      <el-col>
        <span>{{ userInfo.username }}</span>
        <span>{{ userInfo.roleName }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown } from '@element-plus/icons-vue';
import { computed } from 'vue';
import { useStore } from '@/store';
const store = useStore();
const userInfo = computed(() => {
  return store.state.authStore.userInfo;
});
const logout = () => {
  store.dispatch('authStore/logout');
  location.reload(); //页面重新加载，去识别token
};
</script>
<style scoped lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.user {
  display: flex;
}
.el-dropdown {
  img {
    width: 30px;
    height: 30px;
  }
}
</style>
