# vue-h5

基于vue-cli4.x多页面移动端页面打包开箱即用

## 安装和启动

```shell
# 全局安装vue-cli4.x
npm install -g @vue-cli
# 创建一个项目
vue create vue-h5
# 安装依赖启动项目
cd vue-h5
npm install
npm run serve
```

## 移动端适配

采用的的`lib-flexible`方案，搭配`postcss-pxtorem`插件可以直接在开发过程中用px做单位，插件会根据配置自动转化成rem

在 main.js 中引入 lib-flexible.js 或者直接在模板的 html 文件中引入该方案

```javascript
// .postcssrc.js文件
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
```

> 出现报错: Syntax Error: Error: PostCSS plugin postcss-pxtorem requires PostCSS 8.
> 解决方案，安装postcss-pxtorem@5.1.1版本: npm install postcss-pxtorem@5.1.1 -D