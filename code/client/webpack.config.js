module.exports = {
  devtool: "source-map",
  entry: './script/src/main.ts',
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
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
