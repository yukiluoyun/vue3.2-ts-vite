<template>
  <div>
    defineProps-正常的--222
    <br>
    msg:{{msg}}
    <br>
    <ul>
      <li v-for="(item,index) in ageList">{{item}}</li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { } from 'vue'

// 没有默认值
// defineProps<{ msg?: string, ageList: Array<number> }>() //这里的string不能String



// 如果有默认值
const props = withDefaults(defineProps<{ msg?: string, ageList: Array<number> }>(), {
  msg: 'hello',
  ageList:()=>[1,2]
})
</script>
<style  lang='scss' scoped>
</style>
