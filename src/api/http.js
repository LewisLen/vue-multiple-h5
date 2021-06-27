import axios from 'axios';
import baseURL from './environment';
import checkStatus from './checkStatus';

const instance = axios.create({
  baseURL,
  // 请求超时时间
  timeout: 10000,
  // 向服务器发送请求前，修改请求数据
  transformRequest: [
    function (data) {
      return data;
    },
  ],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [
    function (data) {
      return JSON.parse(data);
    },
  ],
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // loading
    console.log('load...');
    // 设置请求头 token等
    // token有可能是放在sessionStorage或者store里
    // if(token){
    // 	config.headers['token'] = ''
    // }
    return config;
  },
  (error) => {
    error.data = '';
    error.data.msg = '服务器异常!!!';
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 清除loading
    const res = response.data;
    const { resCode, data } = res;
    if (resCode && parseInt(resCode, 10) === 200) {
      return Promise.resolve(data);
    } else {
      let error = checkStatus(res);
      return Promise.reject(error || 'error');
    }
  },
  (error) => {
    // 清除loading
    return Promise.reject(error);
  }
);
