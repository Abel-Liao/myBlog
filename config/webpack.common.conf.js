const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
    chunkFilename: "dist/[name].[hash].chunk.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js", ".jsx"]
  },
  module: {
    rules: [
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          // {
          //   loader: "style-loader" // creates style nodes from JS strings
          // },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader" // compiles Less to CSS
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|bmp|jfif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:8].[ext]",
              outputPath: "images",
              limit: 8192
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "My Blog",
      hash: true,
      template: path.resolve(__dirname, "../public/index.html"),
      minify: {
        // 压缩选项
        collapseWhitespace: true
      }
    }),
    // 分离css
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash].css"
    })
  ]
};
