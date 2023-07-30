<template>
  <el-button
    size="small"
    icon="Refresh"
    :circle="true"
    @click="reload"
  ></el-button>
  <el-button
    size="small"
    icon="FullScreen"
    :circle="true"
    @click="fullScreen"
  ></el-button>

  <el-popover placement="bottom" title="主題設計" :width="300" trigger="hover">
    <el-form>
      <el-form-item label="主題顏色">
        <el-color-picker
          v-model="color"
          size="small"
          show-alpha
          :predefine="predefineColors"
          @change="setColor"
        />
      </el-form-item>
      <el-form-item label="夜間模式">
        <el-switch
          v-model="dark"
          size="small"
          active-icon="MoonNight"
          inactive-icon="Sunny"
          class="mt-2"
          style-margin-left="24px"
          inline-prompt
          @change="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button
        size="small"
        icon="Setting"
        :circle="true"
        @click="true"
      ></el-button>
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="width: 24px; height: 24px; margin: 0px 10px; border-radius: 50%"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import useLayoutSetting from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";

const layoutSettingStore = useLayoutSetting();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

let dark = ref<boolean>(false);
const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

const reload = () => {
  layoutSettingStore.reload = !layoutSettingStore.reload;
};
const fullScreen = () => {
  // fullscreenElement可看是否為全頻(true / false)
  !document.fullscreenElement
    ? document.documentElement.requestFullscreen()
    : document.exitFullscreen();
};
const logout = async () => {
  await userStore.userLogout();
  // 登出在登入後可回到登出前的頁面
  router.push({ path: "/login", query: { redirect: route.path } });
};
const changeDark = () => {
  let html = document.documentElement;
  dark.value ? (html.className = "dark") : (html.className = "");
};
const setColor = () => {
  let html = document.documentElement;
  html.style.setProperty("--el-color-primary", color.value);
};
</script>

<script lang="ts">
// 在Vue開發工具可以顯示名子
export default {
  name: "Setting",
};
</script>

<style lang="scss" scoped></style>
