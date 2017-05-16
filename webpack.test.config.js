const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const glob = require("glob");
const _ = require("lodash");

module.exports = {
  devtool: "inline-source-map",

  entry: _.keyBy(glob.sync("./test/**/*.ts*"), (key) => key),

  externals: [nodeExternals()],

  module: {
    rules: [{
        test: /\.tsx?$/,
        use: [{
          loader: "babel-loader",
          options: {
            "presets": [
              ["es2015", {
                "modules": false
              }],
              "stage-2",
              "react"
            ],
          }
        }, "ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|svg|ttf|json)/,
        use: ["file-loader"]
      },
      {
        test: /\.(vert|frag)/,
        use: ["raw-loader"]
      },
    ],
  },

  output: {
    filename: "[name].js",
    path: __dirname + "/.build",
  },

  resolve: {
    alias: {
      src: path.join(__dirname, "/src"),
    },
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
  },

  target: "node"
};