const fs = require("fs");
const path = require("path");
const {
  isNeedVerbModule,
  hasMainFile,
  hasHtmlFile,
  isDirectory,
  arrUnique,
  getProxyInfo,
  isProd,
} = require("./lenconfig/utils");
const { PORT } = require("./lenconfig/devServer");

const MODULE_PAGE_PATH = path.join(__dirname, "src", "modules");

// 获取需要编译的(部分)模块页面
const getModulePages = (directoryPath) => {
  let needVerbPages = [];
  if (isNeedVerbModule().length > 0) {
    let arrTempDirectory = arrUnique([...isNeedVerbModule()]);
    arrTempDirectory.forEach((directoryName) => {
      let tempDirectory = path.join(MODULE_PAGE_PATH, directoryName);
      if (isDirectory(tempDirectory)) {
        needVerbPages = [...isNeedVerbModule()];
      } else {
        process.stdout.write(
          `\x1b[31m modules目录下不存在${directoryName}模块。\x1b[0m`
        );
        process.exit(0);
      }
    });
  } else {
    fs.readdirSync(directoryPath).forEach((directoryName) => {
      let tempDirectory = path.join(MODULE_PAGE_PATH, directoryName);
      if (isDirectory(tempDirectory)) {
        needVerbPages.push(directoryName);
      } else {
        process.stdout.write(
          `\x1b[31m目录下存在文件${directoryName},请移除或移出至其它目录下。\x1b[0m`
        );
        process.exit(0);
      }
    });
  }
  console.log(
    `即将在===${
      isProd ? process.env.VUE_APP_ENV_CONFIG : "dev"
    }===环境中编译部署`,
    needVerbPages.join(),
    "模块"
  );
  return needVerbPages;
};

// 设置pages的格式
const setVerbPages = () => {
  const tempPages = {};
  getModulePages(MODULE_PAGE_PATH).forEach((directoryName) => {
    let tempHtml = "";
    let tempEntry = "";
    let modulePagePath = `./src/modules/${directoryName}`;
    if (hasMainFile(modulePagePath)) {
      tempEntry = `${modulePagePath}/main.js`;
    } else {
      process.stdout.write(
        `\x1b[31m ${directoryName}目录下缺少入口文件 \x1b[0m`
      );
      process.exit(0);
    }
    if (hasHtmlFile(modulePagePath)) {
      tempHtml = `${modulePagePath}/index.html`;
    } else {
      tempHtml = `./public/index.html`;
    }
    tempPages[directoryName] = {
      entry: tempEntry,
      template: tempHtml,
      filename: `${directoryName}.html`,
      title: `${directoryName}`,
    };
  });
  return tempPages;
};

let pages = { ...setVerbPages() };

module.exports = {
  publicPath: isProd ? "./" : "/",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve("src"))
      .set("components", path.resolve("src/components"));
    if (isProd) {
      // 取消预加载设置
      Object.keys(pages).forEach((page) => {
        config.plugins.delete(`preload-${page}`);
        config.plugins.delete(`prefetch-${page}`);
      });
    }
    // 分包策略
    config.optimization.splitChunks({
      chunks: "all",
      cacheGroups: {
        common: {
          name: "chunk-common",
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
      },
    });
  },
  configureWebpack: (config) => {
    if (isProd) {
      config.optimization.minimizer("terser").tap((options) => {
        // eslint-disable-next-line camelcase
        options[0].terserOptions.compress.drop_console = true;
        // eslint-disable-next-line camelcase
        options[0].terserOptions.compress.drop_console = true;
        // eslint-disable-next-line camelcase
        options[0].terserOptions.compress.compress.drop_debugger = true;
        options[0].terserOptions.output.comments = false;
        return options;
      });
    }
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/style/variables.scss";`,
      },
    },
  },
  pages,
  devServer: {
    port: PORT,
    proxy: getProxyInfo(),
    // 输出eslint警告和错误信息
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
