import './helpers.js';
import './config.js';
import { b as registerComponent, u as use } from './plugins-678fd904.js';
import './Icon-631c5342.js';
import './FormElementMixin-e7542079.js';
import './Input-39b1afb4.js';
import './MatchMediaMixin-58956a9c.js';
import './trapFocus-25a621e6.js';
import './DropdownItem-e2c1b117.js';
import './Field-ef73c2ee.js';
import './Select-c2737c13.js';
import { _ as __vue_component__ } from './Datepicker-1f67d187.js';
export { _ as ODatepicker } from './Datepicker-1f67d187.js';

const Plugin = {
  install(Vue) {
    registerComponent(Vue, __vue_component__);
  }

};
use(Plugin);

export default Plugin;
