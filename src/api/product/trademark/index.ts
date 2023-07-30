// 品牌管理api
import request from "@/utils/request";
import type { trademarkResponseDataType, trademarkDataType } from "./type";

enum API {
  GETTRADEMARK_URL = "/admin/product/baseTrademark/",
  ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
  EDITTRADEMARK_URL = "/admin/product/baseTrademark/update",
  DELETETRADEMARK_URL = "/admin/product/baseTrademark/remove/",
}

// 拿已有品牌
export const apiGetHasTrademark = (page: number, limit: number) =>
  request.get<any, trademarkResponseDataType>(
    API.GETTRADEMARK_URL + `${page}/${limit}`
  );

// 新增與修改
export const apiAddOrEditTrademark = (data: trademarkDataType) => {
  // 無return data 不用定type
  if (data.id) {
    return request.put<any, any>(API.EDITTRADEMARK_URL, data);
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data);
  }
};

// 刪除品牌
export const apiDeleteTrademark = (id: number) =>
  request.delete<any, any>(API.DELETETRADEMARK_URL + id);
