<!--  -->
<template>
  <div>
    <div>Goods</div>
    <div>
      <el-button v-btn="'system:goods:goodsInfo:add'" @click="changeLang">{{
        $t('menus.wIndex')
      }}</el-button>
      <el-button v-btn="'system:goods:goodsInfo:update'">更新按钮</el-button>
      <el-button v-btn="'system:goods:goodsInfo:update'">删除按钮</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const changeLang = () => {
  alert(t('menus.wIndex'));
};

onMounted(() => {
  console.log('test');
});
</script>
<style lang="scss" scoped></style>
