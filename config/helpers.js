/**
 * @author 078295 <ricardo.lopez@sentry.com>
 */

var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var _root = path.resolve(__dirname, '..');

/**
 * root - helper function to generate a full path name
 * relative to the root of the project
 *
 * @param  {String|Array} args arguments from which to build the full path name
 * @return {String}      the full path name
 */
function root(args) {
  args = Array.prototype.slice.call(arguments,  0);
  return path.join.apply(path, [_root].concat(args));
}


/**
 * isWebpackDevServer - helper function to check if webpack-dev-server
 * is the process in which we're running
 *
 * @return {Boolean}  true if we are running the webpack dev server false otherwise
 */
function isWebpackDevServer() {

  // the assumption here is that the first argument is the webpack-dev-server command
  return process.argv[1] && !!(/webpack-dev-server(.js)?$/.exec(process.argv[1]));
}

function generateHtmlWebpackPlugins(plugins, availableBrands, subDir, selectedBrand) {

  /**
   * since the webpack dev server is running we will only compile the selectedBrand's
   * template since it's the only one that is usable with angular2
   */
  if (isWebpackDevServer() && selectedBrand) {
    var brandTemplateName = selectedBrand + '.ejs';

    plugins.push(new HtmlWebpackPlugin({
      brandName: selectedBrand,
      chunksSortMode: 'dependency',
      inject: false, // we will do the injecting manually
      template: root('src', 'html', brandTemplateName)
    }));
  }
  else {

    // go through
    availableBrands.forEach(function(brandName) {
      var config = {};
      var brandTemplateName = brandName + '.ejs';

      config.brandName = brandName;
      config.chunksSortMode = 'dependency';
      config.inject = false; // we will do the injecting manually
      config.template = root('src', 'html', brandTemplateName);

      // set the filename so that HtmlWebpackPlugin doesn't default it to index.html
      config.filename = subDir + '/' + brandName + '.html';

      // add a new configured plugin to the list of plugins
      plugins.push(new HtmlWebpackPlugin(config));
    });
  }

  return plugins;
}

exports.root = root;
exports.isWebpackDevServer = isWebpackDevServer;
exports.generateHtmlWebpackPlugins = generateHtmlWebpackPlugins;
