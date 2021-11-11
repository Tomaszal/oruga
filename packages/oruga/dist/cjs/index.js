'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-36681c93.js');
require('./Icon-cba0a4f1.js');
require('./FormElementMixin-980c371b.js');
require('./Input-bb860a9d.js');
require('./Autocomplete-e6762bab.js');
var autocomplete = require('./autocomplete.js');
require('./Button-1b973b2f.js');
var button = require('./button.js');
require('./CheckRadioMixin-df88dd8e.js');
require('./Checkbox-d51e2577.js');
var checkbox = require('./checkbox.js');
var collapse = require('./collapse.js');
require('./MatchMediaMixin-29d33725.js');
require('./trapFocus-8381ef46.js');
require('./DropdownItem-48b70d5b.js');
require('./Field-845aa034.js');
require('./Select-049fad84.js');
require('./Datepicker-761d2541.js');
var datepicker = require('./datepicker.js');
require('./Timepicker-e6867ce0.js');
var datetimepicker = require('./datetimepicker.js');
var dropdown = require('./dropdown.js');
var field = require('./field.js');
var icon = require('./icon.js');
var input = require('./input.js');
var inputitems = require('./inputitems.js');
require('./ssr-39c7e185.js');
require('./Loading-f135c884.js');
var loading = require('./loading.js');
var notification = require('./notification.js');
var modal = require('./modal.js');
require('./Pagination-ebf2e547.js');
var pagination = require('./pagination.js');
var radio = require('./radio.js');
var select = require('./select.js');
var skeleton = require('./skeleton.js');
var sidebar = require('./sidebar.js');
require('./Tooltip-a68c2bb5.js');
var slider = require('./slider.js');
require('./SlotComponent-0a757062.js');
require('./TabbedChildMixin-782fdf29.js');
var steps = require('./steps.js');
var _switch = require('./switch.js');
var table = require('./table.js');
var tabs = require('./tabs.js');
var timepicker = require('./timepicker.js');
var tooltip = require('./tooltip.js');
var upload = require('./upload.js');

var components = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Autocomplete: autocomplete.default,
    Button: button.default,
    Checkbox: checkbox.default,
    Collapse: collapse.default,
    Datepicker: datepicker.default,
    Datetimepicker: datetimepicker.default,
    Dropdown: dropdown.default,
    Field: field.default,
    Icon: icon.default,
    Input: input.default,
    Inputitems: inputitems.default,
    Loading: loading.default,
    Modal: modal.default,
    Notification: notification.default,
    NotificationNotice: notification.default,
    Pagination: pagination.default,
    Radio: radio.default,
    Select: select.default,
    Skeleton: skeleton.default,
    Sidebar: sidebar.default,
    Slider: slider.default,
    Steps: steps.default,
    Switch: _switch.default,
    Table: table.default,
    Tabs: tabs.default,
    Timepicker: timepicker.default,
    Tooltip: tooltip.default,
    Upload: upload.default
});

const Oruga = {
  install(Vue, options = {}) {
    config.setVueInstance(Vue); // Options

    const defaultConfig = config.getOptions();
    config.setOptions(helpers.merge(defaultConfig, options, true)); // Components

    for (const componentKey in components) {
      plugins.registerPlugin(Vue, components[componentKey]);
    } // Config component


    plugins.registerComponentProgrammatic(Vue, 'config', config.Programmatic);
  }

};
plugins.use(Oruga);

exports.Config = config.Plugin;
exports.ConfigProgrammatic = config.Programmatic;
exports.Autocomplete = autocomplete.default;
exports.Button = button.default;
exports.Checkbox = checkbox.default;
exports.Collapse = collapse.default;
exports.Datepicker = datepicker.default;
exports.Datetimepicker = datetimepicker.default;
exports.Dropdown = dropdown.default;
exports.Field = field.default;
exports.Icon = icon.default;
exports.Input = input.default;
exports.Inputitems = inputitems.default;
exports.Loading = loading.default;
exports.LoadingProgrammatic = loading.LoadingProgrammatic;
exports.Notification = notification.default;
exports.NotificationNotice = notification.default;
exports.Modal = modal.default;
exports.ModalProgrammatic = modal.ModalProgrammatic;
exports.Pagination = pagination.default;
exports.Radio = radio.default;
exports.Select = select.default;
exports.Skeleton = skeleton.default;
exports.Sidebar = sidebar.default;
exports.Slider = slider.default;
exports.Steps = steps.default;
exports.Switch = _switch.default;
exports.Table = table.default;
exports.Tabs = tabs.default;
exports.Timepicker = timepicker.default;
exports.Tooltip = tooltip.default;
exports.Upload = upload.default;
exports.default = Oruga;
