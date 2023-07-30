// 商品分類 全局倉庫
import { defineStore } from "pinia";
import { apiGetC1, apiGetC2, apiGetC3 } from "@/api/product/attr/index";
import type { categoryResponseDataType } from "@/api/product/attr/type";
import type { categoryState } from "./types/type";

export const useCategoryStore = defineStore("Category", {
  state: (): categoryState => {
    return {
      c1List: [],
      c1Id: "",
      c2List: [],
      c2Id: "",
      c3List: [],
      c3Id: "",
    };
  },
  actions: {
    async getC1() {
      const res: categoryResponseDataType = await apiGetC1();
      if (res.code === 200) {
        this.c1List = res.data;
      }
    },
    async getC2() {
      const res: categoryResponseDataType = await apiGetC2(this.c1Id);
      if (res.code === 200) {
        this.c2List = res.data;
      }
    },
    async getC3() {
      const res: categoryResponseDataType = await apiGetC3(this.c2Id);
      if (res.code === 200) {
        this.c3List = res.data;
      }
    },
  },
  getters: {},
});
