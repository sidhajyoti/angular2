var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var helpers = require('./helpers');
var commonConfig = require('./webpack.common');
var sentryConfig = require('./sentry.config.json');

// extract they configured ports from config json
var DEV_PORT = sentryConfig.webpackPort;
var PROXY_PORT = sentryConfig.apiPort;
var NODE_ENV = sentryConfig.nodeEnv;
var API_ENV = sentryConfig.apiEnv;

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  // configuration for the webpack development server
  devServer: {
    historyApiFallback: {
      index: '/'
    },
    // headers: { "Access-Control-Allow-Origin": "*" },
    stats: 'minimal',
    port: DEV_PORT,
    // this will be enabled once we have a backend
    // proxy: {
    //   '*': 'http://localhost.sentry.com/'
    // },
    outputPath: helpers.root('build')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        API_ENV: JSON.stringify(API_ENV)
      }
    })
  ]
});
