import type { RouteRecordRaw } from "vue-router";
import type { categoryObjType } from "@/api/product/attr/type";

//定义小仓库数据state类型
export interface UserStateType {
  token: string | null;
  menuRoutes: RouteRecordRaw[];
  username: string;
  avatar: string;
  buttons: string[];
}

// 倉庫state type
export interface categoryState {
  c1List: categoryObjType[];
  c1Id: number | string;
  c2List: categoryObjType[];
  c2Id: number | string;
  c3List: categoryObjType[];
  c3Id: number | string;
}
