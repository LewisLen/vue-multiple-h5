import request from "../request";

export function getProductList(data) {
  return request({
    url: "/api/productList",
    method: "get", // 默认是get
    data,
  });
}
