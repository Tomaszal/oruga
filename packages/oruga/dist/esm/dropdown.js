import './helpers.js';
import './config.js';
import { b as registerComponent, u as use } from './plugins-678fd904.js';
import './MatchMediaMixin-58956a9c.js';
import './trapFocus-25a621e6.js';
import { _ as __vue_component__, a as __vue_component__$1 } from './DropdownItem-e2c1b117.js';
export { _ as ODropdown, a as ODropdownItem } from './DropdownItem-e2c1b117.js';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, __vue_component__);
    registerComponent(Vue, __vue_component__$1);
  }

};
use(Plugin);

export default Plugin;
