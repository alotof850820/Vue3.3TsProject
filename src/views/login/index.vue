<template>
  <div class="login-container">
    <el-row>
      <!-- xs screen小於768px時 0就消失 -->
      <el-col :span="12" :xs="0">左</el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login-form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>helo</h1>
          <h2>welcome</h2>

          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login-btn"
              type="primary"
              size="default"
              @click="login"
              >Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time";

//拿用戶信息
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
//拿帳密
const loginForm = reactive({ username: "admin", password: "atguigu123" });
const loginForms = ref();
const loading = ref(false);

const login = async () => {
  //表單驗證後才能發請求(return promise)
  await loginForms.value.validate();

  loading.value = true;
  //req data 給pinia，成功後跳轉頁面，失敗回傳失敗信息
  try {
    await userStore.userLogin(loginForm);
    const redirect: any = route.query.redirect;
    // 登出在登入後可回到登出前的頁面
    router.push({ path: redirect || "/" });
    ElNotification({
      type: "success",
      message: "welcome back",
      title: `Hi,${getTime()}`,
    });

    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    ElNotification({ type: "error", message: error.message });
  }
};
const validatorUserName = (rule: any, value: any, callback: any) => {
  rule;
  if (value.length >= 5) {
    callback();
  } else {
    callback(new Error("帳號長度至少4位小於10位"));
  }
};
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback();
  } else {
    callback(new Error("密码長度至少六位"));
  }
};
const rules = {
  //自訂義驗證帳密(參考element)
  username: [
    {
      trigger: "change",
      validator: validatorUserName,
    },
  ],
  password: [
    {
      trigger: "change",
      validator: validatorPassword,
    },
  ],
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;
}
.login-form {
  width: 80%;
  top: 30vh;
  position: relative;
  background: url("@/assets/images/login_form.png") no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
