'use strict';

var helpers = require('./helpers.js');
var config = require('./config.js');

var MatchMediaMixin = {
  props: {
    /**
     * Mobile breakpoint as max-width value
     */
    mobileBreakpoint: String
  },

  data() {
    return {
      $matchMediaRef: undefined,
      isMatchMedia: undefined
    };
  },

  methods: {
    onMatchMedia(event) {
      this.isMatchMedia = event.matches;
    }

  },

  created() {
    if (typeof window !== 'undefined') {
      let width = this.mobileBreakpoint;

      if (!width) {
        const config$1 = config.getOptions();
        const defaultWidth = helpers.getValueByPath(config$1, `mobileBreakpoint`, '1023px');
        width = helpers.getValueByPath(config$1, `${this.$options.configField}.mobileBreakpoint`, defaultWidth);
      }

      this.$matchMediaRef = window.matchMedia(`(max-width: ${width})`);
      this.isMatchMedia = this.$matchMediaRef.matches;
      this.$matchMediaRef.addListener(this.onMatchMedia, false);
    }
  },

  beforeDestroy() {
    if (typeof window !== 'undefined') {
      this.$matchMediaRef.removeListener(this.checkMatchMedia);
    }
  }

};

exports.MatchMediaMixin = MatchMediaMixin;
