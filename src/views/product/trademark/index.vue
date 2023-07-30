<template>
  <div>
    <el-card class="box-card">
      <!-- cardTop -->
      <el-button
        v-has="'btn.Trademark.add'"
        type="primary"
        icon="Plus"
        @click="addTrademark"
        >Add 品牌</el-button
      >
      <!-- table -->
      <el-table :data="trademarkList" border style="margin: 10px 0px">
        <el-table-column width="80px" align="center" type="index" />
        <el-table-column label="品牌名稱" align="center">
          <template #="{ row }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌Logo" align="center">
          <template #="{ row }">
            <img
              style="width: 100px; heigth: 100px"
              :src="row.logoUrl"
              alt="無圖片"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="品牌操作">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editTrademark(row)"
            ></el-button>
            <el-popconfirm
              :title="`確定刪除${row.tmName}嗎?`"
              width="250px"
              icon="Delete"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- page -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="getTrademark"
        :pager-count="9"
        v-model:current-page="pageNo"
        v-model:page-size="limitPages"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next,
    jumper ,->, sizes,total"
        :total="total"
      />
    </el-card>

    <!-- dialog -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        ref="formRef"
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
      >
        <el-form-item prop="tmName" label="品牌名稱" label-width="100px">
          <el-input
            v-model="trademarkParams.tmName"
            placeholder="輸入您的品牌名稱"
          ></el-input>
        </el-form-item>

        <el-form-item prop="logoUrl" label="品牌LOGO" label-width="100px">
          <!-- 上傳換成api地址 需要/api !!-->
          <!-- before-upload可限制上傳大小 -->
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="default" @click="cancel">取消</el-button>
        <el-button type="primary" @click="ok">確認</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  apiGetHasTrademark,
  apiAddOrEditTrademark,
  apiDeleteTrademark,
} from "@/api/product/trademark";
import { ElMessage, UploadProps } from "element-plus";
import type {
  allTrademarkDataType,
  trademarkResponseDataType,
  trademarkDataType,
} from "@/api/product/trademark/type";

const pageNo = ref<number>(1);
const limitPages = ref<number>(3);
const total = ref<number>(0);
const trademarkList = ref<allTrademarkDataType>([]);
const dialogFormVisible = ref<boolean>(false);
const formRef = ref<any>();
const trademarkParams = reactive<trademarkDataType>({
  tmName: "",
  logoUrl: "",
});

const getTrademark = async (page = 1) => {
  pageNo.value = page;
  const res: trademarkResponseDataType = await apiGetHasTrademark(
    pageNo.value,
    limitPages.value
  );
  if (res.code === 200) {
    total.value = res.data.total;
    trademarkList.value = res.data.records;
  }
};
const sizeChange = () => {
  getTrademark();
};
const addTrademark = () => {
  dialogFormVisible.value = true;
  trademarkParams.id = 0;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";

  formRef.value?.clearValidate("logoUrl");
  formRef.value?.clearValidate("tmName");
  // nextTick(() => {
  //   formRef.value.clearValidate("logoUrl");
  //   formRef.value.clearValidate("tmName");
  // });
};
const editTrademark = (row: trademarkDataType) => {
  formRef.value?.clearValidate("logoUrl");
  formRef.value?.clearValidate("tmName");

  Object.assign(trademarkParams, row);
  dialogFormVisible.value = true;
};
const removeTradeMark = async (id: number) => {
  const res = await apiDeleteTrademark(id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除品牌成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "刪除品牌失敗",
    });
  }
  // 刪完動態跳頁
  getTrademark(
    trademarkList.value.length > 1 ? pageNo.value : pageNo.value - 1
  );
};
const cancel = () => {
  dialogFormVisible.value = false;
};
const ok = async () => {
  // element提供會執行所有驗證
  try {
    await formRef.value.validate();
  } catch (error) {
    return;
  }

  const res: any = await apiAddOrEditTrademark(trademarkParams);
  if (res.code === 200) {
    getTrademark(trademarkParams.id ? pageNo.value : 1);
    dialogFormVisible.value = false;
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "成功修改品牌" : "成功添加品牌",
    });
  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失敗" : "添加品牌失敗",
    });
    dialogFormVisible.value = false;
  }
};
// 圖片上傳前 限制功能
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile: any) => {
  // rawFile 文件資訊
  // rule png|jpg|gif 4M
  if (
    rawFile.type === "image/png" ||
    rawFile.type === "image/jpg" ||
    rawFile.type === "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上傳文件大小小於4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上傳文件格式必須為png|jpg|gif",
    });
    return false;
  }
};
// 上傳成功後 執行
const handleAvatarSuccess: UploadProps["onSuccess"] = (response: any) => {
  trademarkParams.logoUrl = response.data;
  // 清除驗證結果
  formRef.value.clearValidate("logoUrl");
};
const checkTmName = (_: any, value: any, callBack: any) => {
  if (value?.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名稱位數大於等於兩位"));
  }
};
const checklogoUrl = (_: any, value: any, callBack: any) => {
  // value是圖片地址
  if (value) {
    callBack();
  } else {
    callBack(new Error("logo圖片務必上傳"));
  }
};

const rules = {
  tmName: [
    {
      required: true,
      trigger: "blur",
      validator: checkTmName,
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: checklogoUrl,
    },
  ],
};

onMounted(() => getTrademark());
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
