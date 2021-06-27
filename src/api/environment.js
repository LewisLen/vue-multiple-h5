const NODE_ENV = process.env.NODE_ENV;
const BASE_URL = process.env.BASE_URL;
let baseURL = '';

// 根据环境来切换请求baseURL
switch (NODE_ENV) {
  case 'development':
    baseURL = BASE_URL || 'https://www.dev.com/';
    break;
  case 'production':
    baseURL = BASE_URL || 'https://www.prod.com/';
    break;
  default:
    baseURL = BASE_URL || 'https://www.dev.com/';
    break;
}
export default baseURL;
