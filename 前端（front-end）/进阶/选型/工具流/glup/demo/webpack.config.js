const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const basicConfig = {
	module: {
		rules: [
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			}
		]
	},
	resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
	plugins: [
		// 抽离公共模块
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors'
		})
  ],
};

const devConfig = {
	output: {
		path: path.resolve(__dirname, "build"),
		filename: '[name].js'
	}
};

const proConfig = {
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].[chunkhash:8].js'
	}
};

module.exports = process.env.NODE_ENV === "dev" ?
	merge(basicConfig, devConfig) : merge(basicConfig, proConfig);
