<script setup lang="ts">
import DefineProps from 'com/DefineProps.vue'
import DefineEmits from 'com/DefineEmits.vue'
import SlotsAttrs from 'com/SlotsAttrs.vue'
import VuexDemo from 'com/VuexDemo.vue'
// import ElementDemo from 'com/ElementDemo.vue'

const parentClick = (msg:string) => {
  console.log("父组件收到的信息==",msg)
}
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <DefineProps msg="DefineProps" :ageList='[18,26,35,86]'/>
  <DefineEmits @parentClick="parentClick" />
  <SlotsAttrs >
    <template #header>
      <h1>这是父组件APP。vue</h1>
    </template>

  </SlotsAttrs> -->
<RouterView></RouterView>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
<style>
ul,li{
  list-style: none;
}
</style>
