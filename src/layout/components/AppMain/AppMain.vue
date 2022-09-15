<template>
  <!-- 多增加这个组件，是为了方便以后扩展不同类型的展示页面 -->
  <div>
    <router-view />

    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in" appear>
        <keep-alive :include="includeList">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const transitionName = ref('slide-left');
const includeList: Ref<string[]> = ref([]);

// 监控路由meta的index,index对比选择往左还是往右
watch(
  () => route.meta.index,
  (to, from) => {
    if (to && from) {
      transitionName.value = to < from ? 'slide-right' : 'slide-left';
    }
  }
);
watch(
  () => route,
  (newVal: any, oldVal: any) => {
    console.log('-----name=', newVal.name);
    console.log('-----keepAlive=', newVal.meta.keepAlive);
    console.log(
      '-----includeList.value.indexOf(newVal.name)=',
      includeList.value.indexOf(newVal.name)
    );
    if (
      newVal.name &&
      newVal.meta.keepAlive &&
      includeList.value.indexOf(newVal.name) === -1
    ) {
      includeList.value.push(newVal.name);
    }
    console.log(includeList.value);
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100vw;
  will-change: transform;
  transition: all 500ms;
  // position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
