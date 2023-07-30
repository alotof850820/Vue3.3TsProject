<template>
  <el-form>
    <el-form-item label="SKU名稱">
      <el-input
        v-model="skuParams.skuName"
        placeholder="請輸入SKU名稱"
      ></el-input>
    </el-form-item>
    <el-form-item label="價格(元)">
      <el-input
        v-model="skuParams.price"
        placeholder="請輸入價格(元)"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        v-model="skuParams.weight"
        placeholder="請輸入重量(克)"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        v-model="skuParams.skuDesc"
        placeholder="請敘述SKU"
        type="textarea"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台屬性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in attrData"
          :label="item.attrName"
          :key="item.id"
        >
          <!-- 自行新增收集屬性 attrIdAndValueId為${item.id}:${itemValue.id}-->
          <el-select v-model="item.attrIdAndValueId">
            <el-option
              v-for="itemValue in item.attrValueList"
              :value="`${item.id}:${itemValue.id}`"
              :key="itemValue.id"
              :label="itemValue.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in saleAttrData"
          :label="item.saleAttrName"
          :key="item.id"
        >
          <!--saleIdAndValueId為 ${item.id}:${saleAttrValue.id} -->
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :valur="`${item.id}:${saleAttrValue.id}`"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="圖片名稱">
      <el-table border :data="spuImgData" ref="table">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column label="圖片">
          <template #="{ row, $index }">
            <img
              :src="row.imgUrl"
              alt="圖片"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="名稱" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="primary" size="small" @click="defaultImg(row)"
              >設置默認</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { apiGetAttr } from "@/api/product/attr";
import { apiGetSpuImg, apiGetSpuAttr, apiPostAddSku } from "@/api/product/spu";
import type { AttrResponseDataType } from "@/api/product/attr/type";
import type {
  SpuImgType,
  SpuSaleAttrResponseDataType,
  SkuDataType,
} from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import { ref, reactive } from "vue";
const emit = defineEmits(["changeModal"]);

// skuForm所需allData
const attrData = ref<any>([]);
const saleAttrData = ref<any>([]);
const spuImgData = ref<any>([]);
// 收集skuform參數
const skuParams = reactive<SkuDataType>({
  category3Id: "",
  spuId: "",
  tmId: "",
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: "",
});
// 取圖片table實例
const table = ref<any>();

const getSKU = async (
  c1Id: number | string,
  c2Id: number | string,
  c3Id: number | string,
  spuId: number | string
) => {
  const resAttr: AttrResponseDataType = await apiGetAttr(c1Id, c2Id, c3Id);
  const resSaleAttr: SpuSaleAttrResponseDataType = await apiGetSpuAttr(
    spuId as number
  );
  const resSupImg: SpuImgType = await apiGetSpuImg(spuId as number);

  if (
    resAttr.code === 200 &&
    resSaleAttr.code === 200 &&
    resSupImg.code === 200
  ) {
    attrData.value = resAttr.data;
    saleAttrData.value = resSaleAttr.data;
    spuImgData.value = resSupImg.data;
  } else {
    ElMessage({
      type: "error",
      message: "資料獲取失敗",
    });
  }
};
const inintSkuData = (
  c1Id: number | string,
  c2Id: number | string,
  spu: any
) => {
  // 收集數據
  skuParams.category3Id = spu.category3Id;
  skuParams.spuId = spu.id;
  skuParams.tmId = spu.tmId;

  getSKU(c1Id, c2Id, spu.category3Id, spu.id);
};
const cancel = () => {
  emit("changeModal", { flag: 0, params: "" });
};
const defaultImg = (row: any) => {
  // 取消全部checkbox
  spuImgData.value.forEach((item: any) => item.toggleRowSelection(item, false));
  // 選中checkbox
  table.value.toggleRowSelection(row, true);
  skuParams.skuDefaultImg = row.imgUrl;
};
const save = async () => {
  // 整理data
  // 平台屬性
  skuParams.skuAttrValueList = attrData.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      // 將自設屬性值分解
      const [attrId, valueId] = next.attrIdAndValueId.split(":");
      prev.push({
        attrId,
        valueId,
      });
      return prev;
    }
  }, []);
  // 銷售屬性
  skuParams.skuSaleAttrValueList = saleAttrData.value.reduce(
    (prev: any, next: any) => {
      if (next.saleIdAndValueId) {
        // 將自設屬性值分解
        const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");
        prev.push({
          saleAttrId,
          saleAttrValueId,
        });
        return prev;
      }
    },
    []
  );
  // 發api
  const res: any = apiPostAddSku(skuParams);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "新增成功",
    });
    emit("changeModal", { flag: 0, params: "" });
  } else {
    ElMessage({
      type: "error",
      message: "新增失敗",
    });
  }
};
defineExpose({ inintSkuData });
</script>
<style scoped lang="scss"></style>
