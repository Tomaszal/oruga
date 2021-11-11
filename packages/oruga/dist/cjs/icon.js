'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
var Icon = require('./Icon-cba0a4f1.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Icon.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OIcon = Icon.__vue_component__;
exports.default = Plugin;
