<template>
  <div class="layout-container">
    <!--left side bar -->
    <div class="layout-sideBar">
      <SideBarLogo />
      <el-scrollbar class="scrollbar-demo-item">
        <!-- 菜單 -->
        <el-menu
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
          :default-active="route.path"
          :collapse="layoutSetting.fold"
        >
          <!-- 根據route動態更新menu -->
          <Menu :menuList="userStore.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- top bar -->
    <div class="layout-topBar" :class="{ fold: layoutSetting.fold }">
      <TopBar />
    </div>
    <!-- main content -->
    <div class="layout-main-content" :class="{ fold: layoutSetting.fold }">
      <!-- 封裝 -->
      <Main />
    </div>
  </div>
</template>
<script setup lang="ts">
import SideBarLogo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import TopBar from "./tabbar/index.vue";
import useUserStore from "@/store/modules/user";
import useLayoutSetting from "@/store/modules/setting";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const layoutSetting = useLayoutSetting();
const route = useRoute();
</script>

<script lang="ts">
// 在Vue開發工具可以顯示名子
export default {
  name: "Layout",
};
</script>
<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;

  .layout-sideBar {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.3s;

    .scrollbar-demo-item {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }

    &.fold {
      width: $base-menu-min-width;
    }
  }
  .layout-topBar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout-main-content {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: white;
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100% - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
