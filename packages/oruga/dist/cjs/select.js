'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./FormElementMixin-980c371b.js');
var Select = require('./Select-049fad84.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Select.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OSelect = Select.__vue_component__;
exports.default = Plugin;
