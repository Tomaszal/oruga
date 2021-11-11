'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./CheckRadioMixin-df88dd8e.js');
var Checkbox = require('./Checkbox-d51e2577.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Checkbox.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OCheckbox = Checkbox.__vue_component__;
exports.default = Plugin;
