<template>
  <div class="box7">
    <div class="title">
      <p>年度遊客量對比</p>
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
  mychart.setOption({
    xAxis: {
      type: "category",
      show: true,
      data: [
        {
          value: "花蓮",
          textStyle: {
            fontSize: 30,
          },
        },
        {
          value: "台中",
          textStyle: {
            fontSize: 30,
          },
        },
        {
          value: "台北",
          textStyle: {
            fontSize: 30,
            color: "red",
          },
        },
        {
          value: "高雄",
          textStyle: {
            fontSize: 30,
          },
        },
        {
          value: "新竹",
          textStyle: {
            fontSize: 30,
          },
        },
        {
          value: "宜蘭",
          textStyle: {
            fontSize: 30,
          },
        },
        {
          value: "澎湖",
          textStyle: {
            fontSize: 30,
          },
        },
      ],
      axisLine: {
        show: true,
        lineStyle: {
          color: "white",
        },
      },
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 20,
      top: 20,
      right: 0,
      bottom: 50,
    },
    series: {
      type: "line",
      data: [830, 880, 2340, 513, 1231, 674, 305],
      symbol: "diamond",
      symbolSize: 16,
      label: {
        show: true,
        position: "top",
        color: "red",
      },
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "red",
            },
            {
              offset: 1,
              color: "blue",
            },
          ],
          global: false,
        },
      },
    },
  });
});
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
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
