var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var basePath = __dirname;

module.exports = {
    cache: true,
    context: path.join(basePath, 'client'),
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    entry: {
        app: './src/index.tsx',
        vendor: [
            'react',
            'react-dom',
            'react-router',
        ],
        appStyles: [
            './css/main.css',
            './css/front/main.css',
            './css/pagination.css',
            './css/add.css'
        ]
    },
    output: {
        publicPath : '/',
        path: path.join(basePath, 'client/dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                options: {
                    useBabel: true,
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            {
                //IMAGE LOADER
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader:'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            // Loading glyphicons => https://github.com/gowravshekar/bootstrap-webpack
            // Using here url-loader and file-loader
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            },
        ],
    },
    // For development https://webpack.js.org/configuration/devtool/#for-development
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.ejs', //Name of file in ./dist/
            template: 'index.ejs', //Name of template in ./src
            hash: true,
        }),
        new CopyWebpackPlugin([
            { from: 'src/locales' ,  to: 'locales' },
        ]),
        new CopyWebpackPlugin([
            { from: 'css' ,  to: 'css' },
        ]),
        new CopyWebpackPlugin([
            { from: 'bower_components' ,  to: 'bower_components' },
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
    ],
};
