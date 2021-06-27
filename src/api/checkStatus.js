// 常见错误码列表
const CodeList = {
  [400]: '错误请求',
  [401]: '未授权请求',
  [403]: '服务器拒绝请求',
  [404]: '请求地址不存在',
  [408]: '请求超时',
  [500]: '服务器内部错误',
  [501]: '服务未实现',
  [502]: '网关错误',
  [503]: '服务不可用',
  [504]: '网关超时',
  [505]: 'HTTP版本不受支持',
};

export default function checkStatus(res) {
  // 无网络时单独处理
  if (!res) {
    return { errCode: null, errMsg: '网络不可用，请刷新重试' };
  }
  const errCode = res.data.resCode, //错误码
    errMsg = CodeList[errCode]; //错误消息

  return {
    errCode,
    errMsg: errMsg ? `${errMsg} [${errCode}]` : res.data.message || 'error',
  };
}
