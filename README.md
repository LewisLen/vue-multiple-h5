# vue-h5

基于vue-cli4.x的eslint+prettier模版的多页面移动端脚手架，开箱即用


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
      "rootValue": 75, // 设计稿宽度的1/10
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


## eslint + prettier

VSCode 安装 ESlint 和 prettier 插件

主要依赖：

```javascript
// package.json
"devDependencies": {
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/eslint-config-prettier": "^6.0.0",
  "eslint": "^6.7.2",
  "eslint-plugin-prettier": "^3.3.1",
  "eslint-plugin-vue": "^6.2.2",
  "prettier": "^2.2.1",
}
// .eslintrc.js
extends: [
  "plugin:vue/essential", 
  "eslint:recommended", // 推荐eslint规则
  "@vue/prettier",
  "plugin:prettier/recommended", // 如果同时使用了eslint和prettier发生冲突了，会关闭掉与prettier有冲突的规则，也就是使用prettier认为对的规则
],
```

VSCode 主要设置

```javascript
// settings.json部分配置
"vetur.ignoreProjectWarning": true,
"vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
        "wrap_attributes": "force-expand-multiline"
    },
    "prettyhtml": {
        "printWidth": 100,
        "singleQuote": false,
        "wrapAttributes": false,
        "sortAttributes": false
    }
},
"explorer.confirmDragAndDrop": false,
"explorer.confirmDelete": false,
// eslint+prettier格式化代码
"eslint.alwaysShowStatus": true,
"eslint.run": "onSave",
// 自动修复代码
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
],
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
],
"prettier.useTabs": true,
```


## 封装axios

安装`axios`和`qs`，利用 interceptors 拦截器对 axios 请求进行封装

```javascript
// 引用方式一 main.js
import request from "./api/request";
Vue.prototype.$http = request;// 挂载到原型对象上
// 组件中
this.$http.get("api/productList").then((res) => {
  console.log(res);
});
// 引用方式二：每个请求按模块划分
// product.js
import request from "../request";
import QS from "qs";

export function getProductList(data) {
  return request({
    url: "api/productList",
    method: "get", // 默认是get
    data: QS.stringify(data),
  });
}
```

取消请求方式

```javascript
// 方式一
const cancelToken = axios.CancelToken;
const source = CancelToken.source();
axios.post('/productList',{code:'0001'},{
  cancelToken: source.token
})
source.cancel('取消请求')
// 方式二
const cancelToken = axios.CancelToken;
let cancel;
axios.get('/productList',{
  cancelToken: new cancelToken(function executor(c){
    cancel = c;
  })
})
cancel();// 取消请求
```


## 多环境配置

根目录下新增`.env.uat`文件，并在 package.json 中添加对应的命令行。只有`NODE_ENV`、`BASE_URL`和以`VUE_APP_`开头的变量将通过 `webpack.DefinePlugin`静态地嵌入到客户端侧的代码中。在开发中可以通过`process.env.VUE_APP_*`来访问相关变量。

```javascript
// .env.uat
NODE_ENV = 'production'
VUE_APP_MODE = 'uat'
VUE_APP_baseURL = 'https://www.uat.com/'

// package.json
"uat": "vue-cli-service build --mode uat",
```


## fastClick

移动端浏览器会在 touchend 和 click 事件之间，等待300-350ms，判断用户是否会进行双击首饰用以缩放文字（主要是用于修复苹果ios系统的bug）


## vue-router

路由懒加载

```javascript
// 路由懒加载
const Task = () => import("../views/Task.vue");// ES6方式
const routes = [
  {
    path: "/task",
    name: "Task",
    component: (resolve) => require(["../views/Task.vue"], resolve),
    meta: {
      title: "任务",
      keepAlive: false, // 是否需要缓存
      auth: false, // 用户权限
    },
  }
]
```

路由守卫

```javascript
router.beforeEach((to,from,next) => {
  // 路由拦截
  if(!to.meta.auth){
    console.log('无权限')
  }
  // 设置页面标题
  if(to.meta.title){
    document.title = to.meta.title;
  }
  next();
})
```

