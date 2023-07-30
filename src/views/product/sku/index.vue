el-card
<template>
  <el-card>
    <el-table border style="margin: 10px 0px" :data="skuData">
      <el-table-column
        label="序號"
        type="index"
        align="center"
        width="80px"
      ></el-table-column>
      <el-table-column
        label="名稱"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="150px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="圖片" width="150px">
        <template #="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt="Img"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量"
        width="150px"
        prop="weight"
      ></el-table-column>
      <el-table-column
        label="價格"
        width="150px"
        prop="price"
      ></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template #="{ row }">
          <el-button
            type="default"
            size="small"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            @click="switchSaleSku(row)"
          ></el-button>
          <el-button
            type="default"
            size="small"
            icon="Edit"
            @click="editSku"
          ></el-button>
          <el-button
            type="default"
            size="small"
            icon="InfoFilled"
            @click="seeSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`確定刪除${row.skuName}?`"
            width="200px"
            @confirm="removeSku(row)"
          >
            <template #reference>
              <el-button type="default" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :pager-count="9"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next,
    jumper ,->, sizes,total"
      :total="total"
      @current-change="getSku"
      @size-change="changePageSize"
    />
    <!-- drawer -->
    <el-drawer v-model="drawer" title="查看SKU詳情">
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">Name</el-col>
          <el-col :span="18">{{ skuInfo.skuName }}</el-col>
        </el-row>

        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
        </el-row>

        <el-row style="margin: 10px 0px">
          <el-col :span="6">價格</el-col>
          <el-col :span="18">{{ skuInfo.price }}</el-col>
        </el-row>

        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台屬性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuAttrValueList"
              :key="item.id"
              style="margin: 5px"
              >{{ item.valueName }}</el-tag
            >
          </el-col>
        </el-row>

        <el-row style="margin: 10px 0px">
          <el-col :span="6">銷售屬性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px"
              type="danger"
              >{{ item.saleAttrName }}</el-tag
            >
          </el-col>
        </el-row>

        <el-row style="margin: 10px 0px">
          <el-col :span="6">商品圖片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfo.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt="Img"
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  apiGetSku,
  apiGetOnSaleSku,
  apiGetCancelSaleSku,
  apiGetSkuInfo,
  apiRemoveSku,
} from "@/api/product/sku";
import type {
  SkuResponseDataType,
  SkuDataType,
  SkuInfoResponseDataType,
} from "@/api/product/sku/type";
import { ElMessage } from "element-plus";

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const skuData = ref<SkuDataType[]>([]);
const drawer = ref<boolean>(false);
const skuInfo = ref<any>({});

const getSku = async (page = 1) => {
  pageNo.value = page;

  const res: SkuResponseDataType = await apiGetSku(
    pageNo.value,
    pageSize.value
  );
  if (res.code === 200) {
    total.value = res.data.total;
    skuData.value = res.data.records;
  }
};
const changePageSize = (pageSize: number) => {
  getSku();
};
const switchSaleSku = async (row: SkuDataType) => {
  if (row.isSale === 1) {
    const res = await apiGetCancelSaleSku(row.id as number);
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: "下架成功",
      });
    }
    getSku(pageNo.value);
  } else {
    const res = await apiGetOnSaleSku(row.id as number);
    if (res.code === 200) {
      ElMessage({
        type: "success",
        message: "上架成功",
      });
    }
    getSku(pageNo.value);
  }
};
const editSku = () => {
  ElMessage({
    type: "success",
    message: "現正開發中.......",
  });
};
const seeSku = async (row: SkuDataType) => {
  drawer.value = true;
  const res: SkuInfoResponseDataType = await apiGetSkuInfo(row.id as number);
  if (res.code === 200) {
    skuInfo.value = res.data;
  }
};
const removeSku = async (row: SkuDataType) => {
  const res: any = await apiRemoveSku(row.id as number);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除成功",
    });
    getSku(skuData.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: "刪除失敗",
    });
  }
};
onMounted(() => getSku());
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
