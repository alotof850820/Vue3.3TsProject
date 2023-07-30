// user api

import request from "@/utils/request";
import type {
  UserResponseDataType,
  UserDataType,
  AllRoleResponseDataType,
  SetRoleType,
} from "./type";

enum API {
  ALLUSER_URL = "/admin/acl/user/",
  ADDUSER_URL = "/admin/acl/user/save",
  EDITUSER_URL = "/admin/acl/user/update",
  ALLROLE_URL = "/admin/acl/user/toAssign/",
  ASSIGNROLE_URL = "/admin/acl/user/doAssignRole",
  REMOVEUSER_URL = "/admin/acl/user/remove/",
  REMOVEALLUSER_URL = "/admin/acl/user/batchRemove",
}

export const apiGetAllUser = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseDataType>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`
  );
export const apiEditAndAddUser = (data: UserDataType) => {
  if (data.id) {
    return request.put<any, any>(API.EDITUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};
export const apiGetAllRole = (userId: number) =>
  request.get<any, AllRoleResponseDataType>(API.ALLROLE_URL + userId);
export const apiPostAssignRole = (data: SetRoleType) =>
  request.post<any, any>(API.ASSIGNROLE_URL, data);
export const apiRemoveRole = (userId: number) =>
  request.delete<any, any>(API.REMOVEUSER_URL + userId);
export const apiRemoveSelectRole = (idList: number[]) =>
  request.delete<any, any>(API.REMOVEALLUSER_URL + { data: idList });
