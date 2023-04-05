// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./webpack.config.js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(config, {
	mode: 'production',
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: false,
				removeComments: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: 'css/style-[fullhash].css',
		}),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
		minimize: true,
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
		],
	},
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
