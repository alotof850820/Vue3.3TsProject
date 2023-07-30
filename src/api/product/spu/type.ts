// server return allDatatype
export interface ResponseDataType {
  code: number;
  message: string;
  ok: boolean;
}

// SPU data
export interface SpuDataType {
  category3Id: number | string;
  id?: number;
  spuName: string;
  tmId: number | string;
  description: string;
  spuImageList: null | ImgType[];
  spuSaleAttrList: null | SaleAttr[];
}

// SPU array
export type Records = SpuDataType[];

// SPU return data
export interface SpuResponseDataType extends ResponseDataType {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}

// TrademarkDataType
export interface TrademarkDataType {
  id: number;
  tmName: string;
  logoUrl: string;
}
//  alltrademark return data
export interface AllTrademarkDataType extends ResponseDataType {
  data: TrademarkDataType[];
}

// img  data
export interface ImgType {
  id: number;
  name?: string;
  url?: string;
  imgUrl?: string;
  imgName?: string;
  createTime?: string;
  updateTime?: string;
  spuId?: number;
}

// img return data
export interface SpuImgType extends ResponseDataType {
  data: ImgType[];
}

// SaleAttrValueType
export interface SaleAttrValueType {
  id?: number; //add edit
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrValueName: string;
  saleAttrName?: string;
  isChecked?: null;
}

//SaleAttrValue array
export type SaleAttrValueListType = SaleAttrValueType[];

// SaleAttr type
export interface SaleAttr {
  id?: number;
  createTime?: null;
  updateTime?: null;
  spuId?: number;
  baseSaleAttrId: number | string;
  saleAttrName: string;
  spuSaleAttrValueList: SaleAttrValueListType;
  flag?: boolean;
  saleAttrValue?: string;
}
// spuSaleAttr return data
export interface SpuSaleAttrResponseDataType extends ResponseDataType {
  data: SaleAttr[];
}

// allSPU saleAttr
export interface AllSpuSaleAttr {
  id: number;
  name: string;
}

// allSpuSaleAttr return data
export interface AllSpuSaleAttrResponseDataType extends ResponseDataType {
  data: AllSpuSaleAttr[];
}

// sku attrValue
export interface SkuAttrValueType {
  attrId: number | string;
  valueId: number | string;
}
// sku saleAttrValue
export interface SkuSaleAttrValueType {
  saleAttrId: number | string;
  saleAttrValueId: number | string;
}
// sku data
export interface SkuDataType {
  category3Id: number | string;
  spuId: number | string;
  tmId: number | string;
  skuName: string;
  price: number | string;
  weight: number | string;
  skuDesc: string;
  skuAttrValueList?: SkuAttrValueType[];
  skuSaleAttrValueList?: SkuSaleAttrValueType[];
  skuDefaultImg: string;
}
// sku return data
export interface SkuResponseDataType extends ResponseDataType {
  data: SkuDataType[];
}
