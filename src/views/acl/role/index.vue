<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="職位搜索">
          <el-input
            placeholder="請輸入搜索職位"
            v-model="searchWords"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="!searchWords"
            @click="search"
            >搜尋
          </el-button>
          <el-button type="primary" size="default" @click="reset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addRole"
        >新增職位</el-button
      >
      <el-table border style="margin: 10px 0" :data="allRole">
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="職位名稱"
          align="center"
          prop="roleName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="創建時間"
          prop="createTime"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          label="更新時間"
          prop="updateTime"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setPermisstion(row)"
              >分配權限</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editRole(row)"
              >編輯</el-button
            >

            <el-popconfirm
              :title="`確定刪除${row.roleName}?`"
              width="260px"
              @confirm="deleteRole(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">
                  刪除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getRole"
        @size-change="pageHandler"
        :pager-count="9"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout=" prev, pager, next,
    jumper ,->, sizes,total"
        :total="total"
      />
    </el-card>
    <!-- dialog add and edit roles  -->
    <el-dialog
      v-model="dialogVisible"
      :title="roleParams.id ? '修改職位' : '添加職位'"
    >
      <el-form :model="roleParams" :rules="rules" ref="formRef">
        <el-form-item label="職位" prop="roleName">
          <el-input
            placeholder="輸入職位名稱"
            v-model="roleParams.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="ok"> 確認 </el-button>
        <el-button type="primary" @click="dialogVisible = false">
          取消
        </el-button>
      </template>
    </el-dialog>
    <!-- drawer set userMenu and button permission -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>分配菜單與按鈕的權限</h4>
      </template>
      <template #default>
        <el-tree
          :data="menuList"
          ref="tree"
          show-checkbox
          node-key="id"
          :default-checked-keys="selectList"
          :props="defaultProps"
        />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="addPermission">確定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import {
  apiGetAllRole,
  apiAddAndEditRole,
  apiGetAllPermission,
  apiPostSetPermission,
  apiRemoveRole,
} from "@/api/acl/role";
import {
  RoleResponseDataType,
  Records,
  RoleDataType,
  PermissionResDataType,
  MenuListType,
} from "@/api/acl/role/type";
import useLayoutSetting from "@/store/modules/setting";
import { ElMessage } from "element-plus";

const layoutSetting = useLayoutSetting();

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const searchWords = ref<string>("");
const total = ref<number>(0);
const allRole = ref<Records>([]);
const dialogVisible = ref<boolean>(false);
const formRef = ref<any>();
const drawer = ref<boolean>(false);
const menuList = ref<MenuListType>([]);
// 存4級節點的Id
const selectList = ref<any>([]);
const tree = ref<any>();
const roleParams = reactive<RoleDataType>({
  roleName: "",
});

const getRole = async (pager = 1) => {
  pageNo.value = pager;
  const res: RoleResponseDataType = await apiGetAllRole(
    pageNo.value,
    pageSize.value,
    searchWords.value
  );

  if (res.code === 200) {
    total.value = res.data.total;
    allRole.value = res.data.records;
  }
};
const pageHandler = () => {
  getRole();
};
const search = () => {
  getRole();
  searchWords.value = "";
};
const reset = () => {
  layoutSetting.reload = !layoutSetting.reload;
};
const addRole = () => {
  dialogVisible.value = true;

  Object.assign(roleParams, {
    id: 0,
    roleName: "",
  });
  nextTick(() => {
    formRef.value.clearValidate("roleName");
  });
};
const editRole = (row: RoleDataType) => {
  dialogVisible.value = true;
  Object.assign(roleParams, row);
  nextTick(() => {
    formRef.value.clearValidate("rolename");
  });
};
const ok = async () => {
  await formRef.value.validate();

  const res: any = await apiAddAndEditRole(roleParams);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: roleParams.id ? "更新成功" : "添加成功",
    });
    dialogVisible.value = false;
    getRole(roleParams.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: "error",
      message: roleParams.id ? "更新失敗" : "添加失敗",
    });
    dialogVisible.value = false;
  }
};
const validatorRoleName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("用戶名至少2位"));
  }
};
const setPermisstion = async (row: RoleDataType) => {
  drawer.value = true;
  Object.assign(roleParams, row);

  const res: PermissionResDataType = await apiGetAllPermission(
    roleParams.id as number
  );
  if (res.code === 200) {
    menuList.value = res.data;
    selectList.value = filterSelectList(menuList.value, []);
  }
};
const filterSelectList = (allData: any, initList: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4) {
      initList.push(item.id);
    }
    if (item.children && item.children.length > 0) {
      // 遞迴
      filterSelectList(item.children, initList);
    }
  });
};
const addPermission = async () => {
  const roleId = roleParams.id as number;
  // 元件庫提供function ref實例取得
  const arr = tree.value.getCheckedKeys();
  // 部分選(上層節點)
  const arr1 = tree.value.getHalfCheckedKeys();
  const permissionId = [...arr, ...arr1];
  const res: any = await apiPostSetPermission(roleId, permissionId);
  if (res.code === 200) {
    drawer.value = false;
    ElMessage({
      type: "success",
      message: "添加成功",
    });
    location.reload();
  } else {
    ElMessage({
      type: "error",
      message: "添加失敗",
    });
  }
};
const deleteRole = async (roleId: number) => {
  const res: any = await apiRemoveRole(roleId);
  if (res.code === 200) {
    drawer.value = false;
    ElMessage({
      type: "success",
      message: "添加成功",
    });
    getRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: "添加失敗",
    });
  }
};
const rules = {
  roleName: [
    {
      required: true,
      trigger: "blur",
      validator: validatorRoleName,
    },
  ],
};
const defaultProps = {
  children: "children",
  label: "name",
};

onMounted(() => getRole());
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}
</style>
