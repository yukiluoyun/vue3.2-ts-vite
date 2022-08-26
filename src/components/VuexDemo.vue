<template>
  state里的数字：{{count}}
  <button @click="addNumber">点击累加数字-count</button>
</template>

<script setup lang='ts'>
import {computed} from "vue"
import {useStore } from "vuex"
const store = useStore()
const count = computed(() => {
  return store.state.count 
})

const addNumber = () => {
  store.commit("increment")
}

</script>
<style  lang='scss' scoped>
</style>
