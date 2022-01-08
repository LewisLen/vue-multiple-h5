const fs = require("fs");
const path = require("path");
// argv是一个数组 也可以参考minimist
// 第一个值是 启动它的命令node安装的路径
// 第二个值是当前执行的文件路径
// 之后的值是启动命令传入的参数。
const { argv } = require("process");
// 这里的argvObj也是获取的argv的参数，为Object对象
// const argvObj = require("minimist")(argv.slice(2));
const { PROXY } = require("./devServer");

// 是否需要模块编译打包判断
function isNeedVerbModule() {
  if (argv.includes("--module")) {
    // 通过argv取最后一个参数，即是通过命令行传递过来的参数，通过下划线(_)或者逗号(,)进行分割，可以指定多个部分模块进行编译打包
    return argv[argv.length - 1].split(/[_,]/);
  } else {
    return [];
  }
}

// 利用 minimist 获得命令参数
// function isNeedModuleVerb() {
//   if (argvObj.module) {
//     return argvObj["module"].split(/[_,]/);
//   } else {
//     return [];
//   }
// }

// 判断是否有main.js入口文件
function hasMainFile(filePath) {
  return fs.existsSync(path.join(filePath, "main.js"));
}

// 判断是否有模板html
function hasHtmlFile(filePath) {
  return fs.existsSync(path.join(filePath, "index.html"));
}

// 判断是否是文件目录
function isDirectory(directoryPath) {
  try {
    // 获取文件信息
    const tempStat = fs.lstatSync(directoryPath);
    // 判断是否为文件夹
    return tempStat.isDirectory();
  } catch (error) {
    console.log(error);
  }
}

// 数组去重
function arrUnique(arr) {
  const temp = new Map();
  return arr.filter((item) => {
    return !temp.has(item) && temp.set(item, 1);
  });
}

// 获取代理信息
function getProxyInfo() {
  const tempProxy = PROXY || {};
  const proxy = {};
  Object.keys(tempProxy).forEach((key) => {
    const data = tempProxy[key] || {};
    if (data.target) {
      proxy[key] = {
        ...data,
        ws: true,
        changeOrigin: true,
        pathRewrite: { [`^${key}`]: "" },
      };
    }
  });
  return proxy;
}

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  isNeedVerbModule,
  hasMainFile,
  hasHtmlFile,
  isDirectory,
  arrUnique,
  getProxyInfo,
  isProd,
};
