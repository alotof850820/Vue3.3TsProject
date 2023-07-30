// role api type

export interface ResponseDataType {
  code: number;
  message: string;
  ok: boolean;
}

// role data
export interface RoleDataType {
  id?: number;
  createTime?: string;
  updateTime?: string;
  remark?: null;
  roleName?: string;
}

// role array
export type Records = RoleDataType[];

// role return type
export interface RoleResponseDataType extends ResponseDataType {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    pages: number;
    searchCount: boolean;
  };
}

// permission data
export interface PermissionDataType {
  id?: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: string;
  toCode: string;
  type: number;
  status: null;
  level: number;
  children?: MenuListType[];
  select: boolean;
}

// permission array
export type MenuListType = PermissionDataType[];

// permission return type
export interface PermissionResDataType extends ResponseDataType {
  data: MenuListType;
}
