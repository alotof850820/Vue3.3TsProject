<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一級分类">
        <el-select
          v-model="categoryStore.c1Id"
          @change="handlerC1"
          :disabled="showModal"
        >
          <el-option
            v-for="c1 in categoryStore.c1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二級分類">
        <el-select
          v-model="categoryStore.c2Id"
          @change="handlerC2"
          :disabled="showModal"
        >
          <el-option
            v-for="c2 in categoryStore.c2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三級分類">
        <el-select
          v-model="categoryStore.c3Id"
          @change="handlerC3"
          :disabled="showModal"
        >
          <el-option
            v-for="c3 in categoryStore.c3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/store/modules/category";
import { onMounted } from "vue";

const categoryStore = useCategoryStore();
defineProps(["showModal"]);

const getC1 = () => {
  categoryStore.getC1();
};
const handlerC1 = () => {
  categoryStore.getC2();
  categoryStore.c2Id = "";
  categoryStore.c3Id = "";
};
const handlerC2 = () => {
  categoryStore.getC3();
  categoryStore.c3Id = "";
};
const handlerC3 = () => {};

onMounted(() => getC1());
</script>

<style lang="scss" scoped></style>
