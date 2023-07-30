<!-- 自訂svg框架 -->
<template>
  <!-- svg:外部容器  use:內部結合使用-->
  <svg :style="{ width: width, height: height }">
    <!-- xlink href執行用哪個svg 屬性一定是 #icon- +名子-->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>
<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: "",
  },
  //svg宽度
  width: {
    type: String,
    default: "16px",
  },
  //svg高度
  height: {
    type: String,
    default: "16px",
  },
});
</script>
<style scoped ls="scss"></style>
