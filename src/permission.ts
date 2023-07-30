// router 權限守衛
import router from "./router";
// 進度條插件 nprogress 並引入樣式
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "./store/modules/user";
import pinia from "./store";
import logoTitleSetting from "./logoTitleSetting";

// 拿小倉庫前先引入大倉庫
const userStore = useUserStore(pinia);
nprogress.configure({ showSpinner: false });

// 用token判斷是否登入
// 全局前置守衛
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start();
  document.title = `${logoTitleSetting.title}--${to.meta.title}`;
  if (userStore.token) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      if (userStore.username) {
        next();
      } else {
        try {
          // 拿userData tobbar的數據才會呈現
          await userStore.getUserInfo();

          // 這邊要考慮到是否是異步頁面，位家載完可能會白平
          // 有參數後再跳轉!!!
          next({ ...to });
        } catch (error) {
          // token 過期或失效
          // 先登出(清空userData)
          await userStore.userLogout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      // 曾經想去頁面但沒成功，後登入成功後跳轉到該頁面
      next({ path: "/login", qurey: { redirect: to.path } });
    }
  }
});

// 全局後置守衛
router.afterEach((to: any, from: any) => {
  nprogress.done();
});

export default router;
