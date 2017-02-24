var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/product-app.ts',
    vendor: './app/vendor.ts'
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
    path: '../server/public/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
