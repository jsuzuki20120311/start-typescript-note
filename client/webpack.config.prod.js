var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var AotPlugin = require('@ngtools/webpack').AotPlugin;
var helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/app.ts',
    vendor: './app/vendor.ts'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      },
      { 
        test: /\.ts$/,
        loader: '@ngtools/webpack'
      }
    ]
  },
  output: {
    path: '../server/public/',
    filename: '[name].js'
  },
  plugins: [
    new AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: helpers.root('app/app.module#AppModule')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    }),
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
        from: './favicon.png',
        to: './'
      }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css']
  }
};
