var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map', //
    entry: [
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        //publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new CopyWebpackPlugin([
            {from: './index.html', to: './dist/index.html' }
        ])
    ],
    module: {
        loaders: [{
            test: /\.less/,
            loaders: ['style', 'css', 'less'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.json$/,
            loaders: ['json'],
            include: path.join(__dirname, 'src')
        },{
            test: /\.jsx?$/,
            loaders: ['babel'],
            include: path.join(__dirname, 'src')
        }]
    }
};
