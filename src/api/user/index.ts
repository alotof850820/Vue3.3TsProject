// //统一管理咱们项目用户相关的接口
import request from "@/utils/request";
import {
  loginFormType,
  loginResponseDataType,
  userInfoResponseDataType,
} from "./type";
// 使用真後端接口
// user相關api地址
enum API {
  LOGIN_URL = "/admin/acl/index/login",
  USERINFO_URL = "/admin/acl/index/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

// login
export const apiReqLogin = (data: loginFormType) =>
  request.post<any, loginResponseDataType>(API.LOGIN_URL, data);
// get user info
export const apiReqUserInfo = () =>
  request.get<any, userInfoResponseDataType>(API.USERINFO_URL);
// logout
export const apiReqLogout = () => request.post<any, any>(API.LOGOUT_URL);

// import request from "@/utils/request";
// import type {
//   loginFormType,
//   loginResponseType,
//   userInfoReponseType,
// } from "./type";
// // 統一管理接口
// //项目用户相关的请求地址
// enum API {
//   LOGIN_URL = "/user/login",
//   USERINFO_URL = "/user/info",
// }

// //api(ts)
// //登录接口
// export const apiReqLogin = (data: loginFormType) =>
//   request.post<any, loginResponseType>(API.LOGIN_URL, data);
// //获取用户信息
// export const apiReqUserInfo = () =>
//   request.get<any, userInfoReponseType>(API.USERINFO_URL);
