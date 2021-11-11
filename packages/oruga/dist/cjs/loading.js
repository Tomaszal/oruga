'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./ssr-39c7e185.js');
var Loading = require('./Loading-f135c884.js');

let localVueInstance;
const LoadingProgrammatic = {
  open(params) {
    let parent;
    const defaultParam = {
      programmatic: true
    };

    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }

    const propsData = helpers.merge(defaultParam, params);
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || config.VueInstance;
    const LoadingComponent = vm.extend(Loading.__vue_component__);
    return new LoadingComponent({
      parent,
      el: document.createElement('div'),
      propsData
    });
  }

};
const Plugin = {
  install(Vue) {
    localVueInstance = Vue;
    plugins.registerComponent(Vue, Loading.__vue_component__);
    plugins.registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }

};
plugins.use(Plugin);

exports.OLoading = Loading.__vue_component__;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports.default = Plugin;
