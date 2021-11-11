'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var helpers = require('./helpers.js');
var config = require('./config.js');
var plugins = require('./plugins-36681c93.js');
var Icon = require('./Icon-cba0a4f1.js');

var MessageMixin = {
  components: {
    [Icon.__vue_component__.name]: Icon.__vue_component__
  },
  props: {
    /** Whether modal is active or not, use the .sync modifier (Vue 2.x) or v-model:active (Vue 3.x) to make it two-way binding */
    active: {
      type: Boolean,
      default: true
    },

    /** Adds an 'X' button that closes the notification. */
    closable: {
      type: Boolean,
      default: false
    },

    /** Message text (can contain HTML). */
    message: String,

    /** Type (color) of the notification, optional. */
    type: String,

    /** Adds an icon on the left side depending on the type (or the icon prop if defined). */
    hasIcon: Boolean,

    /** Icon name to use with has-icon. */
    icon: String,

    /** Icon pack to use. */
    iconPack: String,

    /** Icon size */
    iconSize: {
      type: String,
      default: 'large'
    },

    /** Hide notification after duration only not programmatic. */
    autoClose: {
      type: Boolean,
      default: false
    },

    /** Visibility duration in miliseconds. */
    duration: {
      type: Number,
      default: 2000
    }
  },

  data() {
    return {
      isActive: this.active
    };
  },

  watch: {
    active(value) {
      this.isActive = value;
    },

    isActive(value) {
      if (value) {
        this.setAutoClose();
      } else {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      }
    }

  },
  computed: {
    /**
     * Icon name (MDI) based on type.
     */
    computedIcon() {
      if (this.icon) {
        return this.icon;
      }

      switch (this.type) {
        case 'info':
          return 'information';

        case 'success':
          return 'check-circle';

        case 'warning':
          return 'alert';

        case 'danger':
          return 'alert-circle';

        default:
          return null;
      }
    }

  },
  methods: {
    /**
     * Close the Message and emit events.
     */
    close() {
      this.isActive = false;
      this.$emit('close');
      this.$emit('update:active', false);
    },

    /**
     * Set timer to auto close message
     */
    setAutoClose() {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          if (this.isActive) {
            this.close();
          }
        }, this.duration);
      }
    }

  },

  mounted() {
    this.setAutoClose();
  }

};

//
/**
 * Bold notification blocks to alert your users of something
 * @displayName Notification/Toast
 * @requires ./NotificationNotice.vue
 * @example ./examples/Notification.md
 * @style _notification.scss
 */

