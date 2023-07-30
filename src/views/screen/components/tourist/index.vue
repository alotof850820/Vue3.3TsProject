<template>
  <div class="box">
    <div class="top">
      <p class="title">現在遊客紀錄</p>
      <p class="bg"></p>
      <p class="right">可預約總數<span>123456789</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- echarts 圖 -->
    <div class="charts" ref="charts" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import "echarts-liquidfill";
import { ref, onMounted } from "vue";

const people = ref("1314520人");
const charts = ref();

onMounted(() => {
  const mycharts = echarts.init(charts.value);
  //set
  mycharts.setOption({
    series: {
      type: "liquidFill",
      data: [0.6, 0.4, 0.2],
      waveAnimation: true,
      animationDuration: 3,
      animationDurationUpdate: 1,
      radius: "90%",
      outline: {
        show: true,
        borderDistance: 8,
        itemStyle: {
          color: "skyblue",
          borderColor: "#294D99",
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: "rgba(0, 0, 0, 0.25)",
        },
      },
    },
  });
});
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top {
    margin-left: 20px;
    .title {
      color: white;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: white;
      font-size: 20px;
      span {
        color: yellowgreen;
      }
    }
  }
  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;
    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
