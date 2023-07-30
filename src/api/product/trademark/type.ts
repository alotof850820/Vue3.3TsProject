// 品牌管理api type
export interface responseDataType {
  code: number;
  message: string;
  ok: boolean;
}

// 已有品牌type
export interface trademarkDataType {
  // 可能是新增或已有品牌
  id?: number;
  tmName: string;
  logoUrl: string;
}

// 含全部品牌type
export type allTrademarkDataType = trademarkDataType[];

// get已有全部品牌type
export interface trademarkResponseDataType extends responseDataType {
  data: {
    records: allTrademarkDataType;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    pages: number;
  };
}
