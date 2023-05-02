const { merge } = require( 'webpack-merge' );
const webpackConfigBase = require( './webpack.base.config.js' );

const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );


const webpackConfigDev = {
	entry: {
		main: './example/index.js',
		css: './example/main.css',
	},
	plugins: [
		new HtmlWebPackPlugin( {
			template: './example/main.html',
			filename: './index.html',
			chunks: [ 'main', 'css' ]
		} ),
		new MiniCssExtractPlugin( {
			filename: '[name].css',
			chunkFilename: '[id].css'
		} )
	],
	devServer: {
		static: './dist',
		hot: false,
		setupMiddlewares: ( middlewares, devServer ) => {		

			return middlewares;
		},
		devMiddleware: {
			writeToDisk: true
		}
	},
	devtool: 'inline-source-map',	//inline-source-map necessary instead of source-map for chrome dev tools workspace to work
	mode: 'development'
};

module.exports = merge( webpackConfigBase( true ), webpackConfigDev );
 