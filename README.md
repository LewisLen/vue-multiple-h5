# vue-multiple-cli

create mutiple page by vue-cli4.5.15

多应用，看这个工程就够了，开箱即用。

本工程是基于@vue/cli4.5.15版本搭建的多页面应用，主要是将单页面应用改造成多页面(模块)应用，使其一个脚手架可以开发多个互不影响的模块，同时又可以共用一些公共组件和方法，非常适合公司功能非常多的应用。

## 安装使用

```shell
git clone git@github.com:LewisLen/vue-multiple-h5.git
npm install
# 这里是以逗号或者分隔模块名称
npm run serve -- --module vip,page
npm run dev -- --module vip_page
# 模块打包
npm run build -- --module vip,page
npm run build -- --module vip_page
# 不同环境
npm run build:uat -- --module vip_page
# 全量本地启动即devServe
npm run serve
# 全量打包
npm run build
```

## 多模块应用构建

构建多模块应用的关键就是`module.exports`中的`pages`关键词，最终需要把`pages`变成下述格式

```javascript
pages:{
  vip: {
    entry: './src/modules/vip/main.js',
    template: './public/index.html',
    filename: 'vip.html'
  },
  page: {
    entry: './src/modules/page/main.js',
    template: './public/index.html',
    filename: 'page.html'
  }
}
```

执行几个模块编译需要借助`argv`获取命令行中的参数，通过`--`后边可以添加参数，本工程是以下划线(_)或者逗号(,)进行分割，可以指定多个部分模块进行编译打包。

> 也可以使用 minimist 模块来获取 argv 字段


## 移动端H5适配

### 方案1：rem+lib-flexible

采用的的`lib-flexible`方案，搭配`postcss-pxtorem`插件可以直接在开发过程中用px做单位，插件会根据配置自动转化成rem，就可以直接在项目中写`px`单位，需要注意的是，本工程默认设计稿为 750px。

需要在 main.js 中引入 lib-flexible.js 或者直接在模板的 html 文件中引入该方案

```shell
npm install lib-flexible --save
npm install postcss-pxtorem --save-dev
```

```javascript
//mian.js
import 'lib-flexible/flexible.js'
// .postcssrc.js文件
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

### 方案2: vm/vh适配方案

安装单位转换插件

```shell
# 自动转换px单位
npm install postcss-px-to-viewport -D
```

新增 postcss 相关配置

```javascript
// .postcssrc.js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    }
  }
}
```

> 脚手架采用的是方案2，方案2可能存在一些兼容性问题，特别是一些低版本手机浏览器。方案1和方案2不要混合使用。


## 封装axios

安装`axios`和`qs`，利用 interceptors 拦截器对 axios 请求进行封装

```javascript
// 引用方式一 main.js
import request from "@/request";
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
// 自动注册路由
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


## 预编译语言

直接安装对应的loader即可

```shell
# sass
npm install -D sass-loader@10.1.1 sass
```

配置可以使用全局变量

```javascript
css: {
  sourceMap: false,
  loaderOptions: {
    scss: {
      // 全局都可以使用的样式
      prependData: `@import "@/assets/style/variables.scss";`,
    },
  },
},
```

> 需注意 sass-loader 版本问题，用最新版有可能会出现编译报错的问题，最好是使用 sass-loader@10.1.1 版本
> 注意 `@import "@/assets/css/variables.scss";` 后边需要加`;`


## 生产环境去掉console.log

vue-cli4 自带有去除console的插件 terser-webpack-plugin 所以直接使用即可

```javascript
if (process.env.NODE_ENV === "production") {
  config.optimization.minimizer("terser").tap((options) => {
    options[0].terserOptions.compress.drop_console = true;
    return options;
  });
}
```



## git提交规范

为了规范git提交commit信息，需要借助`husky`、`lint-staged`和`commitlint`工具。husky是一款Git Hook工具，可以在 git 的各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。而 lint-staged 的作用就是只校验 git 提交到暂存区的文件，而避免校验全部文件。

```shell
npx husky-init && npm install       # npm方式
npx husky-init && yarn              # Yarn 1方式
yarn dlx husky-init --yarn2 && yarn # Yarn 2方式
```

