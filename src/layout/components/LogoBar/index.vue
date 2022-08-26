<template>
  <div class="logo">
    <img src="@/assets/logo.png" alt="" />
    <p v-show="!collapsed">vue3+vite+ts</p>
  </div>
</template>

<script setup lang="ts">
import {} from 'vue';
defineProps({
  collapsed: {
    type: Boolean,
  },
});
</script>
<style lang="scss" scoped>
img {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  p {
    color: #fff;
    font-weight: bolder;
  }
}
</style>