也可以通过 webpack 中的 require.context(要搜索的目录,是否要搜索子目录,匹配文件的正则表达式) 函数自动注册匹配路由。

```javascript
// 自动注册路由，但是不方便添加meta信息
let tempRouters = [];
const oFiles = require.context("../views", true, /\.vue$/);
oFiles.keys().forEach((element) => {
  // element: ./Task.vue
  let componentName = element.replace(/^\.\//, "").replace(/\.vue$/, "");
  tempRouters.push({
    path: "/" + componentName.toLowerCase(),
    component: () => import("../views/" + componentName),
  });
});
```


## vuex


## webpack-bundle-analyzer

vue-cli4已经支持 webpack-bundle-analyzer 插件的使用了，如果没有用可以直接安装插件应用就行，主要是用于打包分析包大小，用于优化性能分析。

执行命令后会在 dist 文件夹生成一个 report.html 文件可以查看各个依赖包的大小

```shell
npm run build -- --report
```

也可以新增插件配置

```javascript
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
if (process.env.NODE_ENV === "production" && USE_ANALYZER) {
  config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
}
```

安装`cross-env`依赖

```json
"scripts"{
  "analyzer":"cross-env USE_ANALYZER=true npm run build"
}
```


## 生产环境去掉console.log


## splitChunks分包策略

分包策略可以将一些第三方模块的依赖单独生成一个js文件，可以减少公共js文件大小，并且对于没有用到的模块文件，加载解析时候不会有多余的http请求

```javascript
chainWebpack: config => {
  config.optimization.splitChunks({
    // 抽离自定义公共组件
    chunks: 'all',
    minChunks: 1, // 要拆分的chunk最少被引用的次数
    maxSize: 0,
    minSize: 30*1024, // 分割的chunk最小为30kb
    maxAsyncRequests: 5,// 当这个要被拆分出来的包被引用的次数超过5时，则不拆分
    maxInitalRequests: 3,// 当这个要被拆分出来的包最大并行请求大于3时，则不拆分
    automaticNameDelimiter: '~', // 名称链接符
    cacheGroups:{
      // 满足上面的公共规则
      vendors:{
          name: 'vendors', // 拆分之后的名称
          test: /[\\/]node_modules[\\/]js[\\/]jweixin[\\/]/, // 匹配路径
          priority: -10, // 设置优先级 防止和自定义组件混合，不进行打包
          
      },
      html2canvas: { 
        name: 'html2canvas', // 拆分之后的名称
        test: /[\\/]static[\\/]js[\\/]html2canvas[\\/]/, // 匹配路径
        reuseExistingChunk: true
      },
    }
  })
}
```


## externals用cdn链接的方式引入资源

externals 引入方式的作用需谨慎评估，确实能够减少编译包大小，但是需要额外在html文件上添加script标签以引入js文件，这就意味着需要额外的http请求以及更多的解析时间。


```javascript
// vue.config.js
configureWebpack: config => {
  config.externals = {
    // 依赖包名称:赋值给widnow的全局变量名称
    vue: 'Vue',
    'vue-router': 'vueRouter'
  }
}
```

这个时候就可以手动在html模版文件中手动引入依赖包的 cdn 链接，需注意引入依赖之间以及和编译打包后的包先后顺序关系。引入的前后顺序没问题，则可以把 main.js 中 import 引入的依赖语句删除。

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
```

如果有很多个 cdn 链接需要引入，则可以借助 html-webpack-plugin 插件进行插入

```javascript
// vue.config.js
const externalsList = {
  css:[
    "https://cdn.jsdelivr.net/npm/reset.css"
  ],
  js:[
    "https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"
  ]
}
module.exports = {
  configureWebpack: config => {
    config.externals = {
      // 依赖包名称:赋值给widnow的全局变量名称
      vue: 'Vue',
      'vue-router': 'vueRouter'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].cdn = externalsList
        return args
      })
  }
}
```

在 html 模版中引入，可以使用`vue inspect --plugin html`命令来审批配置的一部分

```html
<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
  <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
  <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
<% } %>
  <!-- 使用CDN加速的JS文件，配置在vue.config.js下 -->
<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.js) { %>
  <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
<% } %>
```