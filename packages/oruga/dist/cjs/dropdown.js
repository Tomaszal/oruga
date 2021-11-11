'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./MatchMediaMixin-29d33725.js');
require('./trapFocus-8381ef46.js');
var DropdownItem = require('./DropdownItem-48b70d5b.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, DropdownItem.__vue_component__);
    plugins.registerComponent(Vue, DropdownItem.__vue_component__$1);
  }

};
plugins.use(Plugin);

exports.ODropdown = DropdownItem.__vue_component__;
exports.ODropdownItem = DropdownItem.__vue_component__$1;
exports.default = Plugin;
