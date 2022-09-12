<template>
  <div
    ref="main"
    style="
      width: 100%;
      height: 815px;
      margin: 15px 0;
      border: 1px solid #333;
      box-shadow: 5px 5px 5px #888888;
    "
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';
import { chinaMap } from '@/assets/map/china';
import axios from 'axios';

const main = ref();
let data = ref([]);
onMounted(() => {
  initMap();
});

const initMap = async () => {
  await axios
    .get('https://c4156a34-94b2-4302-969f-e96f6277625a.bspapp.com/map')
    .then((res) => {
      data.value = res.data;
    });

  let myChart = echarts.init(main.value);
  echarts.registerMap('chianMap', chinaMap as any);
  let options = {
    title: {
      text: '门店城市销量排行',
      x: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    // 基础地图--数据地图用
    geo: {
      nameMap: '中国',
      map: 'chianMap',
      type: 'map',
      zoom: 1.2,
      itemStyle: {
        areaColor: '#009fcc',
        borderColor: '#0ffff',
        shadowColor: 'rgba(230,130,70,0.5)',
        shadowBlur: 30
      },
      emphasis: {
        focus: 'self', //每个地图本身模块
        areaColor: 'yellow',
        shadowBlur: 20,
        shadowColor: 'rgba(0,0,0,0.5)'
      }
    },
    // 直观数据 根据颜色排序：右下角可拖动的颜色区分竖条
    visualMap: {
      left: 'right',
      min: 100,
      max: 500,
      inRange: {
        color: [
          '#313695',
          '#4575b4',
          '#74add1',
          '#abd9e9',
          '#e0f3f8',
          '#ffffbf',
          '#fee090',
          '#fdae61',
          '#f46d43',
          '#d73027',
          '#a50026'
        ]
      },
      text: ['高销量', '低销量'],
      calculable: true //可拖拉显示相应区间散点的小工具设置为可用
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: data.value, //data.value 格式为对象行数组，对象格式为{name:'北京',value:[116.23,39.54,244]}
        encode: {
          value: 2 //取 对象型数组中，每个对象中的value 数组中的第三个维度，也就是244，这里的value不是固定的属性名，而是对应的变量名
        }
      }
    ]
  };
  myChart.setOption(options);
};
</script>

<style scoped></style>
