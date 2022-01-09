const NODE_ENV = process.env.VUE_APP_ENV_CONFIG;
const BASE_URL = process.env.VUE_APP_BASE_URL;
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
    baseURL = "https://www.uat.com/" || BASE_URL;
    break;
}
export default baseURL;
