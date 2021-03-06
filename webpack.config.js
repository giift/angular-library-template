var path = require("path");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

if (process.argv[2])
    var PROD = true

module.exports = {
    entry: {
        'angular-module-library': path.join(__dirname, "/dist/index.js")
        // 'angular-module-library': path.join(__dirname, "/src/index.ts")
    },

    output: {
        path: path.join(__dirname, "dist/bundles"),
        filename: PROD ? "[Name].min.js" : "[name].js",
        library: ["[name]"],
        libraryTarget: "umd"
    },

    externals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        'rxjs/Observable': 'Rx',
        'rxjs/ReplaySubject': 'Rx',
        'rxjs/add/operator/map': 'Rx.Observable.prototype',
        'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
        'rxjs/add/observable/fromEvent': 'Rx.Observable',
        'rxjs/add/observable/of': 'Rx.Observable'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: !PROD ? [
        // new CheckerPlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './package-dist.json'), to: path.join(__dirname, './dist/package.json')
            }
        ])
    ] : []
};