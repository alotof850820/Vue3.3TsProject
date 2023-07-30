//user type

// response Data
export interface ResponseDataType {
  code: number;
  message: string;
  ok: boolean;
}

// user info
export interface UserDataType {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
  roleName?: string;
  phone?: null;
  createTime?: string;
  updateTime?: string;
}

// userdata array
export type Records = UserDataType[];

// user return type
export interface UserResponseDataType extends ResponseDataType {
  data: {
    records: Records;
    total: number;
    size: number;
    current: number;
    searchCount: boolean;
    orders: [];
    optimizeCountSql: boolean;
    hitCount: boolean;
    countId: null;
    maxLimit: null;
    pages: number;
  };
}

// role data
export interface RoleDataType {
  id?: number;
  roleName: string;
  createTime?: string;
  updateTime?: string;
  remark: null;
}

// all role
export type AllRole = RoleDataType[];

// all role return type
export interface AllRoleResponseDataType extends ResponseDataType {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}

//set role
export interface SetRoleType {
  roleIdList: number[];
  userId: number;
}
