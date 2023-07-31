//进行axios二次封装:使用请求与响应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
});
//添加请求与响应拦截器
request.interceptors.request.use((config) => {
  //获取仓库内部token,登录成功以后携带给服务器
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  //config配置对象,headers属性请求头,经常给服务器端携带公共参数
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message = "";
    //http状态码

    const status = error.code;

    switch (status) {
      case 401:
        message = "TOKEN过期";
        break;
      case 403:
        message = "无权访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器出现问题";
        break;
      default:
        message = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      message,
    });
    //響應Promise(物件)終結Promise
    return Promise.reject(error);
  }
);

export default request;
