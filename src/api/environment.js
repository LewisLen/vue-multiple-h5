const NODE_ENV = process.env.NODE_ENV;
const BASE_URL = process.env.BASE_URL;
let baseURL = "";
// 根据环境来切换请求baseURL
switch (NODE_ENV) {
  case "development":
    baseURL = "http://localhost:8080/" || BASE_URL;
    break;
  case "production":
    baseURL = "https://www.prod.com/" || BASE_URL;
    break;
  default:
    baseURL = "https://www.fat.com/" || BASE_URL;
    break;
}
export default baseURL;
