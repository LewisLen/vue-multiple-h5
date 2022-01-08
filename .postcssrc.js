module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-px-to-viewport': {
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 小数位
      viewportUnit: 'vw',
      selectorBlackList: ['.ignore', '.hairlines'], 
      minPixelValue: 1,
      mediaQuery: false
    }
  }
  /*
  postcss-pxtorem插件转换rem
  plugins: {
    "autoprefixer": {},
    "postcss-pxtorem": {
      "rootValue": 75, // 设计稿宽度的1/10
      "unitPrecision": 4, // 小数位
      "minPixelValue": 2, // 转换的最小单位
      "selectorBlackList": [], // 忽略的样式, 正则
      "propList": ["*"], // 需要做转化处理的属性，如`hight`、`margin`等，也可以正则匹配
      "exclude": /node_modules/
    }
  }
  */
}