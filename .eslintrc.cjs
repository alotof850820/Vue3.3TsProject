module.exports = {
  //環境配置
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  //規則繼承
  extends: [
    "eslint:recommended", //推荐的ESLint配置
    "plugin:@typescript-eslint/recommended", //推荐的TypeScript规则
    "plugin:vue/vue3-essential", //Vue 3的基本规则
    "plugin:prettier/recommended",
  ],
  //针对特定文件的配置覆盖
  overrides: [
    // {
    //   env: {
    //     node: true,
    //   },
    //   files: [".eslintrc.{js,cjs}"], //针对 .eslintrc.{js,cjs} 文件，并将其解析为 script 模式
    //   parserOptions: {
    //     sourceType: "script",
    //   },
    // },
  ],
  //指定了解析器(變數解析器等)
  //默認Esprima, 還有 Babel,ts解析器,
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser", //解析器
    sourceType: "module", //在ECMAScript 2015中,只能是 "script" 或 "module"
  },
  //需安裝 插件前餟可以省略
  plugins: ["@typescript-eslint", "vue"], //加载了一些 ESLint 插件，包括 "@typescript-eslint"（用于TypeScript规则）、"vue"（用于Vue相关规则）。

  //定义了一些检查规则和其对应的错误级别
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // indent: ["error", "tab"], //缩进使用 tab
    // "linebreak-style": ["error", "unix"], //换行符风格为 Unix
    // quotes: ["error", "double"], //引号使用双引号
    // semi: ["error", "always"], //分号使用分号

    // eslint（https://eslint.bootcss.com/docs/rules/）
    "no-var": "error", // 不用 var
    "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off", //console.log
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", //debugger
    "no-unexpected-multiline": "error", // 禁止空余的多行
    "no-useless-escape": "off", // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/semi": "off",

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
    "vue/no-mutating-props": "off", // 不允许组件 prop的改变
    "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
  },
};

//教學安裝插件(含其他config) npm i -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser eslint-plugin-prettier@alpha
