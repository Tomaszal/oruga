'use strict';

var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-36681c93.js');
var FormElementMixin = require('./FormElementMixin-980c371b.js');
var Input = require('./Input-bb860a9d.js');

//
/**
 * Extended input that provide suggestions while the user types
 * @displayName Autocomplete
 * @example ./examples/Autocomplete.md
 * @style _autocomplete.scss
 */

var script = {
  name: 'OAutocomplete',
  configField: 'autocomplete',
  components: {
    [Input.__vue_component__.name]: Input.__vue_component__
  },
  mixins: [plugins.BaseComponentMixin, FormElementMixin.FormElementMixin],
  inheritAttrs: false,
  props: {
    /** @model */
    value: [Number, String],

    /** Options / suggestions */
    data: {
      type: Array,
      default: () => []
    },

    /**
     * Vertical size of input, optional
     * @values small, medium, large
     */
    size: String,

    /** Property of the object (if data is array of objects) to use as display text, and to keep track of selected option */
    field: {
      type: String,
      default: 'value'
    },

    /** The first option will always be pre-selected (easier to just hit enter or tab) */
    keepFirst: Boolean,

    /** Clear input text on select */
    clearOnSelect: Boolean,

    /** Open dropdown list on focus */
    openOnFocus: Boolean,

    /** Function to format an option to a string for display in the input as alternative to field prop) */
    customFormatter: Function,

    /** Makes the component check if list reached scroll end and emit infinite-scroll event. */
    checkInfiniteScroll: Boolean,

    /** Keep open dropdown list after select */
    keepOpen: Boolean,

    /** Add a button/icon to clear the inputed text */
    clearable: Boolean,

    /** Max height of dropdown content */
    maxHeight: [String, Number],

    /**
     * Position of dropdown
     * @values auto, top, bottom
     */
    menuPosition: {
      type: String,
      default: 'auto'
    },

    /** Transition name to apply on dropdown list */
    animation: {
      type: String,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'autocomplete.animation', 'fade');
      }
    },

    /** Property of the object (if <code>data</code> is array of objects) to use as display text of group */
    groupField: String,

    /** Property of the object (if <code>data</code> is array of objects) to use as key to get items array of each group, optional */
    groupOptions: String,

    /** Number of milliseconds to delay before to emit typing event */
    debounceTyping: Number,

    /** Icon name to be added on the right side */
    iconRight: String,

    /** Clickable icon right if exists */
    iconRightClickable: Boolean,

    /** Append autocomplete content to body */
    appendToBody: Boolean,

    /** Array of keys (https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) which will add a tag when typing (default tab and enter) */
    confirmKeys: {
      type: Array,
      default: () => ['Tab', 'Enter']
    },

    /** Input type */
    type: {
      type: String,
      default: 'text'
    },

    /** Trigger the select event for the first pre-selected option when clicking outside and <code>keep-first</code> is enabled */
    selectOnClickOutside: Boolean,

    /** Allows the header in the autocomplete to be selectable */
    selectableHeader: Boolean,

    /** Allows the footer in the autocomplete to be selectable */
    selectableFooter: Boolean,
    rootClass: [String, Function, Array],
    menuClass: [String, Function, Array],
    expandedClass: [String, Function, Array],
    menuPositionClass: [String, Function, Array],
    itemClass: [String, Function, Array],
    itemHoverClass: [String, Function, Array],
    itemGroupTitleClass: [String, Function, Array],
    itemEmptyClass: [String, Function, Array],
    itemHeaderClass: [String, Function, Array],
    itemFooterClass: [String, Function, Array],
    inputClasses: {
      type: Object,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'autocomplete.inputClasses', {});
      }
    }
  },

  data() {
    return {
      selected: null,
      hovered: null,
      headerHovered: null,
      footerHovered: null,
      isActive: false,
      newValue: this.value,
      ariaAutocomplete: this.keepFirst ? 'both' : 'list',
      newAutocomplete: this.autocomplete || 'off',
      isListInViewportVertically: true,
      hasFocus: false,
      width: undefined,
      bodyEl: undefined // Used to append to body

    };
  },

  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-acp'), {
        [this.computedClass('expandedClass', 'o-acp--expanded')]: this.expanded
      }];
    },

    menuClasses() {
      return [this.computedClass('menuClass', 'o-acp__menu'), {
        [this.computedClass('menuPositionClass', 'o-acp__menu--', this.newDropdownPosition)]: !this.appendToBody
      }];
    },

    itemClasses() {
      return [this.computedClass('itemClass', 'o-acp__item')];
    },

    itemEmptyClasses() {
      return [...this.itemClasses, this.computedClass('itemEmptyClass', 'o-acp__item--empty')];
    },

    itemGroupClasses() {
      return [...this.itemClasses, this.computedClass('itemGroupTitleClass', 'o-acp__item-group-title')];
    },

    itemHeaderClasses() {
      return [...this.itemClasses, this.computedClass('itemHeaderClass', 'o-acp__item-header'), {
        [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: this.headerHovered
      }];
    },

    itemFooterClasses() {
      return [...this.itemClasses, this.computedClass('itemFooterClass', 'o-acp__item-footer'), {
        [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: this.footerHovered
      }];
    },

    inputBind() {
      return { ...this.$attrs,
        ...this.inputClasses
      };
    },

    computedData() {
      if (this.groupField) {
        if (this.groupOptions) {
          const newData = [];
          this.data.forEach(option => {
            const group = helpers.getValueByPath(option, this.groupField);
            const items = helpers.getValueByPath(option, this.groupOptions);
            newData.push({
              group,
              items
            });
          });
          return newData;
        } else {
          const tmp = {};
          this.data.forEach(option => {
            const group = helpers.getValueByPath(option, this.groupField);
            if (!tmp[group]) tmp[group] = [];
            tmp[group].push(option);
          });
          const newData = [];
          Object.keys(this.data).forEach(group => {
            newData.push({
              group,
              items: this.data[group]
            });
          });
          return newData;
        }
      }

      return [{
        items: this.data
      }];
    },

    isEmpty() {
      if (!this.computedData) return true;
      return !this.computedData.some(element => element.items && element.items.length);
    },

    /**
     * White-listed items to not close when clicked.
     * Add input, dropdown and all children.
     */
    whiteList() {
      const whiteList = [];
      whiteList.push(this.$refs.input.$el.querySelector('input'));
      whiteList.push(this.$refs.dropdown); // Add all children from dropdown

      if (this.$refs.dropdown !== undefined) {
        const children = this.$refs.dropdown.querySelectorAll('*');

        for (const child of children) {
          whiteList.push(child);
        }
      }

      return whiteList;
    },

    newDropdownPosition() {
      if (this.menuPosition === 'top' || this.menuPosition === 'auto' && !this.isListInViewportVertically) {
        return 'top';
      }

      return 'bottom';
    },

    newIconRight() {
      if (this.clearable && this.newValue) {
        return 'close-circle';
      }

      return this.iconRight;
    },

    newIconRightClickable() {
      if (this.clearable) {
        return true;
      }

      return this.iconRightClickable;
    },

    menuStyle() {
      return {
        maxHeight: helpers.toCssDimension(this.maxHeight),
        width: helpers.toCssDimension(this.width)
      };
    },

    $elementRef() {
      return 'input';
    }

  },
  watch: {
    /**
     * When v-model is changed:
     *   1. Update internal value.
     *   2. If it's invalid, validate again.
     */
    value(value) {
      this.newValue = value;
    },

    /**
     * When dropdown is toggled, check the visibility to know when
     * to open upwards.
     */
    isActive(active) {
      if (this.menuPosition === 'auto') {
        if (active) {
          this.calcDropdownInViewportVertical();
        } else {
          // Timeout to wait for the animation to finish before recalculating
          setTimeout(() => {
            this.calcDropdownInViewportVertical();
          }, 100);
        }
      }
    },

    /**
     * When updating input's value
     *   1. Emit changes
     *   2. If value isn't the same as selected, set null
     *   3. Close dropdown if value is clear or else open it
     */
    newValue(value) {
      this.$emit('input', value); // Check if selected is invalid

      const currentValue = this.getValue(this.selected);

      if (currentValue && currentValue !== value) {
        this.setSelected(null, false);
      } // Close dropdown if input is clear or else open it


      if (this.hasFocus && (!this.openOnFocus || value)) {
        this.isActive = !!value;
      }
    },

    /**
     * Select first option if "keep-first
     */
    data() {
      // Keep first option always pre-selected
      if (this.keepFirst) {
        this.$nextTick(() => {
          if (this.isActive) {
            this.selectFirstOption(this.computedData);
          } else {
            this.setHovered(null);
          }
        });
      }
    },

    debounceTyping: {
      handler(value) {
        this.debouncedEmitTyping = helpers.debounce(this.emitTyping, value);
      },

      immediate: true
    }
  },
  methods: {
    itemOptionClasses(option) {
      return [...this.itemClasses, {
        [this.computedClass('itemHoverClass', 'o-acp__item--hover')]: option === this.hovered
      }];
    },

    /**
     * Set which option is currently hovered.
     */
    setHovered(option) {
      if (option === undefined) return;
      this.hovered = option;
    },

    /**
     * Set which option is currently selected, update v-model,
     * update input value and close dropdown.
     */
    setSelected(option, closeDropdown = true, event = undefined) {
      if (option === undefined) return;
      this.selected = option;
      /**
       * @property {Object} selected selected option
       * @property {Event} event native event
       */

      this.$emit('select', this.selected, event);

      if (this.selected !== null) {
        if (this.clearOnSelect) {
          const input = this.$refs.input;
          input.newValue = '';
          input.$refs.input.value = '';
        } else {
          this.newValue = this.getValue(this.selected);
        }

        this.setHovered(null);
      }

      closeDropdown && this.$nextTick(() => {
        this.isActive = false;
      });
      this.checkValidity();
    },

    /**
     * Select first option
     */
    selectFirstOption(computedData) {
      this.$nextTick(() => {
        const nonEmptyElements = computedData.filter(element => element.items && element.items.length);

        if (nonEmptyElements.length) {
          const option = nonEmptyElements[0].items[0];
          this.setHovered(option);
        } else {
          this.setHovered(null);
        }
      });
    },

    /**
     * Key listener.
     * Select the hovered option.
     */
    keydown(event) {
      const {
        key
      } = event; // cannot destructure preventDefault (https://stackoverflow.com/a/49616808/2774496)
      // prevent emit submit event

      if (key === 'Enter') event.preventDefault(); // Close dropdown on Tab & no hovered

      if (key === 'Escape' || key === 'Tab') {
        this.isActive = false;
      }

      if (this.confirmKeys.indexOf(key) >= 0) {
        // If adding by comma, don't add the comma to the input
        if (key === ',') event.preventDefault(); // Close dropdown on select by Tab

        const closeDropdown = !this.keepOpen || key === 'Tab';

        if (this.hovered === null) {
          // header and footer uses headerHovered && footerHovered. If header or footer
          // was selected then fire event otherwise just return so a value isn't selected
          this.checkIfHeaderOrFooterSelected(event, null, closeDropdown);
          return;
        }

        this.setSelected(this.hovered, closeDropdown, event);
      }
    },

    selectHeaderOrFoterByClick(event, origin) {
      this.checkIfHeaderOrFooterSelected(event, {
        origin: origin
      });
    },

    /**
     * Check if header or footer was selected.
     */
    checkIfHeaderOrFooterSelected(event, triggerClick, closeDropdown = true) {
      if (this.selectableHeader && (this.headerHovered || triggerClick && triggerClick.origin === 'header')) {
        this.$emit('select-header', event);
        this.headerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }

      if (this.selectableFooter && (this.footerHovered || triggerClick && triggerClick.origin === 'footer')) {
        this.$emit('select-footer', event);
        this.footerHovered = false;
        if (triggerClick) this.setHovered(null);
        if (closeDropdown) this.isActive = false;
      }
    },

    /**
     * Close dropdown if clicked outside.
     */
    clickedOutside(event) {
      if (!this.hasFocus && this.whiteList.indexOf(event.target) < 0) {
        if (this.keepFirst && this.hovered && this.selectOnClickOutside) {
          this.setSelected(this.hovered, true);
        } else {
          this.isActive = false;
        }
      }
    },

    /**
     * Return display text for the input.
     * If object, get value from path, or else just the value.
     */
    getValue(option) {
      if (option === null) return;

      if (typeof this.customFormatter !== 'undefined') {
        return this.customFormatter(option);
      }

      return typeof option === 'object' ? helpers.getValueByPath(option, this.field) : option;
    },

    /**
     * Check if the scroll list inside the dropdown
     * reached it's end.
     */
    checkIfReachedTheEndOfScroll() {
      const list = this.$refs.dropdown;

      if (list.clientHeight !== list.scrollHeight && list.scrollTop + list.clientHeight >= list.scrollHeight) {
        this.$emit('infinite-scroll');
      }
    },

    /**
     * Calculate if the dropdown is vertically visible when activated,
     * otherwise it is openened upwards.
     */
    calcDropdownInViewportVertical() {
      this.$nextTick(() => {
        /**
        * this.$refs.dropdown may be undefined
        * when Autocomplete is conditional rendered
        */
        if (this.$refs.dropdown === undefined) return;
        const rect = this.$refs.dropdown.getBoundingClientRect();
        this.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

        if (this.appendToBody) {
          this.updateAppendToBody();
        }
      });
    },

    /**
     * Arrows keys listener.
     * If dropdown is active, set hovered option, or else just open.
     */
    keyArrows(direction) {
      const sum = direction === 'down' ? 1 : -1;

      if (this.isActive) {
        const data = this.computedData.map(d => d.items).reduce((a, b) => [...a, ...b], []);

        if (this.$slots.header && this.selectableHeader) {
          data.unshift(undefined);
        }

        if (this.$slots.footer && this.selectableFooter) {
          data.push(undefined);
        }

        let index;

        if (this.headerHovered) {
          index = 0 + sum;
        } else if (this.footerHovered) {
          index = data.length - 1 + sum;
        } else {
          index = data.indexOf(this.hovered) + sum;
        }

        index = index > data.length - 1 ? data.length - 1 : index;
        index = index < 0 ? 0 : index;
        this.footerHovered = false;
        this.headerHovered = false;
        this.setHovered(data[index] !== undefined ? data[index] : null);

        if (this.$slots.footer && this.selectableFooter && index === data.length - 1) {
          this.footerHovered = true;
        }

        if (this.$slots.header && this.selectableHeader && index === 0) {
          this.headerHovered = true;
        }

        const list = this.$refs.dropdown;
        let items = this.$refs.items || [];

        if (this.$slots.header && this.selectableHeader) {
          items = [this.$refs.header, ...items];
        }

        if (this.$slots.footer && this.selectableFooter) {
          items = [...items, this.$refs.footer];
        }

        const element = items[index];
        if (!element) return;
        const visMin = list.scrollTop;
        const visMax = list.scrollTop + list.clientHeight - element.clientHeight;

        if (element.offsetTop < visMin) {
          list.scrollTop = element.offsetTop;
        } else if (element.offsetTop >= visMax) {
          list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
        }
      } else {
        this.isActive = true;
      }
    },

    /**
     * Focus listener.
     * If value is the same as selected, select all text.
     */
    focused(event) {
      if (this.getValue(this.selected) === this.newValue) {
        this.$el.querySelector('input').select();
      }

      if (this.openOnFocus) {
        this.isActive = true;

        if (this.keepFirst) {
          // If open on focus, update the hovered
          this.selectFirstOption(this.computedData);
        }
      }

      this.hasFocus = true;
      this.$emit('focus', event);
    },

    /**
    * Blur listener.
    */
    onBlur(event) {
      this.hasFocus = false;
      this.$emit('blur', event);
    },

    onInput() {
      const currentValue = this.getValue(this.selected);
      if (currentValue && currentValue === this.newValue) return;

      if (this.debounceTyping) {
        this.debouncedEmitTyping();
      } else {
        this.emitTyping();
      }
    },

    emitTyping() {
      this.$emit('typing', this.newValue);
      this.checkValidity();
    },

    rightIconClick(event) {
      if (this.clearable) {
        this.newValue = '';
        this.setSelected(null, false);

        if (this.openOnFocus) {
          this.$refs.input.$el.focus();
        }
      } else {
        this.$emit('icon-right-click', event);
      }
    },

    checkValidity() {
      if (this.useHtml5Validation) {
        this.$nextTick(() => {
          this.checkHtml5Validity();
        });
      }
    },

    updateAppendToBody() {
      const dropdownMenu = this.$refs.dropdown;
      const trigger = this.$refs.input.$el;

      if (dropdownMenu && trigger) {
        // update wrapper dropdown
        const root = this.$data.bodyEl;
        root.classList.forEach(item => root.classList.remove(...item.split(' ')));
        this.rootClasses.forEach(item => {
          if (item) {
            if (typeof item === 'object') {
              Object.keys(item).filter(key => item[key]).forEach(key => root.classList.add(key));
            } else {
              root.classList.add(...item.split(' '));
            }
          }
        });
        const rect = trigger.getBoundingClientRect();
        let top = rect.top + window.scrollY;
        const left = rect.left + window.scrollX;

        if (this.newDropdownPosition !== 'top') {
          top += trigger.clientHeight;
        } else {
          top -= dropdownMenu.clientHeight;
        }

        dropdownMenu.style.position = 'absolute';
        dropdownMenu.style.top = `${top}px`;
        dropdownMenu.style.left = `${left}px`;
        dropdownMenu.style.width = `${trigger.clientWidth}px`;
        dropdownMenu.style.maxWidth = `${trigger.clientWidth}px`;
        dropdownMenu.style.zIndex = '9999';
      }
    }

  },

  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside);
      if (this.menuPosition === 'auto') window.addEventListener('resize', this.calcDropdownInViewportVertical);
    }
  },

  mounted() {
    const list = this.$refs.dropdown;

    if (this.checkInfiniteScroll && list) {
      list.addEventListener('scroll', this.checkIfReachedTheEndOfScroll);
    }

    if (this.appendToBody) {
      this.$data.bodyEl = helpers.createAbsoluteElement(list);
      this.updateAppendToBody();
    }
  },

  beforeUpdate() {
    this.width = this.$refs.input ? this.$refs.input.$el.clientWidth : undefined;
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
      if (this.menuPosition === 'auto') window.removeEventListener('resize', this.calcDropdownInViewportVertical);
    }

    if (this.checkInfiniteScroll && this.$refs.dropdown) {
      const list = this.$refs.dropdown;
      list.removeEventListener('scroll', this.checkIfReachedTheEndOfScroll);
    }

    if (this.appendToBody) {
      helpers.removeElement(this.$data.bodyEl);
    }
  }

};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.rootClasses},[_c('o-input',_vm._b({ref:"input",attrs:{"type":_vm.type,"size":_vm.size,"rounded":_vm.rounded,"icon":_vm.icon,"icon-right":_vm.newIconRight,"icon-right-clickable":_vm.newIconRightClickable,"icon-pack":_vm.iconPack,"maxlength":_vm.maxlength,"autocomplete":_vm.newAutocomplete,"use-html5-validation":false,"aria-autocomplete":_vm.ariaAutocomplete,"expanded":_vm.expanded},on:{"input":_vm.onInput,"focus":_vm.focused,"blur":_vm.onBlur,"icon-right-click":_vm.rightIconClick,"icon-click":function (event) { return _vm.$emit('icon-click', event); }},nativeOn:{"keydown":[function($event){return _vm.keydown($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.keyArrows('up')},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.keyArrows('down')}]},model:{value:(_vm.newValue),callback:function ($$v) {_vm.newValue=$$v;},expression:"newValue"}},'o-input',_vm.inputBind,false)),_c('transition',{attrs:{"name":_vm.animation}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive && (!_vm.isEmpty || _vm.$slots.empty || _vm.$slots.header || _vm.$slots.footer)),expression:"isActive && (!isEmpty || $slots.empty || $slots.header || $slots.footer)"}],ref:"dropdown",class:_vm.menuClasses,style:(_vm.menuStyle)},[(_vm.$slots.header)?_c('div',{ref:"header",class:_vm.itemHeaderClasses,attrs:{"role":"button","tabindex":"0"},on:{"click":function($event){return _vm.selectHeaderOrFoterByClick($event, 'header')}}},[_vm._t("header")],2):_vm._e(),_vm._l((_vm.computedData),function(element,groupindex){return [(element.group)?_c('div',{key:groupindex + 'group',class:_vm.itemGroupClasses},[(_vm.$scopedSlots.group)?_vm._t("group",null,{"group":element.group,"index":groupindex}):_c('span',[_vm._v(" "+_vm._s(element.group)+" ")])],2):_vm._e(),_vm._l((element.items),function(option,index){return _c('div',{key:groupindex + ':' + index,ref:"items",refInFor:true,class:_vm.itemOptionClasses(option),on:{"click":function($event){$event.stopPropagation();return _vm.setSelected(option, !_vm.keepOpen, $event)}}},[(_vm.$scopedSlots.default)?_vm._t("default",null,{"option":option,"index":index}):_c('span',[_vm._v(" "+_vm._s(_vm.getValue(option, true))+" ")])],2)})]}),(_vm.isEmpty && _vm.$slots.empty)?_c('div',{class:_vm.itemEmptyClasses},[_vm._t("empty")],2):_vm._e(),(_vm.$slots.footer)?_c('div',{ref:"footer",class:_vm.itemFooterClasses,attrs:{"role":"button","tabindex":"0"},on:{"click":function($event){return _vm.selectHeaderOrFoterByClick($event, 'footer')}}},[_vm._t("footer")],2):_vm._e()],2)])],1)};
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

exports.__vue_component__ = __vue_component__;
