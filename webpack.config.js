const path = require('path');
const webpack = require('webpack');
const argv = require('yargs').argv;

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const currentConfig = argv.profile ? require(`./config/${argv.profile}`) : require('./config/development');

const config = {
    entry: {
        vendor: ['moment', 'lodash'],
        app: [
            './vendor/angular.src.js',
            './src/app.js'
        ]
    },
    output: {
        filename: '[name].js?[hash]',
        path: './../legacy/web/target-frontend/resources/dest',
        chunkFilename: '[id].chunk.js?[chunkhash]',
        publicPath: '/static/resources/dest/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: path.resolve('src')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!less?sourceMap')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url?limit=32768'
            },
            {
                test: /\.html$/,
                loader: 'ng-cache?prefix=[dir]/[dir]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },

            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file'
            }
        ],
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: path.resolve('src')
            }
        ],
        noParse: [
            /angular\.src\.js/
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css', 'style.css?[contenthash]', {allChunks: true}),
        new HtmlWebpackPlugin({
            template: path.resolve('src', 'index.ejs'),
            inject: 'body',
            favicon: path.resolve('src', 'favicon.ico'),
            filename: './../../WEB-INF/views/analyst.jsp'
        }),
        new webpack.DefinePlugin({

            /* This vars should be added in src/.eslintrc, section "globals" */

            /* If 'true' enables request debug for GateApi queries */
            REQUEST_DEBUG: JSON.stringify(currentConfig.REQUEST_DEBUG)
        }),
        new webpack.ContextReplacementPlugin(/moment[\\\/]en/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.bundle.js?[hash]'
        })
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'src', 'src/components']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader'],
        extensions: ['', '.js']
    },
    devServer: {
        historyApiFallback: true,
        stats: {
            chunkModules: false,
            colors: true
        },
        contentBase: './src',
        proxy: {
            '*': currentConfig.REMOTE_URL || 'http://localhost:8080/'
        }
    },
    eslint: {
        configFile: 'src/.eslintrc'
    }
};

if (currentConfig.MINIFY) {
    console.log('This build will be minimized using UglifyJsPlugin.');
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
    config.devtool = 'source-map';
} else {
    config.devtool = 'eval-source-map';
}

module.exports = config;
