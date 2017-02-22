var webpack = require('webpack');
module.exports = {
  entry: {
    app: './src/product-app.ts',
    vendor: './src/vendor.ts'
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
    path: '../server/public/dist/',
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
