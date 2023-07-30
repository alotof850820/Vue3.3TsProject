// menu type

// response data
export interface ResponseDataType {
  code: number;
  ok: boolean;
  msg: string;
}

// permission data
export interface PermissionDataType {
  id?: number;
  createTime: string;
  updateTime: string;
  pid: number;
  name: string;
  code: null;
  toCode: null;
  type: number;
  status: null;
  level: number;
  children?: PermissionListType;
  select: boolean;
}

// permission array
export type PermissionListType = PermissionDataType[];

// permission return type
export interface PermissionResDataType extends ResponseDataType {
  data: PermissionListType;
}

// add edit data
export interface MenuParamsType {
  id?: number;
  code: string;
  level: number;
  name: string;
  pid: number; //菜單ID
}
