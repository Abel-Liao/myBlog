// 引入webpack-merge插件进行合并
const merge = require("webpack-merge");
// 引入webpack.base.conf.js文件
const common = require("./webpack.common.conf");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
module.exports = merge(common, {
  plugins: [
    // 每次打包清除原来的文件
    new CleanWebpackPlugin(),
    // 图片压缩
    new ImageminPlugin({
      test: /.images\/.(jpe?g|png|gif|svg)$/i,
      disable: process.env.NODE_ENV !== "production", // Disable during development
      minFileSize: 10240,
      pngquant: {
        quality: "95-100",
      },
    }),
    // 压缩CSS代码
    new OptimizeCssAssetsPlugin(),
    // js/css 代码压缩
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
    }),
    // sourceMap
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map",
      moduleFilenameTemplate: "[resource-path]",
      append: "\n//# sourceMappingURL=http://127.0.0.1:8080/dist/[url]",
    }),
  ],
  // 提取公用代码
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 0,
      maxSize: 51200,
      name: true,
      minChunks: 1,
      maxInitialRequests: 3,
      maxAsyncRequests: 5,
      automaticNameDelimiter: "~",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: "./common/common",
          chunks: "all",
        },
      },
    },
  },
});
