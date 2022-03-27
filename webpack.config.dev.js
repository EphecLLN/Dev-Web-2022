const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
  mode: "development",
  entry: {
    client: {
      import: ["webpack-hot-middleware/client", "./client/index.js"],
    },
  },
  output: {
    filename: "scripts/[name].[fullhash].js",
  },
  devtool: "inline-source-map",
  resolve: {
    // Order matters !
    extensions: [".js", ".ts", ".json", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
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
      patterns: [
        {
          from: "**/*",
          context: "public",
          globOptions: {
            gitignore: true,
            ignore: ["**/*.html", "**/*.ico"],
          },
        },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: { sockIntegration: "whm" },
    }),
  ],
}
