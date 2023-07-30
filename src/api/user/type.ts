// //定义用户相关数据的ts类型
// //用户登录接口携带参数的ts类型
export interface loginFormType {
  username: string;
  password: string;
}

//定义全部接口返回数据都拥有ts类型
export interface responseDataType {
  code: number;
  message: string;
  ok: boolean;
}

//定义登录接口返回数据类型
export interface loginResponseDataType extends responseDataType {
  data: string;
}

//定义server return 获取用户信息返回数据类型
export interface userInfoResponseDataType extends responseDataType {
  data: {
    // array中放字串
    routes: string[];
    buttons: string[];
    roles: string[];
    name: string;
    avatar: string;
  };
}
