<template>
  <div>
    <h2>这是子组件，slot 的应用-main</h2>
    <slot name="header"></slot>
  </div>
</template>

<script setup lang='ts'>
import { useSlots, onMounted } from 'vue'

const slots = useSlots()

onMounted(() => {
    console.log(slots.header && slots.header())
  })
</script>
<style  lang='scss' scoped>
</style>
