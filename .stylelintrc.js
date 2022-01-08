module.exports = {
  extends: [
    'stylelint-config-standard', 
    'stylelint-config-prettier', 
    
  ],
  plugins: ['stylelint-order','stylelint-scss'],
  ignoreFiles: ["./README.md","./src/assets/style/reset.css"],
  rules: {
    "selector-class-pattern": [
      "^[a-z]([a-z0-9]){1,8}(-[a-z0-9]+)?((-|--)[a-z0-9]+)?$", 
      { 
        "resolveNestedSelectors": true,
        "message":"类名格式不对",
      }
    ],
    "color-hex-case": "lower",
    "selector-max-empty-lines": 1,
    "no-descending-specificity": null,
    "font-family-no-missing-generic-family-keyword": null,
    "value-list-comma-space-after": "always-single-line",
    "max-line-length": 80
  }
};