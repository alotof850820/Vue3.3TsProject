<template>
  <div>
    <!-- 三分類 全局組件 -->
    <Category :showModal="showModal" />
    <el-card style="margin: 10px 0px">
      <!-- menu -->
      <div v-show="!showModal">
        <el-button
          @click="addNewAttr"
          :disabled="!categoryStore.c3Id"
          type="primary"
          size="default"
          icon="Plus"
          >新增屬性</el-button
        >
        <el-table border style="margin: 10px 0px" :data="attrData">
          <el-table-column
            label="序號"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="屬性名稱"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="屬性值名稱">
            <template #="{ row }">
              <el-tag
                style="margin: 5px"
                v-for="item in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                @click="editAttr(row)"
              ></el-button>

              <el-popconfirm
                :title="`確定刪除${row.attrName}?`"
                width="200px"
                @confirm="deleteAttr(row.id)"
              >
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete">
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- Modal -->
      <div v-show="showModal">
        <el-form :inline="true">
          <el-form-item label="屬性名稱">
            <el-input
              placeholder="輸入名稱"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          :disabled="!attrParams.attrName"
          type="primary"
          icon="Plus"
          @click="addAttrValue"
          >添加屬性值</el-button
        >
        <el-button type="default" @click="cancel">取消</el-button>

        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序號"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="屬性值名稱">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc:any)=>inputArr[$index] = vc"
                v-if="row.flag"
                @blur="look(row, $index)"
                placeholder="輸入屬性值名稱"
                v-model="row.valueName"
                size="small"
              ></el-input>
              <div @click="edit(row, $index)" v-else>
                {{ row.valueName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
                >刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="save"
          :disabled="attrParams.attrValueList.length === 0"
          >保存</el-button
        >
        <el-button type="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/store/modules/category";
import {
  apiGetAttr,
  apiPostAddOrEditAttr,
  apiDeleteAttr,
} from "@/api/product/attr";
import { reactive, ref, watch, nextTick, onBeforeUnmount } from "vue";
import type {
  AttrResponseDataType,
  AttrObjType,
  AttrValueType,
} from "@/api/product/attr/type";
import { ElMessage } from "element-plus";

const categoryStore = useCategoryStore();

const attrData = ref<AttrObjType[]>([]);
const showModal = ref(false);
const inputArr = ref<any>([]); //給個別input focus用

const attrParams = reactive<AttrObjType>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
});
const addNewAttr = () => {
  // 清空並取C3id
  Object.assign(attrParams, {
    attrName: "",
    attrValueList: [],
    categoryId: categoryStore.c3Id,
    categoryLevel: 3,
  });
  showModal.value = true;
};
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: "",
    flag: true, //編輯觀看轉換(每個獨立)
  });
  // 最後input focus
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus();
  });
};
const editAttr = (row: AttrValueType) => {
  showModal.value = true;
  // 將已有屬性給attrParams(深拷貝)(修改的坑)
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)));
};
const cancel = () => {
  showModal.value = false;
};
const save = async () => {
  const res: any = await apiPostAddOrEditAttr(attrParams);
  if (res.code === 200) {
    getAttr();
    showModal.value = false;
    ElMessage({
      type: "success",
      message: attrParams.id ? "成功修改" : "添加成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: attrParams.id ? "成功失敗" : "添加失敗",
    });
  }
};
const getAttr = async () => {
  attrData.value = [];
  const { c1Id, c2Id, c3Id } = categoryStore;
  if (!categoryStore.c3Id) return;
  const res: AttrResponseDataType = await apiGetAttr(c1Id, c2Id, c3Id);
  if (res.code === 200) {
    attrData.value = res?.data;
  }
};
const look = (row: AttrValueType, index: number) => {
  if (row.valueName.trim() === "") {
    // 刪除空值
    attrParams.attrValueList.splice(index, 1);
    ElMessage({
      type: "error",
      message: "屬性值不能為空",
    });
    return;
  }
  // 排除重複
  const repeat = attrParams.attrValueList.find((attr) => {
    if (attr !== row) {
      return attr.valueName === row.valueName;
    }
  });
  if (repeat) {
    ElMessage({
      type: "error",
      message: "屬性值不能重複",
    });
    return;
  }
  row.flag = false;
};
const edit = (row: AttrValueType, index: number) => {
  // 響應變化獲取更新DOM
  nextTick(() => inputArr.value[index].focus());
  row.flag = true;
};
const deleteAttr = async (id: number) => {
  const res: any = await apiDeleteAttr(id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除成功",
    });
    getAttr();
  } else {
    ElMessage({
      type: "error",
      message: "刪除失敗",
    });
  }
};

watch(
  () => categoryStore.c3Id,
  () => getAttr()
);

// component銷毀時 clean data
onBeforeUnmount(() => categoryStore.$reset());
</script>

<style lang="sass" scoped></style>
