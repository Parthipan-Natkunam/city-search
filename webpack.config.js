const webpack = require("webpack");
const dotEnv = require("dotenv");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = dotEnv.config().parsed;

const envVariables = Object.keys(env).reduce((acc, curr) => {
  acc[`process.env.${curr}`] = JSON.stringify(env[curr]);
  return acc;
}, {});

module.exports = () => {
  return {
    entry: "./src/index.tsx",
    target: "web",
    mode: "production",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: "awesome-typescript-loader",
        },
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "source-map-loader",
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new webpack.DefinePlugin(envVariables),
    ],
  };
};
