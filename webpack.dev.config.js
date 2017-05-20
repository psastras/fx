const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "./src/index.tsx",
  ],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/'
  },

  devtool: 'inline-source-map',

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
            "plugins": [
              "react-hot-loader/babel"
            ]
          }
        }, "ts-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", { 
          loader: "css-loader",
          options: {
            modules: true,
            camelCase: true,
            importLoaders: 1,
          }
        }, "sass-loader"]
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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },

  resolve: {
    alias: {
      src: path.join(__dirname, "/src"),
    },
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
  },
};