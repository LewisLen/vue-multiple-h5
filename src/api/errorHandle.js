// 常见错误码列表
const CodeList = {
  [400]: "错误请求",
  [401]: "未授权请求",
  [403]: "服务器拒绝请求",
  [404]: "请求地址不存在",
  [406]: "请求的格式不可得。",
  [408]: "请求超时",
  [410]: "请求的资源被永久删除，且不会再得到的。",
  [500]: "服务器内部发生错误，请检查服务器",
  [501]: "服务未实现",
  [502]: "网关错误",
  [503]: "服务不可用",
  [504]: "网关超时",
  [505]: "HTTP版本不受支持",
};
export default function errorHandle(code, message) {
  if (code) {
    let errMessage = CodeList[code]; // 错误消息
    return {
      returnCode: code,
      message: errMessage
        ? `[${code}]:${errMessage}`
        : message || "error 请求响应出错",
    };
  } else {
    // 无网络时单独处理
    console.log("网络不可用，请联网或刷新处理");
    return {
      returnCode: null,
      message: message || "网络不可用，请联网或刷新处理",
    };
  }
}
