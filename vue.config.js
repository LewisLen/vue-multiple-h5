const path = require("path");
module.exports = {
  // 部署应用包时的基本 URL
  publicPath: "./",
  // 打包前默认会被清除 默认为dist
  outputDir: "dist/static",
  // 放置静态资源的目录
  assetsDir: "static",
  // 指定index.html
  indexPath: "index.html",
  // 是否为运行时版本（不包含编译器）
  runtimeCompiler: false,
  // 生产环境是否需要source map
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
    },
  },
  // 链式调用
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set("@", path.resolve("src"))
      .set("assets", path.resolve("src/assets"))
      .set("components", path.resolve("src/components"))
      .set("views", path.resolve("src/views"));
    const cdn = {
      js: [
        "https://unpkg.com/vue@2.6.11/dist/vue.min.js",
        "https://unpkg.com/vue-router@3.2.0/dist/vue-router.min.js",
      ],
    };
    config.plugin("html").tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
    config.optimization.splitChunks({
      // 抽离自定义公共组件
      chunks: "all",
      minChunks: 1, // 要拆分的chunk最少被引用的次数
      maxSize: 0,
      minSize: 30 * 1024, // 分割的chunk最小为30kb
      maxAsyncRequests: 5, // 当这个要被拆分出来的包被引用的次数超过5时，则不拆分
      maxInitalRequests: 3, // 当这个要被拆分出来的包最大并行请求大于3时，则不拆分
      automaticNameDelimiter: "~", // 名称链接符
      cacheGroups: {
        //  满足上面的公共规则
        vendors: {
          name: "vendors", // 拆分之后的名称
          test: /[\\/]node_modules[\\/]js[\\/]jweixin[\\/]/, // 匹配路径
          priority: -10, // 设置优先级 防止和自定义组件混合，不进行打包
        },
        default: {
          minChunks: 2, // 要拆分的chunk最少被引用的次数
          priority: -20,
          reuseExistingChunk: true, //	如果该chunk中引用了已经被打包，则直接引用该chunk，不会重复打包代码
        },
        html2canvas: {
          name: "html2canvas", // 拆分之后的名称
          test: /[\\/]static[\\/]js[\\/]html2canvas[\\/]/, // 匹配路径
          reuseExistingChunk: true,
        },
      },
    });
  },
  // 选项...
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3999",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
    // 输出eslint警告和错误信息
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
