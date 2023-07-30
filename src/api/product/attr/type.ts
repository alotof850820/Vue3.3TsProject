// 商品分類api type

// api return OBJ
export interface responseDataType {
  code: number;
  message: string;
  ok: boolean;
}
// 分類物件 OBJ
export interface categoryObjType {
  id: number | string;
  name: string;
  category1Id?: number;
  category2Id?: number;
}
// api return分類 Array
export interface categoryResponseDataType extends responseDataType {
  data: categoryObjType[];
}

// 屬性值 OBJ
export interface AttrValueType {
  // 新增修改用有無id判斷
  id?: number;
  valueName: string;
  attrId?: number;
  flag?: boolean; //編輯觀看轉換
}
// 屬性值 Array
export type AttrValueList = AttrValueType[];
// 屬性OBJ
export interface AttrObjType {
  id?: number;
  attrName: string;
  categoryId: number | string;
  categoryLevel: number;
  attrValueList: AttrValueList;
}
// 屬性 Array
export type AttrObjList = AttrObjType[];
// api return屬性 Array
export interface AttrResponseDataType extends responseDataType {
  data: AttrObjType[];
}
