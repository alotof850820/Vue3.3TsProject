<template>
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 單一route -->
    <template v-if="!item.children">
      <el-menu-item
        :index="item.path"
        v-if="!item.meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有一個child route -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        :index="item.children[0].path"
        v-if="!item.children[0].meta.hidden"
        @click="goRoute"
      >
        <el-icon>
          <component :is="item.children[0].meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有多個child route(遞迴組件) -->
    <el-sub-menu
      :index="item.path"
      v-if="item.children && item.children.length > 1"
    >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <Menu :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
defineProps(["menuList"]);
const router = useRouter();

// e 為內建事件
const goRoute = (event: any) => {
  router.push(event.index);
};
</script>

<script lang="ts">
// for 遞迴使用
export default {
  name: "Menu",
};
</script>

<style lang="scss" scoped></style>
