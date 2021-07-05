const path = require("path");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
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
    plugins: [],
  },
  // 链式调用
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set("@", path.resolve("src"))
      .set("assets", path.resolve("src/assets"))
      .set("components", path.resolve("src/components"))
      .set("views", path.resolve("src/views"));
    if (process.env.NODE_ENV === "production") {
      config.plugin("webpack-bundle-analyzer").use(BundleAnalyzerPlugin);
    }
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
