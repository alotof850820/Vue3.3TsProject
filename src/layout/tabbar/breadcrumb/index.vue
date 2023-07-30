<template>
  <el-icon style="margin-right: 20px" @click="changeIcon">
    <component
      style="cursor: pointer"
      :is="layoutSetting.fold ? 'Expand' : 'Fold'"
    ></component>
  </el-icon>
  <!-- 麵包屑(點選單) -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 動態展示route with sidebar -->
    <el-breadcrumb-item
      v-for="(item, index) in route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <span style="margin: 0 5px"> {{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import useLayoutSetting from "@/store/modules/setting";
import { useRoute } from "vue-router";

const route = useRoute();

const layoutSetting = useLayoutSetting();

const changeIcon = () => {
  layoutSetting.fold = !layoutSetting.fold;
};
</script>

<script lang="ts">
// 在Vue開發工具可以顯示名子
export default {
  name: "麵包屑",
};
</script>

<style lang="scss" scoped></style>
