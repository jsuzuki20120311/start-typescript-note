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
    path: '../server/public/app/',
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin([
        { 
          from: './app/**/*.html',
          to: '../'
        }
      ],
      {
        ignore: [
          '.DS_Store',
          '.gitkeep'
        ]
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