var script = {
  name: 'ONotification',
  configField: 'notification',
  mixins: [plugins.BaseComponentMixin, MessageMixin],
  props: {
    /**
    * Which position the notification will appear when programmatically
    * @values top-right, top, top-left, bottom-right, bottom, bottom-left
    */
    position: String,

    /**
    * Color of the control, optional
    * @values primary, info, success, warning, danger, and any other custom color
    */
    variant: [String, Object],

    /**
     * Label for the close button, to be read by accessibility screenreaders.
     */
    ariaCloseLabel: String,

    /**
     * Custom animation (transition name).
     */
    animation: {
      type: String,
      default: 'fade'
    },

    /** Component to be injected, used to open a component modal programmatically. Close modal within the component by emitting a 'close' event — this.$emit('close') */
    component: [Object, Function],

    /** Props to be binded to the injected component */
    props: Object,

    /** Events to be binded to the injected component */
    events: Object,

    /** Close icon name */
    closeIcon: {
      type: String,
      default: () => {
        return helpers.getValueByPath(config.getOptions(), 'notification.closeIcon', 'times');
      }
    },
    rootClass: [String, Function, Array],
    closeClass: [String, Function, Array],
    contentClass: [String, Function, Array],
    iconClass: [String, Function, Array],
    positionClass: [String, Function, Array],
    variantClass: [String, Function, Array],
    wrapperClass: [String, Function, Array]
  },
  computed: {
    rootClasses() {
      return [this.computedClass('rootClass', 'o-notification'), {
        [this.computedClass('variantClass', 'o-notification--', this.variant)]: this.variant
      }, {
        [this.computedClass('positionClass', 'o-notification--', this.position)]: this.position
      }];
    },

    wrapperClasses() {
      return [this.computedClass('wrapperClass', 'o-notification__wrapper')];
    },

    iconClasses() {
      return [this.computedClass('iconClass', 'o-notification__icon')];
    },

    contentClasses() {
      return [this.computedClass('contentClass', 'o-notification__content')];
    },

    closeClasses() {
      return [this.computedClass('closeClass', 'o-notification__close')];
    }

  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[_c('article',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],class:_vm.rootClasses},[(_vm.closable)?_c('button',{class:_vm.closeClasses,attrs:{"type":"button","aria-label":_vm.ariaCloseLabel},on:{"click":_vm.close}},[_c('o-icon',{attrs:{"clickable":"","icon":_vm.closeIcon,"size":"small"}})],1):_vm._e(),(_vm.component)?_c(_vm.component,_vm._g(_vm._b({tag:"component",on:{"close":_vm.close}},'component',_vm.props,false),_vm.events)):_vm._e(),(_vm.$scopedSlots.default || _vm.message)?_c('div',{class:_vm.wrapperClasses},[(_vm.computedIcon)?_c('o-icon',{class:_vm.iconClasses,attrs:{"icon":_vm.computedIcon,"pack":_vm.iconPack,"both":"","size":_vm.iconSize,"aria-hidden":""}}):_vm._e(),_c('div',{class:_vm.contentClasses},[(_vm.$scopedSlots.default)?[_vm._t("default",null,{"closeNotification":_vm.close})]:[_c('span',{domProps:{"innerHTML":_vm._s(_vm.message)}})]],2)],1):_vm._e()],1)])};
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

var NoticeMixin = {
  props: {
    /** Type (color) of the notification, optional. */
    type: {
      type: String
    },

    /** Message text (can contain HTML). */
    message: [String, Array],

    /** Visibility duration in miliseconds. */
    duration: {
      type: Number
    },

    /** If should queue with others notices (snackbar/toast/notification). */
    queue: {
      type: Boolean,
      default: undefined
    },

    /** Show the Notification indefinitely until it is dismissed when programmatically. */
    indefinite: {
      type: Boolean,
      default: false
    },

    /** Which position the notification will appear when programmatically. */
    position: {
      type: String,
      default: 'top',

      validator(value) {
        return ['top-right', 'top', 'top-left', 'bottom-right', 'bottom', 'bottom-left'].indexOf(value) > -1;
      }

    },

    /** DOM element the toast will be created on. Note that this also changes the position of the toast from fixed to absolute. Meaning that the container should be fixed. */
    container: String,

    /** Callback function to call after close (programmatically close or user canceled) */
    onClose: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      isActive: false,
      parentTop: null,
      parentBottom: null,
      newContainer: this.container || helpers.getValueByPath(config.getOptions(), 'notification.defaultContainerElement', undefined)
    };
  },

  computed: {
    correctParent() {
      switch (this.position) {
        case 'top-right':
        case 'top':
        case 'top-left':
          return this.parentTop;

        case 'bottom-right':
        case 'bottom':
        case 'bottom-left':
          return this.parentBottom;
      }
    },

    transition() {
      switch (this.position) {
        case 'top-right':
        case 'top':
        case 'top-left':
          return {
            enter: 'fadeInDown',
            leave: 'fadeOut'
          };

        case 'bottom-right':
        case 'bottom':
        case 'bottom-left':
          return {
            enter: 'fadeInUp',
            leave: 'fadeOut'
          };
      }
    }

  },
  methods: {
    shouldQueue() {
      const queue = this.queue !== undefined ? this.queue : helpers.getValueByPath(config.getOptions(), 'notification.defaultNoticeQueue', undefined);
      if (!queue) return false;
      return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
    },

    close() {
      clearTimeout(this.timer);
      this.isActive = false;
      this.$emit('close');
      this.onClose.apply(null, arguments); // Timeout for the animation complete before destroying

      setTimeout(() => {
        this.$destroy();
        helpers.removeElement(this.$el);
      }, 150);
    },

    showNotice() {
      if (this.shouldQueue()) {
        // Call recursively if should queue
        setTimeout(() => this.showNotice(), 250);
        return;
      }

      this.correctParent.insertAdjacentElement('afterbegin', this.$el);
      this.isActive = true;

      if (!this.indefinite) {
        this.timer = setTimeout(() => this.timeoutCallback(), this.newDuration);
      }
    },

    setupContainer() {
      this.parentTop = document.querySelector((this.newContainer ? this.newContainer : 'body') + `>.${this.rootClasses().join('.')}.${this.positionClasses('top').join('.')}`);
      this.parentBottom = document.querySelector((this.newContainer ? this.newContainer : 'body') + `>.${this.rootClasses().join('.')}.${this.positionClasses('bottom').join('.')}`);
      if (this.parentTop && this.parentBottom) return;

      if (!this.parentTop) {
        this.parentTop = document.createElement('div');
        this.parentTop.className = `${this.rootClasses().join(' ')} ${this.positionClasses('top').join(' ')}`;
      }

      if (!this.parentBottom) {
        this.parentBottom = document.createElement('div');
        this.parentBottom.className = `${this.rootClasses().join(' ')} ${this.positionClasses('bottom').join(' ')}`;
      }

      const container = document.querySelector(this.newContainer) || document.body;
      container.appendChild(this.parentTop);
      container.appendChild(this.parentBottom);

      if (this.newContainer) {
        this.parentTop.classList.add('has-custom-container');
        this.parentBottom.classList.add('has-custom-container');
      }
    },

    timeoutCallback() {
      return this.close();
    }

  },

  beforeMount() {
    this.setupContainer();
  },

  mounted() {
    this.showNotice();
  }

};

