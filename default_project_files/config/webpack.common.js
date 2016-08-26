var webpack = require('webpack');
var ExtracTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');

var BrandAssetsPlugin = require('./brand-assets-plugin');
var helpers = require('./helpers');
var sentryConfig = require('./sentry.config.json');

var dataURLLimit = 1000;
var fontsName = 'fonts/[name].[hash].[ext]';
var imagesName = 'images/[name].[hash].[ext]';

var extractCSS = new ExtracTextPlugin('stylesheets/[name].[hash].css');

var commonPlugins = [
  extractCSS,
  new BrandAssetsPlugin({
    commonEntries: [
      'vendor',
      'polyfills'
    ]
  }),
  new CopyWebpackPlugin([
    {
      from: './src/assets',
      to: './assets'
    },
    {
      from: './src/**/*.html',
      to: './templates',
      ignore: './src/html/**',
      flatten: true
    }
  ]),
  new ForkCheckerPlugin(), // this allows type checking to occur in a separate process thanks to awesome-typescript-loader
  new webpack.optimize.OccurenceOrderPlugin(true), // small optimization to give common deps a lower number when requiring
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: [
      'app',
      'vendor',
      'polyfills'
    ],
    minChunks: Infinity
  }),
  new AssetsPlugin({
    filename: 'assets.json',
    fullPath: true,
    prettyPrint: true,
    path: helpers.root('./build') // output to build for now
  })
];

module.exports = {
  isDevServer: helpers.isWebpackDevServer(),
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': [
      './src/vendor.ts',
      './src/scss/vendor.scss'
    ],
    'app': [
      './src/main.ts'
    ],
    'dairylandinsurance': [
      './src/scss/brand/dairylandinsurance/dairylandinsurance.scss'
    ],
    'sentry': [
      './src/scss/brand/sentry/sentry.scss'
    ]
  },
  output: {
    path: helpers.root('build'),
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].chunk.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.scss'],
    root: helpers.root('src'),
    modulesDirectories: ['node_modules']
  },
  module: {
    preLoaders: [
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
    noParse: [
      helpers.root('node_modules', 'zone.js', 'dist')
    ],
    loaders : [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=' + dataURLLimit + '&mimetype=application/font-woff&name=' + fontsName
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=' + dataURLLimit + '&mimetype=application/font-woff&name=' + fontsName
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=' + dataURLLimit + '&mimetype=application/octet-stream&name=' + fontsName
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=' + fontsName
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=' + dataURLLimit + '&mimetype=image/svg+xml&name=' + fontsName
      },
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-compiled'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: extractCSS.extract('css?sourceMap!postcss!sass?sourceMap')
      }
    ]
  },
  plugins: helpers.generateHtmlWebpackPlugins(commonPlugins, sentryConfig.availableBrands, sentryConfig.indexSubDir, sentryConfig.debugBrand),
  tslint: {
    emitErrors: true,
    resourcePath: 'src'
  },
  postcss: function() { // postcss configuration is actually a function
    return [
      autoprefixer
    ];
  },
  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
};
