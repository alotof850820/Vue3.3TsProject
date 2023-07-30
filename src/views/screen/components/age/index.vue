<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
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
    tooltip: {
      trigger: "item",
    },
    legend: {
      right: 30,
      top: 40,
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outside",
          color: "#fff",
        },
        data: [
          { value: 1000, name: "1~10" },
          { value: 5000, name: "11~20" },
          { value: 10000, name: "20~30" },
          { value: 2500, name: "30~40" },
          { value: 1000, name: "40~50" },
          { value: 300, name: "50+" },
        ],
      },
    ],
  };
  mychart.setOption(option);
});
</script>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: white;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
