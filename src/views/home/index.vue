<template>
  <div>
    <el-card style="margin-bottom: 5px">
      <div class="box">
        <img :src="userStore.avatar" alt="img" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
          <p class="subtitle">翔哥大平台</p>
        </div>
      </div>
    </el-card>
    <el-card>
      <div class="bottom">
        <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getTime } from "@/utils/time";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      color: grey;
      font-style: italic;
    }
  }
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
