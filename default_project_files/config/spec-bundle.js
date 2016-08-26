
/**
 * This file gets is the bundle that is used for testing.
 * Sort of like the polyfills or vendor file we load.
 * At the bottom we are importing the actual test files.
 */

Error.stackTraceLimit = Infinity;

require('core-js');
require('ts-helpers');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');

require('rxjs/Rx');

// Set up Angular2s testing tools
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

// var testContext = require.context('../src', true, /\.spec\.ts/);
//
// function requireAll(requireContext) {
//   return requireContext.keys().map(requireContext);
// }
//
// // requires and returns all modules that match
// var modules = requireAll(testContext);
//


/*
 * Add all tests here.
 */

require('../src/components/app/app.component.spec.ts');
require('../src/components/dashboard/dashboard.component.spec.ts');
