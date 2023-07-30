// layout組件相關配置倉庫
import { defineStore } from "pinia";
const useLayoutSetting = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false,
      reload: false,
    };
  },
});

export default useLayoutSetting;
