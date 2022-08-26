<template>
  <div>
    <button @click="childClick">子传父</button>
  </div>
</template>

<script setup lang='ts'>
import { } from 'vue'

// 简单的传值
// const emits = defineEmits(['parentClick'])
// const childClick = () => {
//     emits('parentClick','子传父点击')
// }

// 可配置的传值方式
const emits = defineEmits<{(e:'parentClick',data:string):void}>()
const childClick = () => {
    emits('parentClick','子传父点击')
}
</script>
<style  lang='scss' scoped>
</style>
