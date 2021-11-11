import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin, n as normalizeComponent } from './plugins-678fd904.js';
import { _ as __vue_component__$1 } from './Icon-631c5342.js';
import { C as CheckRadioMixin } from './CheckRadioMixin-7f4f93a9.js';

//
/**
 * Select a single or grouped options
 * @displayName Checkbox
 * @example ./examples/Checkbox.md
 * @style _checkbox.scss
 */

var script = {
  name: 'OCheckbox',
  components: {
    [__vue_component__$1.name]: __vue_component__$1
  },
  mixins: [BaseComponentMixin, CheckRadioMixin],
  configField: 'checkbox',
  props: {
    /**
     * Same as native indeterminate
     */
    indeterminate: {
      type: Boolean,
      default: false
    },

    /**
     * Overrides the returned value when it's checked
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },

    /**
     * Overrides the returned value when it's not checked
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },

    /**
    * Icon pack to use
    * @values mdi, fa, fas and any other custom icon pack
    */
    iconPack: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), 'checkbox.iconPack', undefined);
      }
    },

    /** Icon for checkbox (optional)  */
    iconCheck: {
      type: String,
      default: () => {
        return getValueByPath(getOptions(), 'checkbox.iconCheck', undefined);
      }
    },

    /** Accessibility label to establish relationship between the checkbox and control label */
    ariaLabelledby: String,

    /* Same as native autocomplete */
    autocomplete: String,
    rootClass: [String, Function, Array],
    disabledClass: [String, Function, Array],
    checkClass: [String, Function, Array],
    checkedClass: [String, Function, Array],
    checkCheckedClass: [String, Function, Array],
    checkIndeterminateClass: [String, Function, Array],
    labelClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    iconCheckClass: [String, Function, Array],
    iconCheckCheckedClass: [String, Function, Array]
  },
  watch: {
    indeterminate: {
      handler(val) {
        this.isIndeterminate = val;
      },

      immediate: true
    }
  },
  computed: {
    isChecked() {
      return this.computedValue === this.trueValue || Array.isArray(this.computedValue) && this.computedValue.indexOf(this.nativeValue) !== -1;
    },

    rootClasses() {
      return [this.computedClass('rootClass', 'o-chk'), {
        [this.computedClass('checkedClass', 'o-chk--checked')]: this.isChecked
      }, {
        [this.computedClass('sizeClass', 'o-chk--', this.size)]: this.size
      }, {
        [this.computedClass('disabledClass', 'o-chk--disabled')]: this.disabled
      }, {
        [this.computedClass('variantClass', 'o-chk--', this.variant)]: this.variant
      }];
    },

    checkClasses() {
      return [this.computedClass('checkClass', 'o-chk__check'), {
        [this.computedClass('checkCheckedClass', 'o-chk__check--checked')]: this.isChecked
      }, {
        [this.computedClass('checkIndeterminateClass', 'o-chk__check--indeterminate')]: this.isIndeterminate
      }];
    },

    labelClasses() {
      return [this.computedClass('labelClass', 'o-chk__label')];
    },

    iconCheckClasses() {
      return [this.computedClass('iconCheckClass', 'o-chk__icon'), {
        [this.computedClass('iconCheckCheckedClass', 'o-chk__icon--checked')]: this.isChecked
      }];
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{ref:"label",class:_vm.rootClasses,attrs:{"disabled":_vm.disabled},on:{"click":function($event){$event.stopPropagation();return _vm.focus($event)},"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.$refs.label.click()}}},[(_vm.iconCheck)?_c('o-icon',{class:_vm.iconCheckClasses,attrs:{"icon":_vm.iconCheck,"pack":_vm.iconPack,"size":_vm.size}}):_vm._e(),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.computedValue),expression:"computedValue"}],ref:"input",class:_vm.checkClasses,attrs:{"type":"checkbox","disabled":_vm.disabled,"required":_vm.required,"name":_vm.name,"autocomplete":_vm.autocomplete,"true-value":_vm.trueValue,"false-value":_vm.falseValue,"aria-labelledby":_vm.ariaLabelledby},domProps:{"indeterminate":_vm.indeterminate,"value":_vm.nativeValue,"checked":Array.isArray(_vm.computedValue)?_vm._i(_vm.computedValue,_vm.nativeValue)>-1:_vm._q(_vm.computedValue,_vm.trueValue)},on:{"click":function($event){$event.stopPropagation();},"change":function($event){var $$a=_vm.computedValue,$$el=$event.target,$$c=$$el.checked?(_vm.trueValue):(_vm.falseValue);if(Array.isArray($$a)){var $$v=_vm.nativeValue,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.computedValue=$$a.concat([$$v]));}else {$$i>-1&&(_vm.computedValue=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else {_vm.computedValue=$$c;}}}}),_c('span',{class:_vm.labelClasses,attrs:{"id":_vm.ariaLabelledby}},[_vm._t("default")],2)],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__ as _ };
