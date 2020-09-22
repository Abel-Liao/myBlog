// 引入webpack-merge插件进行合并
const merge = require("webpack-merge");
// 引入webpack.base.conf.js文件
const common = require("./webpack.common.conf");
const path = require("path");
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "../public"),
    port: "8080",
    inline: true,
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    // hot: true // 允许热加载
    // historyApiFallback: true,
    // publicPath: "/"
  },
  plugins: [],
});
