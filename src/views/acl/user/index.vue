<template>
  <div>
    <el-card style="height: 80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用戶名: ">
          <el-input
            placeholder="搜索用戶名"
            type="text"
            v-model="searchWords"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="!searchWords"
            @click="search"
          >
            搜尋
          </el-button>
          <el-button type="primary" size="default" @click="reset"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin: 10px 0">
      <el-button type="primary" size="default" @click="addUser"
        >添加用戶</el-button
      >
      <el-button
        type="primary"
        size="default"
        :disabled="selectUserIdList.length ? false : true"
        @click="deleteSelectUser"
        >批量刪除</el-button
      >
      <!-- main table -->
      <el-table
        @selection-change="selectUserChange"
        style="margin: 10px 0"
        border
        :data="userList"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column
          label="#"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="ID" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用戶名字"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用戶名稱"
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用戶角色"
          align="center"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="創建時間"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新時間"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editUser(row)"
            >
              編輯
            </el-button>
            <el-popconfirm
              :title="`確認刪除${row.username}?`"
              width="260px"
              @confirm="deleteUser(row.id)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delet">
                  刪除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getAllUser"
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
    <!-- drawer add/editUser-->

    <el-drawer v-model="drawer" title="123">
      <template #header>
        <h4>{{ userParams.id ? "修改用戶" : "添加用戶" }}</h4>
      </template>
      <template #default>
        <el-form :model="userParams" :rules="rules" ref="formRef">
          <el-form-item label="用戶姓名" prop="username">
            <el-input
              placeholder="輸入用戶名"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用戶暱稱" prop="name">
            <el-input
              placeholder="輸入用戶暱稱"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用戶密碼" prop="password" v-if="!userParams.id">
            <el-input
              placeholder="輸入用戶密碼"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">cancel</el-button>
          <el-button type="primary" @click="confirm">確認</el-button>
        </div>
      </template> </el-drawer
    ><!-- drawer assign role-->
    <el-drawer v-model="drawer1">
      <template #header>
        <h4>分配角色</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用戶姓名">
            <el-input
              v-model="userParams.username"
              :disabledd="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="checkAllChange"
            >
              全選
            </el-checkbox>
            <!-- role list -->
            <el-checkbox-group v-model="userRole" @change="checkRoleChange">
              <el-checkbox
                v-for="(role, index) in allRoleList"
                :key="index"
                :label="role"
                >{{ role.roleName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button type="primary" @click="confirmSetRole">確認</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from "vue";
import {
  apiGetAllUser,
  apiEditAndAddUser,
  apiGetAllRole,
  apiPostAssignRole,
  apiRemoveRole,
  apiRemoveSelectRole,
} from "@/api/acl/user";
import type {
  UserResponseDataType,
  Records,
  UserDataType,
  AllRoleResponseDataType,
  AllRole,
  SetRoleType,
} from "@/api/acl/user/type";
import { ElMessage } from "element-plus";
import useLayoutSetting from "@/store/modules/setting";

const layoutSetting = useLayoutSetting();

const pageNo = ref<number>(1);
const pageSize = ref<number>(10);
const total = ref<number>(0);
const userList = ref<Records>([]);
const allRoleList = ref<AllRole>([]);
const userRole = ref<AllRole>([]);
const drawer = ref<boolean>(false);
const drawer1 = ref<boolean>(false);
const formRef = ref<any>();
const selectUserIdList = ref<UserDataType[]>([]);
const checkAll = ref<boolean>(false);
// 複選框確不確定樣式
const isIndeterminate = ref<boolean>(true);
const userParams = reactive<UserDataType>({
  username: "",
  name: "",
  password: "",
});
const searchWords = ref<string>("");

const validatorUserName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用戶名至少5位"));
  }
};
const validatorName = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("暱稱名至少5位"));
  }
};
const validatorPassword = (_: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack();
  } else {
    callBack(new Error("密碼至少6位"));
  }
};
const getAllUser = async (pager = 1) => {
  pageNo.value = pager;
  const res: UserResponseDataType = await apiGetAllUser(
    pageNo.value,
    pageSize.value,
    searchWords.value
  );
  if (res.code === 200) {
    total.value = res.data.total;
    userList.value = res.data.records;
  }
};
const pageHandler = () => {
  getAllUser();
};
const addUser = () => {
  drawer.value = true;
  Object.assign(userParams, {
    id: 0,
    username: "",
    name: "",
    password: "",
  });
  nextTick(() => {
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("name");
    formRef.value.clearValidate("password");
  });
};
const editUser = (row: UserDataType) => {
  drawer.value = true;
  Object.assign(userParams, row);
  nextTick(() => {
    formRef.value.clearValidate("username");
    formRef.value.clearValidate("name");
  });
};
const cancel = () => {
  drawer.value = false;
};
const confirm = async () => {
  // 驗證

  await formRef.value.validate();

  const res: any = await apiEditAndAddUser(userParams);

  if (res.code === 200) {
    drawer.value = false;
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "添加成功",
    });

    // // *****遊覽器重新載入
    // getAllUser(userParams.id ? pageNo.value : 1);
    location.reload();
  } else {
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失敗" : "添加失敗",
    });
  }
};
const setRole = (row: UserDataType) => {
  Object.assign(userParams, row);
  getAllRole(userParams.id as number);
  drawer1.value = true;
};
const getAllRole = async (userId: number) => {
  const res: AllRoleResponseDataType = await apiGetAllRole(userId);
  if (res.code === 200) {
    allRoleList.value = res.data.allRolesList;
    userRole.value = res.data.assignRoles;
  }
};

const checkAllChange = (val: boolean) => {
  userRole.value = val ? allRoleList.value : [];
  isIndeterminate.value = false;
};
const checkRoleChange = (value: string[]) => {
  checkAll.value = value.length === allRoleList.value.length;
  isIndeterminate.value = value.length !== allRoleList.value.length;
};
const confirmSetRole = async () => {
  const data: SetRoleType = {
    roleIdList: userRole.value.map((user) => {
      return user.id as number;
    }),
    userId: userParams.id as number,
  };
  const res: any = await apiPostAssignRole(data);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "添加成功",
    });
    drawer1.value = false;
    getAllUser(pageNo.value);
  }
};
const deleteUser = async (id: number) => {
  const res: any = await apiRemoveRole(id);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除成功",
    });
    getAllUser(userList.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: "刪除失敗",
    });
  }
};
const selectUserChange = (value: any) => {
  selectUserIdList.value = value;
};
const deleteSelectUser = async () => {
  const data: any = selectUserIdList.value.map((user) => user.id);
  const res: any = await apiRemoveSelectRole(data);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "刪除成功",
    });
    getAllUser(userList.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage({
      type: "error",
      message: "刪除失敗",
    });
  }
};
const search = () => {
  getAllUser();
  searchWords.value = "";
};
const reset = () => {
  layoutSetting.reload = !layoutSetting.reload;
};
//  與 :model驗證用
const rules = {
  username: [
    {
      required: true,
      trigger: "blur",
      validator: validatorUserName,
    },
  ],
  name: [
    {
      required: true,
      trigger: "blur",
      validator: validatorName,
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      validator: validatorPassword,
    },
  ],
};
onMounted(() => getAllUser());
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
