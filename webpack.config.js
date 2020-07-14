let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let TerserWebpackPlugin = require('terser-webpack-plugin');
let webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () =>{
    const config = {  }
    // {splitChunks:{ chunks: 'all' }}
    if(isProd){ config.minimizer = [new TerserWebpackPlugin()] }
    return config
}

module.exports =  {
	entry: {
        main:'./resources/js/app.js',
        admin:'./resources/js/admin/app.js',
    },
	output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './public/js/'),
        //publicPath: '/public/js/',
	},
    resolve:{
        extensions:['.js','.json','.scss'],
        alias:{
            '@scss': path.resolve(__dirname, 'resources/scss'),
            '@core': path.resolve(__dirname, 'resources/js/core'),
            '@js': path.resolve(__dirname, 'resources/js'),
            //'@': path.resolve(__dirname, 'src'),
        }
    },
    optimization:optimization(),
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
	module: {
		rules: [
			{
				test: /\.js$/,
                exclude: '/node_modules/',
                use:[
                        {
                            loader: 'babel-loader',
                            options:{
                                presets:['@babel/preset-env'],
                                plugins:['@babel/plugin-proposal-class-properties']
                            },
                        }
                ]
			},
            {
                test: /\.scss$/,
                use: [
                    //'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader?url=false',
                    {
                        loader:'postcss-loader',
                        options:{ sourceMap:true, config: {path: 'resources/js/postcss.config.js'} },
                    },
                    'sass-loader',
                ],
            }

		]
	}
};
