'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./helpers.js');
require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./MatchMediaMixin-29d33725.js');
var Pagination = require('./Pagination-ebf2e547.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Pagination.__vue_component__);
    plugins.registerComponent(Vue, Pagination.__vue_component__$1);
  }

};
plugins.use(Plugin);

exports.OPagination = Pagination.__vue_component__;
exports.OPaginationButton = Pagination.__vue_component__$1;
exports.default = Plugin;
