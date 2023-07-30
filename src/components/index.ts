// export自訂義插件

import SvgIcon from "@/components/SvgIcon/index.vue";
import Pagination from "@/components/Pagination/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Category from "@/components/Category/index.vue";

//全局
const allGlobalComponents: any = { SvgIcon, Pagination, Category };
export default {
  // 插件一定是insatall
  install(app: any) {
    //註冊全部的全局組件
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
    //icon
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
