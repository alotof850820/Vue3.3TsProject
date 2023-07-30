<template>
  <div class="box5">
    <div class="title">
      <p>遊客訪問趨勢圖</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="line"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

const line = ref();
onMounted(() => {
  const mycharts = echarts.init(line.value);
  mycharts.setOption({
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      axisLine: {
        show: true,
        lineStyle: {
          color: "white",
        },
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "white",
        },
      },
    },
    grid: {
      left: 40,
      top: 0,
      right: 20,
      bottom: 20,
    },
    series: [
      {
        type: "line",
        data: [120, 1240, 180, 2299, 321, 890, 1200],
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.6,
                color: "#b42b10",
              },
              {
                offset: 1,
                color: "#06920d",
              },
            ],
          },
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box5 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 0px 20px;

  .title {
    margin-left: 10px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
