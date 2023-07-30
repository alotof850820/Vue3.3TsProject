import { defineStore } from "pinia";
import { apiReqLogin, apiReqUserInfo, apiReqLogout } from "@/api/user";
import {
  loginFormType,
  loginResponseDataType,
  userInfoResponseDataType,
} from "@/api/user/type";
import { UserStateType } from "./types/type";
//引入本地存儲function
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入常量route
import { constantRoute, asnycRoute, anyRoute } from "@/router/routes";
import router from "@/router";
import { cloneDeep } from "lodash";

// 過濾route function
const filterAsyncRoute = (asnycRoute: any, routes: any) => {
  return asnycRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes);
      }
      return true;
    }
  });
};

const useUserStore = defineStore("User", {
  //存儲數據
  state: (): UserStateType => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //動態生成menu所需
      username: "",
      avatar: "",
      buttons: [],
    };
  },
  //處理異步或邏輯
  actions: {
    //req data 給後端成功回傳token
    async userLogin(loginData: loginFormType) {
      const res: loginResponseDataType = await apiReqLogin(loginData);
      //成功拿token 並存本地
      if (res.code === 200) {
        this.token = res.data;
        SET_TOKEN(res.data);
        return "ok";
      } else {
        return Promise.reject(new Error(res.data));
      }
    },
    async getUserInfo() {
      const res: userInfoResponseDataType = await apiReqUserInfo();

      if (res.code === 200) {
        this.username = res.data.name;
        this.avatar = res.data.avatar;
        this.buttons = res.data.buttons;

        // 過濾權限
        const userAsyncRoute = filterAsyncRoute(
          cloneDeep(asnycRoute),
          res.data.routes
        );
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute];
        // connect router
        [...userAsyncRoute, ...anyRoute].forEach((route: any) => {
          router.addRoute(route);
        });

        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
    async userLogout() {
      const res: any = await apiReqLogout();
      if (res.code === 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },
  },
});

export default useUserStore;
