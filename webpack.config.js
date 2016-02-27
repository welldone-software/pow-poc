var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

const npmEvent = process.env.npm_lifecycle_event;
const nodeEnv = process.env.NODE_ENV || 'development';

const distPath = path.join(__dirname, 'dist', nodeEnv);

module.exports = {
  devtool: 'source-map', //'cheap-module-eval-source-map', //'source-map', //
  entry:getEntryPoints(),
  output: {
    path: distPath,
    filename: '[name].[hash].bundle.js',
    publicPath: ''
  },
  plugins: getPlugins(),
  module: {
    noParse: [/node_modules\/html2canvas/],
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


function getEntryPoints(){
  const isDevelopmentServer = npmEvent === 'start';

  return isDevelopmentServer ? [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ] : [
    './src/index'
  ];
}

function getPlugins(){

  const isProductionCode = nodeEnv === 'production';
  const isDevelopmentServer = npmEvent === 'start';

  const plugins = [
    new CleanWebpackPlugin(distPath),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'html!./src/index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
    isDevelopmentServer ? new webpack.HotModuleReplacementPlugin() : null,
    isProductionCode ? new webpack.optimize.OccurenceOrderPlugin() : null,
    isProductionCode ? new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }) : null
  ];

  return plugins.filter(p => !!p);
}