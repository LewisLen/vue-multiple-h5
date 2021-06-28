import axios from "axios";
import baseURL from "./environment";
import errorHandle from "./errorHandle";
import store from "../store/index";
import qs from "qs";

const instance = axios.create({
  baseURL,
  // 跨域请求时是否需要使用凭证
  // withCredentials: true,
  // 请求超时时间
  timeout: 10000,
  // 向服务器发送请求前，修改请求数据
  transformRequest: [
    function (data) {
      data = JSON.stringify(data);
      return data;
    },
  ],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [
    function (data) {
      if (typeof data === "string" && data.startsWith("{")) {
        data = JSON.parse(data);
      }
      return data;
    },
  ],
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    post: {
      "Content-Type": "application/json;charset=utf-8",
    },
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // loading
    console.log("loading...");
    // 设置请求头token等
    // token有可能是放在sessionStorage或者store里
    let token = store.getters.token || sessionStorage.getItem("token") || "";
    if (token) {
      config.headers["X-Token"] = token;
    }
    return config;
  },
  (error) => {
    console.log("request-error: loading...");
    console.log(error);
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const status = parseInt(response.status, 10);
    const resData = response.data;
    const { returnCode, data, message } = resData;
    if (status && status === 200 && returnCode === "000") {
      // 清除loading
      console.log("clear loading...");
      // 请求成功处理
      return Promise.resolve(data);
    } else if (returnCode === "999") {
      // 自定义重定向处理
      console.log("重定向处理");
      setTimeout(() => {
        console.log("clear loading...");
      }, 3000);
    } else {
      setTimeout(() => {
        console.log("clear loading...");
      }, 3000);
      let error = errorHandle(status, message);
      return Promise.reject(error);
    }
  },
  (error) => {
    // 清除loading
    setTimeout(() => {
      console.log("clear loading...");
    }, 3000);
    return Promise.reject(error);
  }
);

export default instance;

// get请求
export function get(url, params) {
  console.log("===get请求===");
  return axios.get(url, { params });
}

// post请求
export function post(url, params) {
  console.log("===post请求===");
  return axios.get(url, qs.stringify(params));
}
