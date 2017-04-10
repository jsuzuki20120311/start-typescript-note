var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: process.env.NODE_ENV === 'production' ? './app/product-app.ts' : './app/app.ts',
    vendor: './app/vendor.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  output: {
    path: helpers.root('../server/public/'),
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
          from: './favicon.png',
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
    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.html', '.css']
  }
};
