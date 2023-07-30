// menu api
import request from "@/utils/request";
import type { PermissionResDataType, MenuParamsType } from "./type";

enum API {
  ALLPERMISSION_URL = "/admin/acl/permission",
  ADDMENU_URL = "/admin/acl/permission/save",
  EDITMENU_URL = "/admin/acl/permission/update",
  REMOVEMENU_URL = "/admin/acl/permission/remove",
}

export const apiGetAllPermission = () =>
  request.get<any, PermissionResDataType>(API.ALLPERMISSION_URL);
export const apiAddOrEditMenu = (data: MenuParamsType) => {
  if (data.id) {
    return request.put<any, any>(API.EDITMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
};
export const apiDeleteMenu = (id: number) =>
  request.delete<any, any>(API.REMOVEMENU_URL + id);
