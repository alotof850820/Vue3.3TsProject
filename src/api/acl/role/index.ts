// role api
import request from "@/utils/request";
import {
  RoleResponseDataType,
  RoleDataType,
  PermissionResDataType,
} from "./type";

enum API {
  ALLROLE_URL = "/admin/acl/role/",
  ADDROLE_URL = "/admin/acl/role/save",
  EDITROLE_URL = "/admin/acl/role/update",
  ALLPERMISSION_URL = "/admin/acl/permission/toAssign/",
  SETPERMISSION_URL = "/admin/acl/permission/doAssign/?",
  REMOVEROLE_URL = "/admin/acl/role/remove/",
}

export const apiGetAllRole = (page: number, limit: number, roleName: string) =>
  request.get<any, RoleResponseDataType>(
    API.ALLROLE_URL + `${page}/${limit}?roleName=${roleName}`
  );
export const apiAddAndEditRole = (data: RoleDataType) => {
  if (data.id) {
    return request.put<any, any>(API.EDITROLE_URL, data);
  } else {
    return request.post<any, any>(API.ADDROLE_URL, data);
  }
};
export const apiGetAllPermission = (roleId: number) =>
  request.get<any, PermissionResDataType>(API.ALLPERMISSION_URL + roleId);
export const apiPostSetPermission = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`
  );
export const apiRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId);
