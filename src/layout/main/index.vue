<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- render layout 一級route的子route -->
      <component :is="Component" v-if="reload" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useLayoutSetting from "@/store/modules/setting";
import { watch, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

const layoutSettingStore = useLayoutSetting();
const router = useRouter();
const route = useRoute();

const reload = ref(true);

watch(
  () => layoutSettingStore.reload,

  () => {
    // 銷毀
    reload.value = false;
    //重創
    // 當響應是數據發生變化，可獲取發生後的數據
    nextTick(() => (reload.value = true));
  }
);
</script>

<script lang="ts">
// 在Vue開發工具可以顯示名子
export default {
  name: "Main",
};
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
