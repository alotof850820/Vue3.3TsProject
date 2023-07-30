<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名稱">
      <el-input
        placeholder="請輸入SPU名稱"
        v-model="spuParams.spuName"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="請輸入SPU描述"
        v-model="spuParams.description"
      ></el-input>
    </el-form-item>

    <el-form-item label="SPU照片">
      <!-- 上傳地址要加/api -->
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="previewImgCard"
        :on-remove="() => {}"
        :before-upload="preCheckImgCard"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img
          w-full
          :src="dialogImgUrl"
          alt="img"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>

    <el-form-item label="SPU銷售屬性">
      <!-- :value="`${item.id}:${item.name}`" 收集給 saleAttrIdAndValueName-->
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="
          unSelectSaleAttr.length
            ? `還有 ${unSelectSaleAttr.length} 個沒選擇 `
            : '無'
        "
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        :disabled="!saleAttrIdAndValueName"
        style="margin-left: 10px"
        type="primary"
        icon="Plus"
        @click="addSaleAttr"
        >添加屬性
      </el-button>

      <el-table border style="margin: 10px 0px" :data="saleAttr">
        <el-table-column
          label="序號"
          type="index"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          label="銷售屬性名子"
          width="120px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="銷售屬性值">
          <template #="{ row, $index }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="row.id"
              class="ml-2"
              style="margin: 0px 5px"
              closable
              @close="row.spuSaleAttrValueList.splice($index, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag === true"
              v-model="row.saleAttrValue"
              placeholder="請輸入屬性值"
              size="small"
              style="width: 100px"
              @blur="blurInput(row)"
            ></el-input>
            <el-button
              v-else
              type="success"
              icon="Plus"
              size="small"
              @click="editSaleValue(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="saleAttr.splice($index, 1)"
            ></el-button
          ></template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save" :disabled="!saleAttr.length"
        >保存</el-button
      >
      <el-button type="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import type {
  SpuDataType,
  AllTrademarkDataType,
  SpuImgType,
  SpuSaleAttrResponseDataType,
  AllSpuSaleAttrResponseDataType,
  TrademarkDataType,
  ImgType,
  SaleAttr,
  AllSpuSaleAttr,
  SaleAttrValueType,
} from "@/api/product/spu/type";
import {
  apiGetAllSpuTradeMark,
  apiGetSpuImg,
  apiGetSpuAttr,
  apiGetAllSaleAttr,
  apiPostAddOrEditSpu,
} from "@/api/product/spu";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
const emit = defineEmits(["changeModal"]);

// all(4個) api data
const allTradeMark = ref<TrademarkDataType[]>([]);
const imgList = ref<ImgType[]>([]);
const saleAttr = ref<SaleAttr[]>([]);
const allSaleAttr = ref<AllSpuSaleAttr[]>([]);
// target Spu data
const spuParams = ref<SpuDataType>({
  category3Id: "",
  spuName: "",
  tmId: "",
  description: "",
  spuImageList: [],
  spuSaleAttrList: [],
});
const dialogVisible = ref<boolean>(false);
const dialogImgUrl = ref<string>("");
// 收集還未選擇sale屬性的id和其值
const saleAttrIdAndValueName = ref<string>("");

