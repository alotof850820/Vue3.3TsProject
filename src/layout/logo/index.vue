<template>
  <div class="logo" v-if="logoTitleSetting.logoHidden">
    <img :src="logoTitleSetting.logo" alt="" />
    <p>{{ logoTitleSetting.title }}</p>
  </div>
</template>
<script setup lang="ts">
import logoTitleSetting from "@/logoTitleSetting";
</script>

<script lang="ts">
// 在Vue開發工具可以顯示名子
export default {
  name: "Logo",
};
</script>
<style lang="scss" scoped>
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  color: white;
  align-items: center;
  padding: 10px;
  img {
    height: 40px;
  }
  p {
    font-size: $base-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
