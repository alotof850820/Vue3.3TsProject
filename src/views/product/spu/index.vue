<template>
  <div>
    <!-- 三分類 -->
    <Category :showModal="showModal ? true : false" />
    <el-card style="margin: 10px 0">
      <!-- v-show 效能上比v-if -->
      <div v-show="showModal === 0">
        <!-- main -->
        <el-button
          @click="changeAddModal"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          >添加SPU</el-button
        >
        <el-table :data="records" style="margin: 10px 0" border>
          <el-table-column
            label="序號"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="SPU名稱" prop="spuName"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="SPU描述"
            prop="description"
          ></el-table-column>
          <el-table-column label="SPU操作">
            <template #="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="primary"
                icon="Edit"
                title="修改SPU"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="primary"
                icon="View"
                title="查看SKU列表"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`確定刪除${row.spuName}?`"
                width="200px"
                @confirm="remove(row)"
              >
                <template #reference>
                  <el-button
                    type="primary"
                    icon="Delete"
                    title="刪除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分頁 -->
        <el-pagination
          @current-change="getSPU"
          @size-change="changePageSize"
          :pager-count="9"
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next,
    jumper ,->, sizes,total"
          :total="total"
        />
      </div>
      <SpuForm
        ref="spuForm"
        v-show="showModal === 1"
        @changeModal="changeModal"
      />
      <SkuForm
        ref="skuForm"
        v-show="showModal === 2"
        @changeModal="changeModal"
      />
      <el-dialog title="SKU列表" v-model="showSku">
        <el-table boder :data="skuArr">
          <el-table-column label="SKU名子" prop="skuName"></el-table-column>
          <el-table-column label="SKU價格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU圖片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                alt="img"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from "vue";
import { apiGetSPU, apiGetSkuInfo, apiDeleteSpu } from "@/api/product/spu";
import type {
  SpuDataType,
  SkuResponseDataType,
  SkuDataType,
} from "@/api/product/spu/type";
import { useCategoryStore } from "@/store/modules/category";
import type { SpuResponseDataType, Records } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
import SpuForm from "./spuForm.vue";
import SkuForm from "./skuForm.vue";

const categoryStore = useCategoryStore();

const showModal = ref(0);
const pageNo = ref<number>(1);
const pageSize = ref<number>(3);
const records = ref<Records>([]);
const total = ref<number>(0);
// 用ref拿對應子組件所有暴露的function
const spuForm = ref<any>();
const skuForm = ref<any>();
const skuArr = ref<SkuDataType[]>([]);
const showSku = ref<boolean>(false);

const getSPU = async (page = 1) => {
  pageNo.value = page;
  const res: SpuResponseDataType = await apiGetSPU(
    pageNo.value,
    pageSize.value,
    categoryStore.c3Id
  );
  if (res.code === 200) {
    records.value = res.data.records;
    total.value = res.data.total;
  } else {
    ElMessage({
      type: "error",
      message: "請求失敗",
    });
  }
};
const changePageSize = () => {
  getSPU();
};
const changeAddModal = () => {
  showModal.value = 1;
  spuForm.value.initAddSpu(categoryStore.c3Id);
};
const changeModal = (obj: any) => {
  showModal.value = obj.flag;
  if (obj.params === "edit") {
    getSPU(pageNo.value);
  } else {
    getSPU();
  }
};
const editSpu = (row: SpuDataType) => {
  showModal.value = 1;
  spuForm.value.initSpuData(row);
};
const addSku = (row: SpuDataType) => {
  const { c1Id, c2Id } = categoryStore;
  skuForm.value.inintSkuData(c1Id, c2Id, row);
  showModal.value = 2;
};
const findSku = async (row: SpuDataType) => {
  const res: SkuResponseDataType = await apiGetSkuInfo(row.id as number);
  if (res.code === 200) {
    skuArr.value = res.data;
    showSku.value = true;
  }
};
const remove = async (row: SpuDataType) => {
  const res: any = await apiDeleteSpu(row.id as number);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除成功",
    });
    getSPU(records.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: "刪除失敗",
    });
  }
};

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return;
    getSPU();
  }
);

onBeforeUnmount(() => categoryStore.$reset);
</script>

<style lang="scss" scoped></style>
