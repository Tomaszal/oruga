import { getValueByPath } from './helpers.js';
import { getOptions } from './config.js';
import { B as BaseComponentMixin, n as normalizeComponent } from './plugins-678fd904.js';
import { _ as __vue_component__$1 } from './Icon-631c5342.js';
import { F as FormElementMixin } from './FormElementMixin-e7542079.js';

//
/**
 * Get user Input. Use with Field to access all functionalities
 * @displayName Input
 * @example ./examples/Input.md
 * @style _input.scss
 */

var script = {
  name: 'OInput',
  components: {
    [__vue_component__$1.name]: __vue_component__$1
  },
  mixins: [BaseComponentMixin, FormElementMixin],
  configField: 'input',
  inheritAttrs: false,
  props: {
    /** @model */
    value: [Number, String],

    /**
     * Input type, like native
     * @values Any native input type, and textarea
     */
    type: {
      type: String,
      default: 'text'
    },

    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,

    /**
     * 	Adds the reveal password functionality
     */
    passwordReveal: Boolean,

    /**
     * Makes the icon clickable
     */
    iconClickable: Boolean,

    /**
     * Show character counter when maxlength prop is passed
     */
    hasCounter: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), 'input.counter', false);
      }
    },

    /**
     * Automatically adjust height in textarea
     */
    autosize: {
      type: Boolean,
      default: false
    },

    /**
     * 	Icon name to be added on the right side
     */
    iconRight: String,

    /**
     * Make the icon right clickable
     */
    iconRightClickable: Boolean,

    /** Variant of right icon */
    iconRightVariant: String,

    /** Add a button/icon to clear the inputed text */
    clearable: {
      type: Boolean,
      default: () => {
        return getValueByPath(getOptions(), 'input.clearable', false);
      }
    },
    rootClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    iconLeftSpaceClass: [String, Function, Array],
    iconRightSpaceClass: [String, Function, Array],
    inputClass: [String, Function, Array],
    roundedClass: [String, Function, Array],
    iconLeftClass: [String, Function, Array],
    iconRightClass: [String, Function, Array],
    counterClass: [String, Function, Array],
    sizeClass: [String, Function, Array],
    variantClass: [String, Function, Array]
  },

  data() {
    return {
      newValue: this.value,
      newType: this.type,
      newAutocomplete: this.autocomplete || getValueByPath(getOptions(), 'input.autocompletete', 'off'),
      isPasswordVisible: false,
      height: 'auto'
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-ctrl-input'), {
        [this.computedClass('expandedClass', 'o-ctrl-input--expanded')]: this.expanded
      }];
    },

    inputClasses() {
      return [this.computedClass('inputClass', 'o-input'), {
        [this.computedClass('roundedClass', 'o-input--rounded')]: this.rounded
      }, {
        [this.computedClass('sizeClass', 'o-input--', this.size)]: this.size
      }, {
        [this.computedClass('variantClass', 'o-input--', this.statusVariant)]: this.statusVariant
      }, {
        [this.computedClass('textareaClass', 'o-input__textarea')]: this.type === 'textarea'
      }, {
        [this.computedClass('iconLeftSpaceClass', 'o-input-iconspace-left')]: this.icon
      }, {
        [this.computedClass('iconRightSpaceClass', 'o-input-iconspace-right')]: this.hasIconRight
      }];
    },

    iconLeftClasses() {
      return [this.computedClass('iconLeftClass', 'o-input__icon-left')];
    },

    iconRightClasses() {
      return [this.computedClass('iconRightClass', 'o-input__icon-right')];
    },

    counterClasses() {
      return [this.computedClass('counterClass', 'o-input__counter')];
    },

    computedValue: {
      get() {
        return this.newValue;
      },

      set(value) {
        this.newValue = value;
        this.$emit('input', this.newValue);
        this.syncFilled(this.newValue);
        !this.isValid && this.checkHtml5Validity();
      }

    },

    hasIconRight() {
      return this.passwordReveal || this.statusIcon && this.statusVariantIcon || this.clearable || this.iconRight;
    },

    rightIcon() {
      if (this.passwordReveal) {
        return this.passwordVisibleIcon;
      } else if (this.clearable && this.newValue) {
        return 'close-circle';
      } else if (this.iconRight) {
        return this.iconRight;
      }

      return this.statusVariantIcon;
    },

    rightIconVariant() {
      if (this.passwordReveal || this.iconRight) {
        return this.iconRightVariant || null;
      }

      return this.statusVariant;
    },

    /**
    * Check if have any message prop from parent if it's a Field.
    */
    hasMessage() {
      return !!this.statusMessage;
    },

    /**
    * Current password-reveal icon name.
    */
    passwordVisibleIcon() {
      return !this.isPasswordVisible ? 'eye' : 'eye-off';
    },

    /**
    * Get value length
    */
    valueLength() {
      if (typeof this.computedValue === 'string') {
        return this.computedValue.length;
      } else if (typeof this.computedValue === 'number') {
        return this.computedValue.toString().length;
      }

      return 0;
    },

    /**
    * Computed inline styles for autoresize
    */
    computedStyles() {
      if (!this.autosize) return {};
      return {
        resize: 'none',
        height: this.height,
        overflow: 'hidden'
      };
    },

    $elementRef() {
      return this.type === 'textarea' ? 'textarea' : 'input';
    }

  },
  watch: {
    /**
    * When v-model is changed:
    *   1. Set internal value.
    */
    value: {
      immediate: true,

      handler(value) {
        this.newValue = value;
        this.syncFilled(this.newValue);

        if (this.autosize) {
          this.resize();
        }
      }

    }
  },
  methods: {
    /**
    * Toggle the visibility of a password-reveal input
    * by changing the type and focus the input right away.
    */
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.newType = this.isPasswordVisible ? 'text' : 'password';
      this.$nextTick(() => {
        this.focus();
      });
    },

    iconClick(emit, event) {
      this.$emit(emit, event);
      this.$nextTick(() => {
        this.focus();
      });
    },

    rightIconClick(event) {
      if (this.passwordReveal) {
        this.togglePasswordVisibility();
      } else if (this.clearable) {
        this.computedValue = '';
      } else if (this.iconRightClickable) {
        this.iconClick('icon-right-click', event);
      }
    },

    resize() {
      this.height = 'auto';
      this.$nextTick(() => {
        let scrollHeight = this.$refs.textarea.scrollHeight;
        this.height = scrollHeight + 'px';
      });
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[(_vm.type !== 'textarea')?_c('input',_vm._b({ref:"input",class:_vm.inputClasses,attrs:{"type":_vm.newType,"autocomplete":_vm.newAutocomplete,"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":function($event){_vm.computedValue = $event.target.value;},"blur":_vm.onBlur,"focus":_vm.onFocus}},'input',_vm.$attrs,false)):_c('textarea',_vm._b({ref:"textarea",class:_vm.inputClasses,style:(_vm.computedStyles),attrs:{"maxlength":_vm.maxlength},domProps:{"value":_vm.computedValue},on:{"input":function($event){_vm.computedValue = $event.target.value;},"blur":_vm.onBlur,"focus":_vm.onFocus}},'textarea',_vm.$attrs,false)),(_vm.icon)?_c('o-icon',{class:_vm.iconLeftClasses,attrs:{"clickable":_vm.iconClickable,"icon":_vm.icon,"pack":_vm.iconPack,"size":_vm.size},nativeOn:{"click":function($event){return _vm.iconClick('icon-click', $event)}}}):_vm._e(),(_vm.hasIconRight)?_c('o-icon',{class:_vm.iconRightClasses,attrs:{"clickable":_vm.passwordReveal || _vm.iconRightClickable,"icon":_vm.rightIcon,"pack":_vm.iconPack,"size":_vm.size,"variant":_vm.rightIconVariant,"both":""},nativeOn:{"click":function($event){return _vm.rightIconClick($event)}}}):_vm._e(),(_vm.maxlength && _vm.hasCounter && _vm.isFocused && _vm.type !== 'number')?_c('small',{class:_vm.counterClasses},[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]):_vm._e()],1)};
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
