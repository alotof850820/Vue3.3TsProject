<template>
  <div class="topbar">
    <div class="topbar-left">
      <Breadcrumb />
    </div>
    <div class="topbar-right">
      <Setting />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
</script>

<script lang="ts">
// 在Vue開發工具可以顯示名子
export default {
  name: "TopBar",
};
</script>

<style lang="scss" scoped>
.topbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(232, 223, 233),
    rgb(201, 178, 178),
    rgb(197, 165, 165)
  );

  .topbar-left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .topbar-right {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
