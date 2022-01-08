module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "camelcase": 2, // 除了常量 命名采用骆驼拼写法variableName
    "no-cond-assign": 2, // 禁止在条件中使用常量表达式
    "no-unused-expressions": 2, // 禁止出现未使用过的表达式
    "no-dupe-args": 2, // 禁止 function 定义中出现重名参数
    "no-use-before-define": 2, // 禁止在变量定义之前使用它们
    "no-unused-vars": 2, // 禁止出现未使用过的变量
    "eqeqeq":2 // 要求使用 === 和 !==
  },
};
