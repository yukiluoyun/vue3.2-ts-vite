<template>
  <!-- 多增加这个组件，是为了方便以后扩展不同类型的展示页面 -->
  <div>
    <router-view />

    <router-view v-slot="{ Component }">
      <transition :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vue-router';
const transitionName = ref();
</script>

<style lang="scss" scoped>
.fade-transform-leave-active,
.fade-transform-enter-actvie {
  transition: all 0.4s;
}
.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
