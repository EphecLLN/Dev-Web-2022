const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const port = process.env.PORT || 8080

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  output: {
    clean: true,
    filename: "scripts/[name].[fullhash].js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              // localsConvention: 'camelCase',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.json$/,

      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      // TODO: Use a .ico file ?
      favicon: "public/images/favicon.png",
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: "**/*",
        context: "public",
        globOptions: {
          gitignore: true,
          ignore: ["**/*.html", "**/*.ico"],
        }
      }],
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
}
