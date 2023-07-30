<template>
  <div class="box8">
    <div class="title">
      <p>遊客消费统计</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const charts = ref();

onMounted(() => {
  const mychart = echarts.init(charts.value);
  const option = {
    radar: {
      shape: "circle",
      indicator: [
        { name: "消费", max: 6500 },
        { name: "好感", max: 16000 },
        { name: "出行", max: 30000 },
        { name: "小吃", max: 38000 },
        { name: "爱好", max: 52000 },
        { name: "景点", max: 25000 },
      ],
      name: {
        textStyle: {
          fontSize: 15,
        },
      },
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "购物",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "吃饭",
          },
        ],
      },
    ],
  };
  mychart.setOption(option);
});
</script>

<style scoped lang="scss">
.box8 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;

  .title {
    p {
      color: white;
      font-size: 18px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
