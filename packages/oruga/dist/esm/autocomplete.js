import './helpers.js';
import './config.js';
import { b as registerComponent, u as use } from './plugins-678fd904.js';
import './Icon-631c5342.js';
import './FormElementMixin-e7542079.js';
import './Input-39b1afb4.js';
import { _ as __vue_component__ } from './Autocomplete-1e6f88c3.js';
export { _ as OAutocomplete } from './Autocomplete-1e6f88c3.js';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, __vue_component__);
  }

};
use(Plugin);

export default Plugin;
