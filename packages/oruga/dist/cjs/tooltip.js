'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
var Tooltip = require('./Tooltip-a68c2bb5.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Tooltip.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OTooltip = Tooltip.__vue_component__;
exports.default = Plugin;
