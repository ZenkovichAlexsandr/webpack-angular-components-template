var path = require('path');
var webpack = require('webpack');
var hasCoverage = global.process.argv.reduce(function (result, arg) {
    return arg.indexOf('coverage') !== -1 || result;
});
var autoprefixer = require('autoprefixer');

var include = [
    path.resolve('./src')
];

var preLoaders = hasCoverage ? [

    // Process test code with Babel
    {test: /_spec\.js$/, loader: 'babel', include: include},

    // Process all non-test code with Isparta
    {test: /\.js$/, loader: 'isparta', include: include, exclude: /_spec\.js$/}
] : [
    {test: /\.js$/, loader: 'babel', include: include}
];
var loaders = [
    {
        test: /\.less$/,
        loader: 'style!css?sourceMap!postcss!less?sourceMap'
    },
    {
        test: /\.css$/,
        loader: 'style!css?sourceMap'
    },
    {
        test: /\.(png|jpg|gif)$/,
        loader: 'url?limit=32768'
    },
    {
        test: /\.json$/,
        loader: 'json'
    },
    {
        test: /\.html$/,
        loader: 'ng-cache?prefix=[dir]/[dir]'
    },
    {
        test: /\.po$/,
        loader: 'json!angular-gettext?format=json'
    },
    {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'
    }
];

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'spec.js'
        ],
        webpack: {
            resolve: {
                modulesDirectories: ['node_modules', 'src']
            },
            resolveLoader: {
                modulesDirectories: ['node_modules'],
                moduleTemplates: ['*-loader'],
                extensions: ['', '.js']
            },
            devtool: 'eval',
            module: {
                loaders: loaders,
                preLoaders: preLoaders
            },
            postcss: [
                autoprefixer({
                    browsers: ['last 8 versions']
                })
            ],
            plugins: [
                new webpack.DefinePlugin({
                    SERVER_URL: JSON.stringify('http://localhost:3000/'),
                    REQUEST_DEBUG: JSON.stringify('true')
                })
            ],
            cache: true
        },
        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true
            }
        },
        preprocessors: {
            'spec.js': ['webpack']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: 'coverage/',
            subdir: '.',
            reporters: [
                {type: 'cobertura', file: 'cobertura.xml'},
                {type: 'text', file: 'text.txt'},
                {type: 'text-summary', file: 'text-summary.txt'},
                {type: 'html'}
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
