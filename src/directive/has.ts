import pinia from "@/store";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore(pinia);
export const isHasButton = (app: any) => {
  // 利用app中的directive自定義 v-has
  app.directive("has", {
    mounted(el: any, options: any) {
      // el 為使用v-has的DOM
      // options 為v-has的值
      //如果在用户信息buttons中没有
      //刪掉button
      if (!userStore.buttons.includes(options.value)) {
        el.parentNode.removeChild(el);
      }
    },
  });
};
