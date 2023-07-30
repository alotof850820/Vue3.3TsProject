<template>
  <div class="box6">
    <div class="title">
      <p>熱門地區排行</p>
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
            color: "red",
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
      bottom: 50,
      right: 20,
    },
    series: [
      {
        type: "bar",
        data: [70, 50, 80, 40, 50, 60, 90],
        label: {
          show: true,
          position: "top",
          color: "yellowgreen",
          fontSize: 30,
        },
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: function (data: any) {
            let arr = [
              "red",
              "orange",
              "yellowgreen",
              "green",
              "purple",
              "hotpink",
              "skyblue",
            ];
            return arr[data.dataIndex];
          },
        },
      },
    ],
    tooltip: {
      backgroundColor: "rgba(50,50,50,0.7)",
    },
  });
});
</script>

<style scoped lang="scss">
.box6 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;

  .title {
    margin-left: 5px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: calc(100% - 30px);
  }
}
</style>
