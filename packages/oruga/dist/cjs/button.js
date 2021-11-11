'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
var Button = require('./Button-1b973b2f.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Button.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OButton = Button.__vue_component__;
exports.default = Plugin;
