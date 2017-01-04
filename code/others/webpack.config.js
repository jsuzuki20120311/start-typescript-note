var path = require('path');
module.exports = {
	entry: './script/src/main.ts',
	devtool: "#source-map",
	output: {
		path: __dirname,
		filename: './script/dist/bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
		extensions: ['', '.ts', '.js']
	}
};
