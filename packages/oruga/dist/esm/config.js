import { merge } from './helpers.js';

let config = {
  iconPack: 'mdi',
  useHtml5Validation: true,
  statusIcon: true
};
const setOptions = options => {
  config = options;
};
const getOptions = () => {
  return config;
};
let VueInstance;
const setVueInstance = Vue => {
  VueInstance = Vue;
};
const Programmatic = {
  getOptions,

  setOptions(options) {
    setOptions(merge(getOptions(), options, true));
  }

};
const Plugin = {
  install(Vue, options = {}) {
    setVueInstance(Vue); // Options

    setOptions(merge(getOptions(), options, true));
  }

};

export { Plugin, Programmatic, VueInstance, getOptions, setOptions, setVueInstance };
