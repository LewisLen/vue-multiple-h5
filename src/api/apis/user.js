import request from "../request";

export function getUserList(data) {
  return request({
    url: "/getUserList",
    method: "post",
    data,
  });
}