执行命令会新增`husky`依赖，在根目录下创建`.husky`目录并且会生成初始化`pre-commit`

```json
"scripts":{
	"prepare":"husky install"
}
```

生成初始化的`.husky/pre-commit`文件

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx test
# 改为以下内容，则会在commit时执行以下命令，会校验所有js和vue文件
eslint --fix .src --ext .vue,.js.ts
```

此时需要借助`lint-staged`

```shell
npm install lint-staged -D
```

更改package.json配置信息
```json
"lint-staged": {
	"src/**/*.{js,json,vue,ts,tsx}": "eslint --fix"
}
```

`.husky/pre-commit`文件
```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

至此，在每次commit的时候，就会校验add文件是否符合eslint规范，如不符合则不允许提交

### commitlint

```shell
# @commitlint/cli为git commit校验
# @commitlint/config-conventional规范也可以换成@commitlint/config-angular
npm install @commitlint/config-conventional @commitlint/cli -D
```

创建`commitlint.config.js`并配置信息
```javascript
module.exports = {
  extends: ["@commitlint/config-conventional"]
  // 也可以换成["@commitlint/config-angular"]标准
};
```

在`.husky`目录下创建`commit-msg`文件验证commit message提交信息

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

至此，在每次commit的时候，就会先校验add文件是否符合eslint规范，如不符合则不允许提交。然后再校验commit message是否符合规范，必须是以下几种类型。

- build：编译相关的修改，例如发布版本、对项目构建或者依赖的改动
- chore: 改变构建流程、或者增加依赖库、工具等
- ci: 持续集成工具类改动
- docs: 文档改动
- feat: 新功能(业务)模块，新特性
- fix: 修复bug
- perf: 优化相关，比如提升性能、体验
- refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
- revert: 回滚代码
- style: UI走查，css样式改动
- test: 测试用例，包括单元测试、集成测试等

如果是 vue-cli 改造，则有可能会有冲突，因为在安装之后，@vue/cli-service 也会安装 yorkie，且yorkie fork 自 husky 不兼容。如果还有问题，可以尝试删除 .git/hooks/ 下面的 pre-commit 和 commit-msg 文件再试试，按照 husky 官网再试试。

```json
"lint-staged": {
  "src/**/*.{js,json,ts,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "src/**/*.{html,css,scss,sass}": [
    "stylelint --fix"
  ],
  "src/**/*.vue": [
    "prettier --write",
    "eslint --fix",
    "stylelint --fix"
  ]
}
```

> 如果有`.DS_Store`文件，可以执行`sudo find . -name "*.DS_Store" -type f -delete`命令来删除


## stylelint(选用)

安装相关依赖，特别需要注意版本，我在这个lint浪费了不少时间，最后发现都是插件版本的问题。

vscode extension 的 stylelint 版本建议是`0.87.6`，依赖建议如下版本：

```json
"stylelint": "^13.13.1",
"stylelint-config-prettier": "^9.0.3",
"stylelint-config-standard": "^22.0.0",
"stylelint-loader": "^5.0.0",
"stylelint-scss": "^4.1.0",
```

添加`.stylelintrc.js`文件，并且做规则限制

```javascript
module.exports = {
  extends: [
    'stylelint-config-standard', 
    'stylelint-config-prettier', 
    
  ],
  plugins: ['stylelint-order','stylelint-scss'],
  ignoreFiles: ["./README.md","./src/assets/style/reset.css"],
  rules: {
    "selector-class-pattern": [
      // 规范class类名.box-element-modifier
      "^[a-z]([a-z0-9]){1,8}(-[a-z0-9]+)?((-|--)[a-z0-9]+)?$", 
      { 
        "resolveNestedSelectors": true,
        "message":"类名格式不对",
      }
    ],
    // ...
  }
};
```

## 参考文章

- [husky官网](https://typicode.github.io/husky/#/?id=manual)
- https://juejin.cn/post/6951649464637636622#heading-12
- [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional)
- https://github.com/sunniejs/vue-h5-template