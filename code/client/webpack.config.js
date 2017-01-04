var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: "#source-map",
  entry: './script/src/main.ts',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  output: {
    path: '../server/public/script/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
