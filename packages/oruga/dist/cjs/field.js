'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./MatchMediaMixin-29d33725.js');
var Field = require('./Field-845aa034.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Field.__vue_component__);
  }

};
plugins.use(Plugin);

exports.OField = Field.__vue_component__;
exports.default = Plugin;
