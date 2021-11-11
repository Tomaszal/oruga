'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-36681c93.js');
var Icon = require('./Icon-cba0a4f1.js');
var FormElementMixin = require('./FormElementMixin-980c371b.js');
require('./Input-bb860a9d.js');
var Autocomplete = require('./Autocomplete-e6762bab.js');

//
/**
 * A simple item input field that can have autocomplete functionality
 * @displayName Inputitems
 * @example ./examples/InputItems.md
 * @style _inputItems.scss
 */

var script = {
  name: 'OInputitems',
  components: {
    [Autocomplete.__vue_component__.name]: Autocomplete.__vue_component__,
    [Icon.__vue_component__.name]: Icon.__vue_component__
  },
  mixins: [FormElementMixin.FormElementMixin, plugins.BaseComponentMixin],
  inheritAttrs: false,
  configField: 'inputitems',
  props: {
    /** @model */
    value: {
      type: Array,
      default: () => []
    },

    /** Items data */
    data: {
      type: Array,
      default: () => []
    },

    /**
     * Color of the each items, optional
     * @values primary, info, success, warning, danger, and any other custom color
     */
    variant: String,

    /** Limits the number of items, plus item counter */
    maxitems: {
      type: [Number, String],
      required: false
    },

    /** Show counter when maxlength or maxtags props are passed */
    hasCounter: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.hasCounter', true);
      }
    },

    /** Property of the object (if data is array of objects) to use as display text */
    field: {
      type: String,
      default: 'value'
    },

    /** Add autocomplete feature (if true, any Autocomplete props may be used too) */
    autocomplete: Boolean,

    /**  Property of the object (if data is array of objects) to use as display text of group */
    groupField: String,

    /**  Property of the object (if data is array of objects) to use as key to get items array of each group, optional */
    groupOptions: String,
    nativeAutocomplete: String,

    /**  Opens a dropdown with choices when the input field is focused */
    openOnFocus: Boolean,

    /** Input will be disabled */
    disabled: Boolean,

    /** Add close/delete button to the item */
    closable: {
      type: Boolean,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.closable', true);
      }
    },

    /**
     * Array of keys
     * (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
     * which will add a item when typing (default comma, tab and enter)
     */
    confirmKeys: {
      type: Array,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.confirmKeys', [',', 'Tab', 'Enter']);
      }
    },

    /** Allow removing last item when pressing given keys, if input is empty */
    removeOnKeys: {
      type: Array,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.removeOnKeys', ['Backspace']);
      }
    },

    /** When autocomplete, it allow to add new items */
    allowNew: Boolean,

    /** Array of chars used to split when pasting a new string */
    onPasteSeparators: {
      type: Array,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.onPasteSeparators', [',']);
      }
    },

    /** Function to validate the value of the item before adding */
    beforeAdding: {
      type: Function,
      default: () => true
    },

    /** Allows adding the same item multiple time */
    allowDuplicates: {
      type: Boolean,
      default: false
    },

    /** Makes the autocomplete component check if list reached scroll end and emit infinite-scroll event */
    checkInfiniteScroll: {
      type: Boolean,
      default: false
    },

    /** Function to create a new item to push into v-model (items) */
    createItem: {
      type: Function,
      default: item => item
    },

    /** Icon name of close icon on selected item */
    closeIcon: {
      type: String,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.closeIcon', 'times');
      }
    },

    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: Boolean,

    /** Accessibility label for the close button */
    ariaCloseLabel: String,

    /** Append autocomplete content to body */
    appendToBody: Boolean,
    rootClass: [String, Array, Function],
    expandedClass: [String, Array, Function],
    variantClass: [String, Array, Function],
    closeClass: [String, Array, Function],
    itemClass: [String, Array, Function],
    counterClass: [String, Array, Function],
    autocompleteClasses: {
      type: Object,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'inputitems.autocompleteClasses', {});
      }
    }
  },

  data() {
    return {
      items: Array.isArray(this.value) ? this.value.slice(0) : this.value || [],
      newItem: '',
      isComposing: false
    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-inputit'), {
        [this.computedClass('expandedClass', 'o-inputit--expanded')]: this.expanded
      }];
    },

    containerClasses() {
      return [this.computedClass('containerClass', 'o-inputit__container'), {
        [this.computedClass('sizeClass', 'o-inputit__container--', this.size)]: this.size
      }];
    },

    itemClasses() {
      return [this.computedClass('itemClass', 'o-inputit__item'), {
        [this.computedClass('variantClass', 'o-inputit__item--', this.variant)]: this.variant
      }];
    },

    closeClasses() {
      return [this.computedClass('closeClass', 'o-inputit__item__close')];
    },

    counterClasses() {
      return [this.computedClass('counterClass', 'o-inputit__counter')];
    },

    autocompleteBind() {
      return { ...this.$attrs,
        'root-class': this.computedClass('autocompleteClasses.rootClass', 'o-inputit__autocomplete'),
        'input-classes': {
          'input-class': this.computedClass('autocompleteClasses.inputClasses.inputClass', 'o-inputit__input')
        },
        ...this.autocompleteClasses
      };
    },

    valueLength() {
      return this.newItem.trim().length;
    },

    hasDefaultSlot() {
      return !!this.$scopedSlots.default;
    },

    hasEmptySlot() {
      return !!this.$slots.empty;
    },

    hasHeaderSlot() {
      return !!this.$slots.header;
    },

    hasFooterSlot() {
      return !!this.$slots.footer;
    },

    /**
     * Show the input field if a maxitems hasn't been set or reached.
     */
    hasInput() {
      return this.maxitems == null || this.itemsLength < this.maxitems;
    },

    itemsLength() {
      return this.items.length;
    },

    /**
     * If input has onPasteSeparators prop,
     * returning new RegExp used to split pasted string.
     */
    separatorsAsRegExp() {
      const sep = this.onPasteSeparators;
      return sep.length ? new RegExp(sep.map(s => {
        return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null;
      }).join('|'), 'g') : null;
    },

    $elementRef() {
      return 'autocomplete';
    }

  },
  watch: {
    /**
     * When v-model is changed set internal value.
     */
    value(value) {
      this.items = Array.isArray(value) ? value.slice(0) : value || [];
    },

    hasInput() {
      if (!this.hasInput) this.onBlur();
    }

  },
  methods: {
    addItem(item) {
      const itemToAdd = item || this.newItem.trim();

      if (itemToAdd) {
        if (!this.autocomplete) {
          const reg = this.separatorsAsRegExp;

          if (reg && itemToAdd.match(reg)) {
            itemToAdd.split(reg).map(t => t.trim()).filter(t => t.length !== 0).map(this.addItem);
            return;
          }
        } // Add the item input if it is not blank
        // or previously added (if not allowDuplicates).


        const add = !this.allowDuplicates ? this.items.indexOf(this.createItem(itemToAdd)) === -1 : true;

        if (add && this.beforeAdding(itemToAdd)) {
          this.items.push(this.createItem(itemToAdd));
          this.$emit('input', this.items);
          this.$emit('add', itemToAdd);
        }
      } // after autocomplete events


      requestAnimationFrame(() => {
        this.newItem = '';
        this.$emit('typing', '');
      });
    },

    getNormalizedItemText(item) {
      if (typeof item === 'object') {
        item = helpers.getValueByPath(item, this.field);
      }

      return `${item}`;
    },

    customOnBlur(event) {
      // Add item on-blur if not select only
      if (!this.autocomplete) this.addItem();
      this.onBlur(event);
    },

    onSelect(option) {
      if (!option) return;
      this.addItem(option);
      this.$nextTick(() => {
        this.newItem = '';
      });
    },

    removeItem(index, event) {
      const item = this.items.splice(index, 1)[0];
      this.$emit('input', this.items);
      this.$emit('remove', item);
      if (event) event.stopPropagation();

      if (this.openOnFocus && this.$refs.autocomplete) {
        this.$refs.autocomplete.focus();
      }

      return item;
    },

    removeLastItem() {
      if (this.itemsLength > 0) {
        this.removeItem(this.itemsLength - 1);
      }
    },

    keydown(event) {
      const {
        key
      } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)

      if (this.removeOnKeys.indexOf(key) !== -1 && !this.newItem.length) {
        this.removeLastItem();
      } // Stop if is to accept select only


      if (this.autocomplete && !this.allowNew) return;

      if (this.confirmKeys.indexOf(key) >= 0) {
        // Allow Tab to advance to next field regardless
        if (key !== 'Tab') event.preventDefault();
        if (key === 'Enter' && this.isComposing) return;
        this.addItem();
      }
    },

    onTyping(event) {
      this.$emit('typing', event.trim());
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('div',{class:_vm.containerClasses,on:{"click":function($event){_vm.hasInput && _vm.focus($event);}}},[_vm._t("selected",_vm._l((_vm.items),function(item,index){return _c('span',{key:_vm.getNormalizedItemText(item) + index,class:_vm.itemClasses},[_c('span',[_vm._v(_vm._s(_vm.getNormalizedItemText(item)))]),(_vm.closable)?_c('o-icon',{class:_vm.closeClasses,attrs:{"clickable":"","both":"","icon":_vm.closeIcon,"aria-label":_vm.ariaCloseLabel},nativeOn:{"click":function($event){return _vm.removeItem(index, $event)}}}):_vm._e()],1)}),{"items":_vm.items}),(_vm.hasInput)?_c('o-autocomplete',_vm._b({ref:"autocomplete",attrs:{"data":_vm.data,"field":_vm.field,"icon":_vm.icon,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"has-counter":false,"size":_vm.size,"disabled":_vm.disabled,"loading":_vm.loading,"autocomplete":_vm.nativeAutocomplete,"open-on-focus":_vm.openOnFocus,"keep-first":_vm.keepFirst,"keep-open":_vm.openOnFocus,"group-field":_vm.groupField,"group-options":_vm.groupOptions,"use-html5-validation":_vm.useHtml5Validation,"check-infinite-scroll":_vm.checkInfiniteScroll,"append-to-body":_vm.appendToBody,"confirm-keys":_vm.confirmKeys},on:{"typing":_vm.onTyping,"focus":_vm.onFocus,"blur":_vm.customOnBlur,"select":_vm.onSelect,"infinite-scroll":function($event){return _vm.$emit('infinite-scroll', $event)},"icon-right-click":function($event){return _vm.$emit('icon-right-click', $event)}},nativeOn:{"keydown":function($event){return _vm.keydown($event)},"compositionstart":function($event){_vm.isComposing = true;},"compositionend":function($event){_vm.isComposing = false;}},scopedSlots:_vm._u([(_vm.hasHeaderSlot)?{key:"header",fn:function(){return [_vm._t("header")]},proxy:true}:null,(_vm.hasDefaultSlot)?{key:"default",fn:function(props){return [_vm._t("default",null,{"option":props.option,"index":props.index})]}}:null,(_vm.hasEmptySlot)?{key:"empty",fn:function(){return [_vm._t("empty")]},proxy:true}:null,(_vm.hasFooterSlot)?{key:"footer",fn:function(){return [_vm._t("footer")]},proxy:true}:null],null,true),model:{value:(_vm.newItem),callback:function ($$v) {_vm.newItem=$$v;},expression:"newItem"}},'o-autocomplete',_vm.autocompleteBind,false)):_vm._e()],2),(_vm.hasCounter && (_vm.maxitems || _vm.maxlength))?_c('small',{class:_vm.counterClasses},[(_vm.maxlength && _vm.valueLength > 0)?[_vm._v(" "+_vm._s(_vm.valueLength)+" / "+_vm._s(_vm.maxlength)+" ")]:(_vm.maxitems)?[_vm._v(" "+_vm._s(_vm.itemsLength)+" / "+_vm._s(_vm.maxitems)+" ")]:_vm._e()],2):_vm._e()])};
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
  

  
  const __vue_component__ = /*#__PURE__*/plugins.normalizeComponent(
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

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, __vue_component__);
  }

};
plugins.use(Plugin);

exports.OInputitems = __vue_component__;
exports.default = Plugin;
