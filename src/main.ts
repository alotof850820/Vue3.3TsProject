import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
//@ts-ignore 忽略不然會抱錯無法打包
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// svg插件需要配置code
import "virtual:svg-icons-register";
import globalComponent from "@/components";
import "./styles/index.scss";
import router from "./router";
import store from "./store";
import permission from "@/permission";
// 夜間模式
import "element-plus/theme-chalk/dark/css-vars.css";
// 自定義
import { isHasButton } from "./directive/has";

const app = createApp(App);
// console.log(import.meta.env);//能夠連到開發、測試、生產環境配置

app.use(ElementPlus);
app.use(ElementPlus, {
  locale: zhCn, //國際化配置
});
app.use(globalComponent);
app.use(store);
app.use(router);
app.use(permission);
isHasButton(app);

app.mount("#app");
