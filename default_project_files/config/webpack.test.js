var webpack = require('webpack');

var helpers = require('./helpers');
var sentryConfig = require('./sentry.config.json');

var NODE_ENV = sentryConfig.nodeEnv;

module.exports = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src')
  },

  module: {
    preloaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('node_modules', 'rxjs'),
          helpers.root('node_modules', '@angular'),
        ]
      }
    ],

    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          compilerOptions: {

            // Remove TypeScript helpers to be injected
            // below by DefinePlugin
            removeComments: true

          }
        },
        exclude: [/\.e2e\.ts$/]
      }
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }

    ]
  },
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: '../src'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ],
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
