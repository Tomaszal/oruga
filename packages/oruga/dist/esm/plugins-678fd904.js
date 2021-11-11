import { getValueByPath, blankIfUndefined, endsWith } from './helpers.js';
import { getOptions } from './config.js';

const _defaultSuffixProcessor = (input, suffix) => {
  return blankIfUndefined(input).split(' ').filter(cls => cls.length > 0).map(cls => cls + suffix).join(' ');
};

const _getContext = vm => {
  const computedNames = vm.$options.computed ? Object.keys(vm.$options.computed) : [];
  const computed = computedNames.filter(e => !endsWith(e, 'Classes')).reduce((o, key) => {
    o[key] = vm[key];
    return o;
  }, {});
  return {
    props: vm.$props,
    data: vm.$data,
    computed
  };
};

var BaseComponentMixin = {
  isOruga: true,
  props: {
    /**
     * Override classes
     */
    override: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    computedClass(field, defaultValue, suffix = '') {
      const config = this.$props.override === true ? {} : getOptions();
      const override = this.$props.override || getValueByPath(config, `${this.$options.configField}.override`, false);
      const overrideClass = getValueByPath(config, `${this.$options.configField}.${field}.override`, override);
      const globalTransformClasses = getValueByPath(config, `transformClasses`, undefined);
      const localTransformClasses = getValueByPath(config, `${this.$options.configField}.transformClasses`, undefined);
      let globalClass = getValueByPath(config, `${this.$options.configField}.${field}.class`, '') || getValueByPath(config, `${this.$options.configField}.${field}`, '');
      let currentClass = getValueByPath(this.$props, field);

      if (Array.isArray(currentClass)) {
        currentClass = currentClass.join(' ');
      }

      if (defaultValue.search("{*}") !== -1) {
        defaultValue = defaultValue.replace(/\{\*\}/g, suffix);
      } else {
        defaultValue = defaultValue + suffix;
      }

      let context = null;

      if (typeof currentClass === "function") {
        context = _getContext(this);
        currentClass = currentClass(suffix, context);
      } else {
        currentClass = _defaultSuffixProcessor(currentClass, suffix);
      }

      if (typeof globalClass === "function") {
        globalClass = globalClass(suffix, context || _getContext(this));
      } else {
        globalClass = _defaultSuffixProcessor(globalClass, suffix);
      }

      let appliedClasses = (`${override && !overrideClass || !override && !overrideClass ? defaultValue : ''} ` + `${blankIfUndefined(globalClass)} ` + `${blankIfUndefined(currentClass)}`).trim().replace(/\s\s+/g, ' ');

      if (localTransformClasses) {
        appliedClasses = localTransformClasses(appliedClasses);
      }

      if (globalTransformClasses) {
        appliedClasses = globalTransformClasses(appliedClasses);
      }

      return appliedClasses;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

const use = plugin => {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }
};
const registerPlugin = (vm, plugin) => {
  vm.use(plugin);
};
const registerComponent = (vm, component) => {
  vm.component(component.name, component);
};
const registerComponentProgrammatic = (vm, property, component) => {
  if (!vm.prototype.$oruga) vm.prototype.$oruga = {};
  vm.prototype.$oruga[property] = component;
};

export { BaseComponentMixin as B, registerComponentProgrammatic as a, registerComponent as b, normalizeComponent as n, registerPlugin as r, use as u };
