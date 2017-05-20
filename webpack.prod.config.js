const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: './src/index.tsx',
    vendor: ['react', 'react-dom', 'react-router', 'three', 'color', 'postprocessing']
  },

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },

  devtool: 'source-map',

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
        test: /\.js?$/,
        use: {
          loader: "babel-loader",
          options: {
            "presets": [
              ["es2015", {
                "modules": false
              }],
            ]
          }
        },
        include: [path.resolve("node_modules/postprocessing")],
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  ],

  resolve: {
    alias: {
      src: path.join(__dirname, "/src"),
      react: 'react-lite',
      'react-dom': 'react-lite'
    },
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", ".jsx"],
  },
};