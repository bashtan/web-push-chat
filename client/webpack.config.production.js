'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router'],
    app: [
      'babel-polyfill',
      './src/index.js'
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[name].[chunkhash].js'
  },
  module: {
    loaders: [{
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          "presets": [["es2015", { modules: false }], "stage-0", "react"],
          "plugins": ['transform-async-to-generator', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.json?$/,
        loader: 'json',
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw', 'autoprefixer?browsers=last 3 versions'],
        include: __dirname,
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: 'url',
        query: { limit: 10240 },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),

    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './index.hbs'
    })
  ],
};