const unSelectSaleAttr = computed(() => {
  // 過濾sale屬性(顏色size等等)
  return allSaleAttr.value.filter((allItem) =>
    saleAttr.value.every((item) => allItem.name !== item.saleAttrName)
  );
});
const cancel = () => {
  emit("changeModal", { flag: 0, params: "edit" });
};
const initSpuData = async (rowSpu: SpuDataType) => {
  spuParams.value = rowSpu;

  const res: AllTrademarkDataType = await apiGetAllSpuTradeMark();
  const resImg: SpuImgType = await apiGetSpuImg(rowSpu.id as number);
  const resSpuAttr: SpuSaleAttrResponseDataType = await apiGetSpuAttr(
    rowSpu.id as number
  );
  const resAllSpuAttr: AllSpuSaleAttrResponseDataType =
    await apiGetAllSaleAttr();
  if (
    res.code === 200 &&
    resImg.code === 200 &&
    resSpuAttr.code === 200 &&
    resAllSpuAttr.code === 200
  ) {
    allTradeMark.value = res.data;
    // 改屬性名對應UI庫
    imgList.value = resImg.data.map((img) => {
      return {
        name: img.imgName,
        url: img.imgUrl,
      };
    });
    saleAttr.value = resSpuAttr.data;
    allSaleAttr.value = resAllSpuAttr.data;
  } else {
    ElMessage({
      type: "error",
      message: "載入資料失敗",
    });
  }
};
const initAddSpu = async (c3Id: number | string) => {
  // clean
  Object.assign(spuParams.value, {
    category3Id: "",
    spuName: "",
    tmId: "",
    description: "",
    spuImageList: [],
    spuSaleAttrList: [],
  });
  saleAttrIdAndValueName.value = "";
  imgList.value = [];
  saleAttr.value = [];

  spuParams.value.category3Id = c3Id;
  const res: AllTrademarkDataType = await apiGetAllSpuTradeMark();
  const resAllSpuAttr: AllSpuSaleAttrResponseDataType =
    await apiGetAllSaleAttr();
  allTradeMark.value = res.data;
  allSaleAttr.value = resAllSpuAttr.data;
};
const previewImgCard = (img: any) => {
  dialogImgUrl.value = img.url;
  dialogVisible.value = true;
};
const preCheckImgCard = (img: any) => {
  if (
    img.type === "image/png" ||
    img.type === "image/jpeg" ||
    img.type === "image/gif"
  ) {
    if (img.size / 1024 / 1024 < 3) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "圖片大小不能超過3M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "圖片形式必需是PNG|JPG|GIF",
    });
    return false;
  }
};
const addSaleAttr = () => {
  // 這方式好用
  const [baseSaleAttrId, saleAttrName] =
    saleAttrIdAndValueName.value.split(":");

  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  };
  saleAttr.value.push(newSaleAttr);
  saleAttrIdAndValueName.value = "";
};
const editSaleValue = (row: SaleAttr) => {
  // 自己加屬性
  row.flag = true;
  row.saleAttrValue = "";
};
const blurInput = (row: SaleAttr) => {
  const { baseSaleAttrId, saleAttrValue } = row;

  if (saleAttrValue?.trim() === "") {
    ElMessage({
      type: "error",
      message: "屬性值不能為空",
    });
    row.flag = false;
    return;
  }
  const repeat = row.spuSaleAttrValueList.find(
    (item) => item.saleAttrValueName === saleAttrValue
  );
  if (repeat) {
    ElMessage({
      type: "error",
      message: "屬性值不能重複",
    });
    row.flag = false;
    return;
  }

  row.spuSaleAttrValueList.push(<SaleAttrValueType>{
    baseSaleAttrId,
    saleAttrValueName: saleAttrValue as string,
  });
  row.flag = false;
};
const save = async () => {
  // 整理data
  spuParams.value.spuImageList = imgList.value.map((item: any) => {
    return {
      // 照片屬性因UI庫關係被我們改過要改回來
      imgName: item.name,
      // item.response(新增圖片)
      imgUrl: (item.response && item.response.data) || item.url,
    };
  });
  // 整理sale屬性
  spuParams.value.spuSaleAttrList = saleAttr.value;

  const res = await apiPostAddOrEditSpu(spuParams.value);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: spuParams.value.id ? "成功修改" : "成功新增",
    });
    emit("changeModal", {
      flag: 0,
      params: spuParams.value.id ? "edit" : "add",
    });
  } else {
    ElMessage({
      type: "error",
      message: spuParams.value.id ? "修改失敗" : "新增失敗",
    });
  }
};
// 給父ref接收，父再回傳targetData
defineExpose({ initSpuData, initAddSpu });
</script>
<style lang="scss" scoped></style>
