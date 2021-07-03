import request from "../request";
import QS from "qs";

export function getProductList(data) {
  return request({
    url: "api/productList",
    method: "get", // 默认是get
    data: QS.stringify(data),
  });
}
