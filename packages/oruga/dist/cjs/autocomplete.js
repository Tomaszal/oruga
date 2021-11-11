'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./FormElementMixin-980c371b.js');
require('./Input-bb860a9d.js');
var Autocomplete = require('./Autocomplete-e6762bab.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Autocomplete.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OAutocomplete = Autocomplete.__vue_component__;
exports.default = Plugin;
