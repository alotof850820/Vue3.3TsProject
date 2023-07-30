// https://vitejs.dev/config/
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
//引入svg需要用到插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
//mock插件提供方法
import { viteMockServe } from "vite-plugin-mock";
export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量(dev/prod/test)
  // process.cwd()為index.html的絕對路徑(load哪個環境的文件)
  let env = loadEnv(mode, process.cwd());
  return {
    publicPath: "https://gitee.com/jch1011/guiguzhenxuan",
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")], //放置位
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        localEnabled: command === "serve", //保证开发阶段可以使用mock接口
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //scss全局变量一个配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        //获取数据的server地址设置
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写(每個api前都有含api/)
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
