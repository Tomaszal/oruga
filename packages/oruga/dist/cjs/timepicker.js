'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./FormElementMixin-980c371b.js');
require('./Input-bb860a9d.js');
require('./MatchMediaMixin-29d33725.js');
require('./trapFocus-8381ef46.js');
require('./DropdownItem-48b70d5b.js');
require('./Select-049fad84.js');
var Timepicker = require('./Timepicker-e6867ce0.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Timepicker.__vue_component__);
  }

};
plugins.use(Plugin);

exports.BTimepicker = Timepicker.__vue_component__;
exports.default = Plugin;
