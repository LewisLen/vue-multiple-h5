import request from "../index";

export function getUserList(data) {
  return request({
    url: "http://localhost:3000/posts",
    method: "get",
    data,
  });
}
