// 压缩css
const cssnano = require("cssnano");
// 添加不同前缀
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      autoprefixer,
      cssnano({
        preset: "default",
      }),
      {
        // Options
      },
    ],
  ],
};
