<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="toHome">首頁</span>
    </div>
    <div class="center">
      <div class="title">智慧旅遊可視化大平台</div>
    </div>
    <div class="right">
      <span class="rbtn">統計報告</span>
      <span class="time">現在時間:{{ time }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import moment from "moment";
import { onMounted, onBeforeUnmount, ref } from "vue";

const router = useRouter();

const time = ref(moment().format("YYYY年MM月DD日 hh:mm:ss"));
const timer = ref(0);

const toHome = () => {
  router.push("/home");
};

onMounted(() => {
  setInterval(() => {
    time.value = moment().format("YYYY年MM月DD日 hh:mm:ss");
  }, 1000);
});
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1;
    background: url(../../images//dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn {
      width: 150px;
      height: 40px;
      float: right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
      font-size: 20px;
    }
  }
  .right {
    flex: 1.5;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn {
      width: 150px;
      height: 40px;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color: #29fcff;
    }
    .time {
      color: #29fcff;
      font-size: 20px;
    }
  }
  .center {
    flex: 2;
    .title {
      width: 100%;
      height: 74px;
      background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }
}
</style>
