module.exports = function(config) {
  var testWebpackConfig = require('./webpack.test.js');

  config.set({
    basePath: '../',

    // we are using jasmine for testing
    frameworks: ['jasmine'],

    // list of files to exclude
    exclude: [ ],

    // our only entry point
    files: [ { pattern: './config/spec-bundle.js', watched: false } ],

    /*
     * preprocess matching files before serving them to the browser
     * available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
     */
    preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },

    // Webpack Config at ./webpack.test.js
    webpack: testWebpackConfig,

    // this is for the istanbul coverage reporter
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text-summary' },
        { type: 'json' },
        { type: 'html' }
      ]
    },

    // disable webpack
    webpackServer: { noInfo: true },

    /**
     * we aren't actually using mocha for testing
     * mocha here is referring to the karma-mocha-reporter
     * which prints mocha style reporting to the console
     *
     * the coverage reporter is so that istanbul can generate a code
     * coverage report
     */
    reporters: [ 'mocha', 'coverage' ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    /**
     * level of logging
     * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
     */
    logLevel: config.LOG_INFO,

    autoWatch: false,

    // a list of browsers to launch for jasmine testing
    browsers: [
      'PhantomJS'
    ],

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  });

};
