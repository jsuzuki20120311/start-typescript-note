var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/app.ts',
    vendor: './app/vendor.ts'
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
    new CopyWebpackPlugin([
        {
          from: './index.html',
          to: './'
        },
        {
          from: './styles/*.css',
          to: './'
        },
        {
          from: './app/**/*.html',
          to: './',
          flatten: true
        },
        {
          from: './app/**/*.css',
          to: './',
          flatten: true
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
    extensions: ['.ts', '.js', '.html', '.css']
  }
};
