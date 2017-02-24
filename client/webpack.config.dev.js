var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/app.ts',
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
    filename: 'app/[name].js'
  },
  plugins: [
    new CopyWebpackPlugin([
        {
          from: './index.html',
          to: './'
        },
        {
          from: './app/**/*.html',
          to: './'
        },
        {
          from: './app/**/*.css',
          to: './'
        }
      ],
      {
        ignore: [ '.DS_Store', '.gitkeep' ]
      }
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
