// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name]-[fullhash].js',
		chunkFilename: 'js/[name]-[fullhash].js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /^(?!.*\.test).*\.tsx?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.hbs$/,
				loader: 'handlebars-loader',
				options: {
					helperDirs: path.join(__dirname, 'src/handlebars-helpers'),
				},
			},
			{
				test: /\.(woff|woff2|ttf|eot|otf)([\?]?.*)$/,
				use: [
					{
						loader: 'file-loader?name=fonts/[name].[ext]',
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: 'static',
					to: './',
				},
			],
		}),
	],
};
