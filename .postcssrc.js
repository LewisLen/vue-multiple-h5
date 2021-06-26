// 也可以是postcss.config.js
module.exports = {
  plugins: {
    "autoprefixer": {},
    "postcss-pxtorem": {
      "rootValue": 37.5, // 设计稿宽度的1/10
      "unitPrecision": 4, // 小数位
      "minPixelValue": 2, // 转换的最小单位
      "selectorBlackList": [], // 忽略的样式, 正则
      "propList": ["*"], // 需要做转化处理的属性，如`hight`、`margin`等，也可以正则匹配
      "exclude": /node_modules/
    }
  }
}