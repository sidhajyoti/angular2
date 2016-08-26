var webpack = require('webpack');
var webpackMerge = require('webpack-merge');

var helpers = require('./helpers');
var commonConfig = require('./webpack.common');


module.exports = webpackMerge(commonConfig, {
  output: {
    path: helpers.root('build')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        API_ENV: JSON.stringify('production')
      }
    })
  ]
});
