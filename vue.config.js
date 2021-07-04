const path = require("path");
module.exports = {
  publicPath: "./",
  outputDir: "dist/static",
  assetsDir: "static",
  indexPath: "index.html",
  runtimeCompiler: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set("@", path.resolve("src"))
      .set("assets", path.resolve("src/assets"))
      .set("components", path.resolve("src/components"))
      .set("views", path.resolve("src/views"));
  },
  // 选项...
  devServer: {
    proxy: {
      "/api": {
        target: "http://172.20.10.5:3999",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
