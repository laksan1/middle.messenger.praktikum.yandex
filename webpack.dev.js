// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./webpack.common.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		static: 'dist',
		compress: true,
		port: 3000,
		historyApiFallback: {
			index: '/',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			minify: false,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style-[fullhash].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
				exclude: /(\/fonts)/,
			},
		],
	},
});
