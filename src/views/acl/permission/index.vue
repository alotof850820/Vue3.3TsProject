<template>
  <div>
    <el-table
      :data="allPermission"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="名稱"></el-table-column>
      <el-table-column prop="code" label="權限值"></el-table-column>
      <el-table-column prop="updateTime" label="修改時間"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 4"
            @click="addPermission(row)"
            >{{ row.level === 3 ? "添加功能" : "添加菜單" }}
          </el-button>
          <el-button
            type="primary"
            size="small"
            :disabled="row.level === 1"
            @click="editPermission(row)"
          >
            編輯
          </el-button>
          <el-popconfirm
            :title="`你確定要刪除${row.name}?`"
            @confirm="remove(row.id)"
            width:260px
          >
            <template #reference>
              <el-button
                type="primary"
                size="small"
                :disabled="row.level === 1"
              >
                刪除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="menuData.id ? '更新菜单' : '添加菜单'"
    >
      <el-form>
        <el-form-item label="名稱">
          <el-input
            placeholder="請你輸入菜單名稱"
            v-model="menuData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="權限">
          <el-input
            placeholder="請你輸入權限數值"
            v-model="menuData.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="ok"> 確認 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  apiGetAllPermission,
  apiAddOrEditMenu,
  apiDeleteMenu,
} from "@/api/acl/menu";
import type {
  PermissionResDataType,
  PermissionListType,
  PermissionDataType,
  MenuParamsType,
} from "@/api/acl/menu/type";
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";

const allPermission = ref<PermissionListType>([]);
const dialogVisible = ref<boolean>(false);
const menuData = reactive<MenuParamsType>({
  code: "",
  level: 0,
  name: "",
  pid: 0, //菜單ID
});

const getAllPermission = async () => {
  const res: PermissionResDataType = await apiGetAllPermission();
  if (res.code === 200) {
    allPermission.value = res.data;
  }
};
const addPermission = async (row: PermissionDataType) => {
  Object.assign(menuData, { id: 0, code: "", level: 0, name: "", pid: 0 });

  dialogVisible.value = true;
  menuData.level = row.level + 1;
  menuData.pid = row.id as number;
};
const editPermission = async (row: PermissionDataType) => {
  dialogVisible.value = true;
  Object.assign(menuData, row);
};
const ok = async () => {
  const res: any = await apiAddOrEditMenu(menuData);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: menuData.id ? "修改成功" : "添加成功",
    });
    getAllPermission();
    dialogVisible.value = false;
  } else {
    ElMessage({
      type: "error",
      message: menuData.id ? "修改失敗" : "添加失敗",
    });
  }
};
const remove = async (id: number) => {
  const res: any = await apiDeleteMenu(id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除成功",
    });
    getAllPermission();
  } else {
    ElMessage({
      type: "success",
      message: "刪除失敗",
    });
  }
};
onMounted(() => getAllPermission());
</script>

<style lang="sass" scoped></style>
