import request from "../request";

export function getUserList(data) {
  console.log("data===", data);
  return request({
    url: "/posts",
    method: "post",
    data,
  });
}
