var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var cssProdLoader = ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?url=false', 'sass-loader'] });
var cssDevLoader = ['style-loader', 'css-loader?url=false', 'sass-loader'];
var cssLoader = process.env.NODE_ENV === 'production' ? cssProdLoader : cssDevLoader;

module.exports = {
	
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/app.bundle.js'
	},

	devServer: {
  	contentBase: path.join(__dirname, "dist"),
  	compress: true,
  	port: 3000,
  	stats: 'errors-only',
  	hot: true,
  	open: true
	},

	module: {
    rules: [
	    {
	      test: /\.(scss|sass)$/,
	      use: cssLoader
	    },
			{ test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{ test: /\.(jpe?g|png|gif)$/i, 
				use: [
						'file-loader?name=img/[name].[ext]', 
						'image-webpack-loader?bypassOnDebug'
						]
			},
			{ test: /\.(eot|svg|ttf|woff|woff2|otf)$/, 
				use: ['file-loader?name=fonts/[name].[ext]']
			},
			{
	      test: /\.html$/,
	      use: 'html-loader'
	    },
    ]
  },

	plugins: [
		new HtmlWebpackPlugin({
			title: 'Home template',
			filename: 'index.html',
			template: './src/templates/index.html',
			hash: true,
			minify: {
				collapseWhitespace: process.env.NODE_ENV === 'production' ? true : false
			}
		}),
		new HtmlWebpackPlugin({
			title: 'About template',
			filename: 'about.html',
			template: './src/templates/about.html',
			hash: true,
			minify: {
				collapseWhitespace: process.env.NODE_ENV === 'production' ? true : false
			}
		}),
    new ExtractTextPlugin({
    	filename: "css/app.bundle.css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
	]
}