// 商品分類api
import request from "@/utils/request";
import type {
  categoryResponseDataType,
  AttrResponseDataType,
  AttrObjType,
} from "@/api/product/attr/type";

enum API {
  C1_URL = "/admin/product/getCategory1",
  C2_URL = "/admin/product/getCategory2/",
  C3_URL = "/admin/product/getCategory3/",
  ATTR_URL = "/admin/product/attrInfoList/",
  ADDOREDITATTR_URL = "/admin/product/saveAttrInfo",
  DELETEATTR_URL = "/admin/product/deleteAttr/",
}

export const apiGetC1 = () =>
  request.get<any, categoryResponseDataType>(API.C1_URL);
export const apiGetC2 = (category1Id: number | string) =>
  request.get<any, categoryResponseDataType>(API.C2_URL + category1Id);
export const apiGetC3 = (category2Id: number | string) =>
  request.get<any, categoryResponseDataType>(API.C3_URL + category2Id);
export const apiGetAttr = (
  category1Id: number | string,
  category2Id: number | string,
  category3Id: number | string
) =>
  request.get<any, AttrResponseDataType>(
    API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`
  );
export const apiPostAddOrEditAttr = (data: AttrObjType) =>
  request.post<any, any>(API.ADDOREDITATTR_URL, data);
export const apiDeleteAttr = (attrId: number) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId);
