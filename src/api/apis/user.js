import request from "../request";

export function getUserList(data) {
  return request({
    url: "http://localhost:3000/posts",
    method: "get",
    data,
  });
}
