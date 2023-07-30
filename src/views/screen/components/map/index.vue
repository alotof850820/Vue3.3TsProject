<template>
  <div ref="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import taiwan from "./taiwan.json";

const map = ref();
echarts.registerMap("taiwan", taiwan as any);
onMounted(() => {
  const mychart = echarts.init(map.value);
  mychart.setOption({
    geo: {
      map: "taiwan",
      roam: false,
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 100,
      label: {
        show: true,
        color: "white",
        fontSize: 20,
      },
      itemStyle: {
        color: {
          type: "linear",
          x: 1,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "blue",
            },
            {
              offset: 1,
              color: "red",
            },
          ],
          global: false,
        },
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          color: "#2f1e51",
        },
        label: {
          color: "#29fcff",
          fontSize: 40,
        },
      },
    },
    series: [
      {
        type: "lines",
        data: [
          {
            coords: [
              [121.5, 25.1],
              [121.4, 23.8],
            ],
            lineStyle: {
              color: "#cfc5c5",
              width: 3,
              curveness: 0.3,
            },
          },
          {
            coords: [
              [121.5, 25.1],
              [120.6105784820686, 22.45538481728115],
            ],
            lineStyle: {
              color: "#cfc5c5",
              width: 3,
              curveness: 0.3,
            },
          },
          {
            coords: [
              [121.5, 25.1],
              [119.6, 23.55],
            ],
            lineStyle: {
              color: "#cfc5c5",
              width: 3,
              curveness: -0.3,
            },
          },
          {
            coords: [
              [121.4, 23.8],
              [119.6, 23.55],
            ],
            lineStyle: {
              color: "#cfc5c5",
              width: 3,
              curveness: -0.3,
            },
          },
          {
            coords: [
              [119.6, 23.55],
              [120.6105784820686, 22.45538481728115],
            ],
            lineStyle: {
              color: "#cfc5c5",
              width: 3,
              curveness: -0.3,
            },
          },
          {
            coords: [
              [120.6105784820686, 22.45538481728115],
              [121.5, 25.1],
            ],
            lineStyle: {
              color: "#cfc5c5",
              width: 3,
              curveness: 0.3,
            },
          },
        ],
        effect: {
          show: true,
          symbol:
            "path://m24.794 16.522-.281-2.748-10.191-5.131s.091-1.742 0-4.31c-.109-1.68-.786-3.184-1.839-4.339l.005.006h-.182c-1.048 1.15-1.726 2.653-1.834 4.312l-.001.021c-.091 2.567 0 4.31 0 4.31l-10.19 5.131-.281 2.748 6.889-2.074 3.491-.582c-.02.361-.031.783-.031 1.208 0 2.051.266 4.041.764 5.935l-.036-.162-2.728 1.095v1.798l3.52-.8c.155.312.3.566.456.812l-.021-.035v.282c.032-.046.062-.096.093-.143.032.046.061.096.094.143v-.282c.135-.21.28-.464.412-.726l.023-.051 3.52.8v-1.798l-2.728-1.095c.463-1.733.728-3.723.728-5.774 0-.425-.011-.847-.034-1.266l.003.058 3.492.582 6.888 2.074z",
          color: "white",
          symbolSize: 30,
          period: 10,
          trailLength: false,
        },
      },
    ],
  });
});
</script>

<style scoped>
/* div {
  color: #cfc5c5;
} */
</style>
