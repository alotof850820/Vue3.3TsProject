// SPU 管理 api
import type {
  SpuDataType,
  SpuResponseDataType,
  AllTrademarkDataType,
  SpuImgType,
  SpuSaleAttrResponseDataType,
  AllSpuSaleAttrResponseDataType,
  SkuDataType,
  SkuResponseDataType,
} from "./type";
import request from "@/utils/request";

enum API {
  HASSPU_URL = "/admin/product/",
  ALLSPUTRADEMARK_URL = "/admin/product/baseTrademark/getTrademarkList",
  SPUIMAGE_URL = "/admin/product/spuImageList/",
  SPUSALEATTR_URL = "/admin/product/spuSaleAttrList/",
  ALLSALEATTR_URL = "/admin/product/baseSaleAttrList",
  ADDSPU_URL = "/admin/product/saveSpuInfo",
  EDITSPU_URL = "/admin/product/updateSpuInfo",
  ADDSKU_URL = "/admin/product/saveSkuInfo",
  SKUINFO_URL = "/admin/product/findBySpuId/",
  REMOVESPU_URL = "/admin/product/deleteSpu/",
}

export const apiGetSPU = (
  page: number,
  limit: number,
  category3Id: number | string
) =>
  request.get<any, SpuResponseDataType>(
    API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`
  );
export const apiGetAllSpuTradeMark = () =>
  request.get<any, AllTrademarkDataType>(API.ALLSPUTRADEMARK_URL);
export const apiGetSpuImg = (spuId: number) =>
  request.get<any, SpuImgType>(API.SPUIMAGE_URL + spuId);
export const apiGetSpuAttr = (spuId: number) =>
  request.get<any, SpuSaleAttrResponseDataType>(API.SPUSALEATTR_URL + spuId);
export const apiGetAllSaleAttr = () =>
  request.get<any, AllSpuSaleAttrResponseDataType>(API.ALLSALEATTR_URL);
export const apiPostAddOrEditSpu = (data: SpuDataType) => {
  if (data.id) {
    return request.post<any, any>(API.EDITSPU_URL, data);
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data);
  }
};

export const apiPostAddSku = (data: SkuDataType) =>
  request.post<any, any>(API.ADDSKU_URL, data);
export const apiGetSkuInfo = (spuId: number | string) =>
  request.get<any, SkuResponseDataType>(API.SKUINFO_URL + spuId);
export const apiDeleteSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + spuId);
