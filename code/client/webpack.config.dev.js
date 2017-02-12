var webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: {
    bundle: './script/src/main.ts',
    vendor: './script/src/vendor.ts'
  },
  externals: {
    "jquery": "jQuery"
  },
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
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['bundle', 'vendor']
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
