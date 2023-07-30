<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" />
    <button @click="goHome">回首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goHome = () => {
  router.push("/home");
};
</script>

<style scoped lang="scss">
.box {
  width: 100vw;
  height: 100vh;
  background: yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 600px;
    height: 500px;
  }
  button {
    width: 100px;
    height: 50px;
  }
}
</style>
