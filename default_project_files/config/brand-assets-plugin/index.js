/**
 * @author 078295 <ricardo.lopez@sentry.com>
 */

function BrandAssetsPlugin(props) {
  this.commonEntries = props.commonEntries;
}

BrandAssetsPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('compilation', function(compilation) {

    compilation.options.brandAssets = compilation.options.brandAssets || {};

    compilation.plugin('html-webpack-plugin-before-html-generation', function(htmlPluginData, callback) {
      var currentBrand = htmlPluginData.plugin.options.brandName;
      var brandAssets = extractBrandAssets(htmlPluginData.assets, self.commonEntries, currentBrand);

      compilation.options.brandAssets = brandAssets;
      // console.log('\n\n\n\nbrand assets for ' + currentBrand + ': ' , JSON.stringify(compilation.options.brandAssets, null, 2));
      callback(null, htmlPluginData)
    })
  })
};


/**
 * extractAssets - a private function that will extract css and js file names from
 * the fileList they exist in the checkList
 *
 * @param  {Array} fileList  the list of files from which to extract from
 * @param  {Array} checkList the list of entry names that we check against
 * @return {Array}           the array of all extracted file names
 */
function extractAssets(fileList, checkList) {

  // first map each [filename].[hash].[ext] to
  // just be filename
  var entries = fileList.map(function(val) {

    // we'll remove the prefix since part of
    // the path and not the filename
    var name = val.substr(1 + val.lastIndexOf('/')).split('.')[0];

    return {entryName: name, entry: val };
  }).reduce(function(arr, val) {

    // check to see if the value exists in the checkList
    // and add it to the array if it does
    if (checkList.indexOf(val.entryName) > -1) {
      arr.push(val.entry);
    }

    return arr;
  }, []);

  return entries;
}


/**
 * extractBrandAssets - extracts the javascript and css files needed to render
 * this brand's portal.
 *
 * @param  {Object} files         an object that holds generated js and css asset names
 * @param  {Array} globalEntries a list of entries that are required for any brand build
 * @param  {String} brand         The current brand name that we want the assets for
 * @return {Object}               an object that holds the final lists generated
 *                                js and css file names required for the given brand
 */
function extractBrandAssets(files, globalEntries, brand) {
  var assets = { js: [], css: [] };
  var appJS;
  var appCSS;

  if (!!files) {

    // extract all the js files that we know are required
    if (files.js && files.js.length) {
      assets.js = extractAssets(files.js, globalEntries);
    }

    // extract the app.js file if it exists. it should be loaded last
    appJS = (!!files.chunks.app) ? files.chunks.app.entry : false;

    if (appJS) {
      assets.js.push(appJS);
    }

    // extract all the css files that we know are required
    if (files.css && files.css.length) {
      assets.css = extractAssets(files.css, globalEntries);
    }

    // extract the brand css if it exists. this should also be loaded last
    appCSS = (!!files.chunks[brand]) ? files.chunks[brand].css : false;

    if (appCSS && appCSS.length) {
      assets.css.push(appCSS[0]);
    }

  }

  return assets;
}

module.exports = BrandAssetsPlugin;
