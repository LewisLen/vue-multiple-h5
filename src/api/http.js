import axios from 'axios';
import baseURL from './environment';

const instance = axios.create({
  baseURL:baseURL,
  // 请求超时
  timeout: 10000
})

instance.interceptors.request.use = function(config){
  console.log(config)
}