//
/**
 * @displayName Notification Notice
 */

var script$1 = {
  name: 'ONotificationNotice',
  configField: 'notification',
  mixins: [plugins.BaseComponentMixin, NoticeMixin],

  data() {
    return {
      newDuration: this.duration || helpers.getValueByPath(config.getOptions(), 'notification.duration', 1000)
    };
  },

  methods: {
    rootClasses() {
      return [this.computedClass('noticeClass', 'o-notices')];
    },

    positionClasses(position) {
      return [this.computedClass('noticePositionClass', 'o-notices--', position)];
    },

    timeoutCallback() {
      return this.$refs.notification.close();
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('o-notification',_vm._b({ref:"notification",on:{"close":_vm.close}},'o-notification',_vm.$options.propsData,false),[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

let localVueInstance;
const NotificationProgrammatic = {
  open(params) {
    let parent;

    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    const defaultParam = {
      position: helpers.getValueByPath(config.getOptions(), 'notification.position', 'top-right'),
      closable: params.closable || helpers.getValueByPath(config.getOptions(), 'notification.closable', false)
    };

    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }

    let slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    } // fix animation


    params.active = false;
    const propsData = helpers.merge(defaultParam, params);
    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || config.VueInstance;
    const NotificationNoticeComponent = vm.extend(__vue_component__$1);
    const component = new NotificationNoticeComponent({
      parent,
      el: document.createElement('div'),
      propsData
    });

    if (slot) {
      component.$slots.default = slot;
      component.$forceUpdate();
    } // fix animation


    component.$children[0].isActive = true;
    return component;
  }

};
const Plugin = {
  install(Vue) {
    localVueInstance = Vue;
    plugins.registerComponent(Vue, __vue_component__);
    plugins.registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic);
  }

};
plugins.use(Plugin);

exports.NotificationProgrammatic = NotificationProgrammatic;
exports.ONotification = __vue_component__;
exports.default = Plugin;
