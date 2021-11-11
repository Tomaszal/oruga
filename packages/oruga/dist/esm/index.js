import { merge } from './helpers.js';
import { setVueInstance, setOptions, Programmatic, getOptions } from './config.js';
export { Plugin as Config, Programmatic as ConfigProgrammatic } from './config.js';
import { r as registerPlugin, a as registerComponentProgrammatic, u as use } from './plugins-678fd904.js';
import './Icon-631c5342.js';
import './FormElementMixin-e7542079.js';
import './Input-39b1afb4.js';
import './Autocomplete-1e6f88c3.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import './Button-1571cdc6.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import './CheckRadioMixin-7f4f93a9.js';
import './Checkbox-caeef7ff.js';
import Plugin$2 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$3 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './MatchMediaMixin-58956a9c.js';
import './trapFocus-25a621e6.js';
import './DropdownItem-e2c1b117.js';
import './Field-ef73c2ee.js';
import './Select-c2737c13.js';
import './Datepicker-1f67d187.js';
import Plugin$4 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import './Timepicker-ecfd475c.js';
import Plugin$5 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import Plugin$6 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$7 from './field.js';
export { default as Field } from './field.js';
import Plugin$8 from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$9 from './input.js';
export { default as Input } from './input.js';
import Plugin$a from './inputitems.js';
export { default as Inputitems } from './inputitems.js';
import './ssr-1ee179b4.js';
import './Loading-614123fb.js';
import Plugin$b from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$d from './notification.js';
export { default as Notification, default as NotificationNotice } from './notification.js';
import Plugin$c from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import './Pagination-4a31f098.js';
import Plugin$e from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$f from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$g from './select.js';
export { default as Select } from './select.js';
import Plugin$h from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$i from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './Tooltip-646baaaa.js';
import Plugin$j from './slider.js';
export { default as Slider } from './slider.js';
import './SlotComponent-c00a1886.js';
import './TabbedChildMixin-4d6e4f0f.js';
import Plugin$k from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$l from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$m from './table.js';
export { default as Table } from './table.js';
import Plugin$n from './tabs.js';
export { default as Tabs } from './tabs.js';
import Plugin$o from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$p from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$q from './upload.js';
export { default as Upload } from './upload.js';

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: Plugin,
    Button: Plugin$1,
    Checkbox: Plugin$2,
    Collapse: Plugin$3,
    Datepicker: Plugin$4,
    Datetimepicker: Plugin$5,
    Dropdown: Plugin$6,
    Field: Plugin$7,
    Icon: Plugin$8,
    Input: Plugin$9,
    Inputitems: Plugin$a,
    Loading: Plugin$b,
    Modal: Plugin$c,
    Notification: Plugin$d,
    NotificationNotice: Plugin$d,
    Pagination: Plugin$e,
    Radio: Plugin$f,
    Select: Plugin$g,
    Skeleton: Plugin$h,
    Sidebar: Plugin$i,
    Slider: Plugin$j,
    Steps: Plugin$k,
    Switch: Plugin$l,
    Table: Plugin$m,
    Tabs: Plugin$n,
    Timepicker: Plugin$o,
    Tooltip: Plugin$p,
    Upload: Plugin$q
});

const Oruga = {
  install(Vue, options = {}) {
    setVueInstance(Vue); // Options

    const defaultConfig = getOptions();
    setOptions(merge(defaultConfig, options, true)); // Components

    for (const componentKey in components) {
      registerPlugin(Vue, components[componentKey]);
    } // Config component


    registerComponentProgrammatic(Vue, 'config', Programmatic);
  }

};
use(Oruga);

export default Oruga;
