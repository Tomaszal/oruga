import { merge } from './helpers.js';
import { VueInstance } from './config.js';
import { b as registerComponent, a as registerComponentProgrammatic, u as use } from './plugins-678fd904.js';
import './Icon-631c5342.js';
import './ssr-1ee179b4.js';
import { _ as __vue_component__ } from './Loading-614123fb.js';
export { _ as OLoading } from './Loading-614123fb.js';

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

    const propsData = merge(defaultParam, params);
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    const LoadingComponent = vm.extend(__vue_component__);
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
    registerComponent(Vue, __vue_component__);
    registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }

};
use(Plugin);

export default Plugin;
export { LoadingProgrammatic };
