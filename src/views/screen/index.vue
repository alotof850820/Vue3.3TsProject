<template>
  <div class="container">
    <!-- main screen -->
    <div class="screen" ref="screen">
      <!-- top -->
      <div class="top">
        <TopScreen />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourist" />
          <Sex class="sex" />
          <Age class="age" />
        </div>
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Counter class="count"></Counter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import TopScreen from "./components/top/index.vue";
import Tourist from "./components/tourist/index.vue";
import Sex from "./components/sex/index.vue";
import Age from "./components/age/index.vue";
import Map from "./components/map/index.vue";
import Line from "./components/line/index.vue";
import Rank from "./components/rank/index.vue";
import Year from "./components/year/index.vue";
import Counter from "./components/counter/index.vue";

// get DOM 元素
const screen = ref<any>();

const getScale = (w = 1920, h = 1080) => {
  const ww = innerWidth / w;
  const wh = innerHeight / h;
  return ww < wh ? ww : wh;
};

// watch view change
onresize = () => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};

onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
});
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 40px;
        .rank {
          flex: 1.5;
        }
        .year {
          flex: 1;
        }
        .count {
          flex: 1;
        }
      }
      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;
        .tourist {
          flex: 1.2;
        }
        .sex {
          flex: 1;
        }
        .age {
          flex: 1;
        }
      }
      .center {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        .map {
          flex: 4;
        }
        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
