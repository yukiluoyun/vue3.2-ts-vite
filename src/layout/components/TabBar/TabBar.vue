<template>
  <!-- openContextMenu  对一个的事件是右键点击鼠标 -->
  <el-tabs
    v-model="activeName"
    type="card"
    class="demo-tabs"
    editable
    @tab-click="handleClick"
    @tab-remove="removeTab"
    @contextmenu.prevent.navite="openContextMenu($event)"
  >
    <el-tab-pane
      v-for="(tab, index) in tabList"
      :key="tab.path"
      :label="tab.title"
      :name="tab.path"
    ></el-tab-pane>
  </el-tabs>

  <el-card
    class="box-card"
    v-show="showCloseAllVisible"
    :style="{ left: left + 'px', top: top + 'px' }"
  >
    <div class="text item" @click="closeAll">关闭所有</div>
    <div class="text item" @click="closeTabOther('left')">关闭左边</div>
    <div class="text item" @click="closeTabOther('right')">关闭右边</div>
    <div class="text item" @click="closeTabOther('other')">关闭其他</div>
  </el-card>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from '@/store/index';
import { useRoute, useRouter } from 'vue-router';
import { Itab } from '@/store/type';

const store = useStore();
const route = useRoute();
const router = useRouter();
const tabList = computed(() => {
  //不能使用state.tabList是因为要实时监听
  // return store.getters.getAddTab;
  return store.getters['tabStore/getAddTab'];
});

// import type { TabsPaneContext } from 'element-plus';

const activeName = ref('');

//路由一旦发生改变，则调用此方法
const addTab = () => {
  const { meta, path } = route;
  const tab: Itab = {
    path: path,
    title: meta.title as string
  };
  // store.commit('addTab', tab);
  store.commit('tabStore/addTab', tab);
};
// 刷新页面时，会触发beforeunload VUEX里的数据会丢失，需要保存到本地
// 上下文原理，不能放在watch 后，以防出现刷新后，tab排布与之前不一致的现象。
// 先刷新，判断是否已经有了此path，然后再走watch，里面判断有则不加，没有则加。不能反过来：先执行watch时，因为有add函数，会先添加，不会先判断，这样不行
// 刷新后，地址栏的路由不会变，但是内部的tabList 会变
const refresh = () => {
  window.addEventListener('beforeunload', () => {
    console.log('beforeunload');
    // sessionStorage 页面关闭时就清除，localstorage一直保存在本地
    sessionStorage.setItem('TABS_ROUTES', JSON.stringify(tabList.value));
  });
  let session = sessionStorage.getItem('TABS_ROUTES');
  if (session) {
    //如果存在，则将缓存在本地的数据加载到相应的系统运行里面，vuex,因为此数据都是在vuex里操作的
    let list = JSON.parse(session);
    list.forEach((item: Itab) => {
      store.commit('tabStore/addTab', item);
    });
  }
};
refresh();
watch(
  () => route.path,
  () => {
    activeName.value = route.path;
    addTab();
  },
  // immediate 是为了防止刷新页面时，路由并没有变化，不会引起当前的变化 activeName.value = route.path;，所有需要immediate
  { immediate: true }
);
const handleClick = (event: any) => {
  const path = event.props.name; // 对应的是 :name="tab.path"
  // 将当前点击的tab设置位当前路由索引
  // activeName.value = path; //这里只会改变tab组件对应的值，还是不会改变下面对应的路径;当前activeName又是根据路由动态获取的，所以可以不设置
  router.push({ path: path });
};
const removeTab = (targetPath: any) => {
  // 当删除的是当前路由时，下一个应该是后一个或者前一个设置位当前路径:这里只设置当前的显示，并没有对数据进行删除
  if (activeName.value === targetPath) {
    if (tabList.value.length === 1) {
      return alert('这已经是最后一页了。。。');
    }
    tabList.value.forEach((tab: Itab, index: number) => {
      console;
      if (tab.path === targetPath) {
        const nextTab = tabList.value[index + 1] || tabList.value[index - 1]; //后一个，如果已经是最后一个，则前一个
        if (nextTab) {
          activeName.value = nextTab.path;
        }
      }
    });
  }
  // 对数据进行删除
  store.commit('tabStore/closeTab', targetPath);
};

onMounted(() => {
  refresh(); //因为如果不放在mouted里面的话，意味着在created之前就调用，明显不合适，而且只能运行一次。放在mouted里，addEventLister能一直监听事件
});

let showCloseAllVisible = ref(false);
let left = ref('');
let top = ref('');
// 鼠标右键-关闭所有等
const openContextMenu = (e: any) => {
  let path = e.srcElement.id.split('-')[1];
  store.commit('tabStore/saveCurrentPath', path);
  showCloseAllVisible.value = true;
  left.value = e.clientX;
  top.value = e.clientY + 10;
};
// 鼠标右键关闭所有
const closeAll = () => {
  store.commit('tabStore/closeTabAll');

  showCloseAllVisible.value = false;
  router.push({ path: '/' });
};
// 鼠标右键关闭左、右、其他
const closeTabOther = (flag: string) => {
  store.commit('tabStore/closeTabOther', flag);
  showCloseAllVisible.value = false;
};

// 监听显示 是否关闭“所有及其他”框的显示与否，如果显示，在点击屏幕的其他地方就关闭掉
const closeModal = () => {
  return (showCloseAllVisible.value = false);
};
watch(
  () => showCloseAllVisible.value,
  () => {
    if (showCloseAllVisible.value) {
      window.addEventListener('click', closeModal);
    } else {
      // 如果弹窗本身就是关闭状态，为了避免影响页面其他点击，需要移除这个监听事件
      window.removeEventListener('click', closeModal);
    }
  }
);
</script>
<style lang="scss" scoped>
.box-card {
  position: fixed;
  display: inline-flex;
  :deep .el-card__body {
    padding: 0;
  }
  .item {
    padding: 3px 15px;
    &:hover {
      background: skyblue;
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>
