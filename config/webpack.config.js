const webpack = require('webpack');
const HtmlWebpackConfig = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


// 在这里切换
const ENV = 'gitv';

const consts = require('./const.js')[ENV];

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/main.js',
    output: {
        path: consts.OUTPUT_PATH,
        filename: '[name].js'
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新
        host: 'localhost'
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // vue-loader options
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackConfig({
            template: './src/index.tmpl.html',
            filename: 'index.html',
            favicon: './src/img/favicon.ico'
        }),
        new webpack.DefinePlugin({
            ROUTER_ROOT_PATH: JSON.stringify(consts.ROUTER_ROOT_PATH)
        }),
        new CleanWebpackPlugin(ENV == 'gitv' ? ['gitpages'] : ['public'])
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    }
}