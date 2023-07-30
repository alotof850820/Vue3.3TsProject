// sku type

// response type
export interface ResponseDataType {
  code: number;
  message: string;
  ok: boolean;
}

// sku attrValue
export interface SkuAttrValueType {
  id?: number;
  attrId: number | string;
  valueId: number | string;
}
// sku saleAttrValue
export interface SkuSaleAttrValueType {
  id?: number;
  saleAttrId: number | string;
  saleAttrValueId: number | string;
}
// sku data
export interface SkuDataType {
  category3Id?: number | string;
  spuId?: number | string;
  tmId?: number | string;
  skuName?: string;
  price?: number | string;
  weight?: number | string;
  skuDesc?: string;
  skuAttrValueList?: SkuAttrValueType[];
  skuSaleAttrValueList?: SkuSaleAttrValueType[];
  skuDefaultImg?: string;
  isSale?: number;
  id?: number;
}
// sku return data
export interface SkuResponseDataType extends ResponseDataType {
  data: {
    records: SkuDataType[];
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    searchCount: boolean;
    pages: number;
  };
}

// skuInfo resoponse data
export interface SkuInfoResponseDataType extends ResponseDataType {
  data: SkuDataType;
}
