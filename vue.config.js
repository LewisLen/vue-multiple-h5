module.exports = {
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
