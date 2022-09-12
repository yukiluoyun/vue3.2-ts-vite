<template>
  <div @click="onToggle">
    <img v-if="isFullscreen" src="../../../assets/images/notFull.png" alt="" />
    <img v-else src="../../../assets/images/isFull.png" alt="" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import screenfull from 'screenfull';

const isFullscreen = ref(false);

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};
// 功能有，但是图标不会变
const onToggle = () => {
  screenfull.toggle();
};
// 监听功能代码的改变，从而改变图标
onMounted(() => {
  screenfull.on('change', change);
});
</script>

<style scoped lang="scss">
img {
  width: 26px;
  height: 26px;
}
</style>
