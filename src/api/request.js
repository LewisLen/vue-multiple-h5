import axios from "axios";
import baseURL from "@/api/environment";
import errorHandle from "./errorHandle";
import store from "../store/index";
const instance = axios.create({
  baseURL,
  // 跨域请求时是否需要使用凭证
  withCredentials: true,
  // 请求超时时间
  timeout: 5 * 1000,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
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
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const status = parseInt(response.status, 10);
    const resData = response.data;
    // 这里的返回数据要根据responese真实的返回来设置如 returnCode === '000'可能还需要再加一层data等
    const { returnCode, message } = resData;
    if (status && status === 200) {
      // 清除loading
      console.log("clear loading...");
      return resData;
    } else if (returnCode === "999") {
      // 自定义重定向处理
      setTimeout(() => {
        console.log("重定向处理 清除loading");
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
