// sku api
import request from "@/utils/request";
import type { SkuResponseDataType, SkuInfoResponseDataType } from "./type";

enum API {
  SKU_URL = "/admin/product/list/",
  CANCELSALESKU_URL = "/admin/product/cancelSale/",
  ONSALESKU_URL = "/admin/product/onSale/",
  GETSKUINFO_URL = "/admin/product/getSkuInfo/",
  REMOVESKU_URL = "/admin/product/deleteSku/",
}

export const apiGetSku = (page: number, limit: number) =>
  request.get<any, SkuResponseDataType>(API.SKU_URL + `${page}/${limit}`);
export const apiGetCancelSaleSku = (skuId: number | string) =>
  request.get<any, any>(API.CANCELSALESKU_URL + skuId);
export const apiGetOnSaleSku = (skuId: number | string) =>
  request.get<any, any>(API.ONSALESKU_URL + skuId);
export const apiGetSkuInfo = (skuId: number | string) =>
  request.get<any, SkuInfoResponseDataType>(API.GETSKUINFO_URL + skuId);
export const apiRemoveSku = (skuId: number | string) =>
  request.delete<any, any>(API.REMOVESKU_URL + skuId);
