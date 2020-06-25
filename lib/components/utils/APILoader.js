'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CONFIG = {
  // v: '1.4.0',
  // v: '1.3.0',
  v: '1.4.6',
  hostAndPath: 'webapi.amap.com/maps',
  key: '12d37ebb0110bd05496fb6384bc78af0',
  callback: '__amap_init_callback',
  useAMapUI: false
};

var mainPromise = null;
var amapuiPromise = null;
var amapuiInited = false;

var APILoader = function () {
  function APILoader(_ref) {
    var key = _ref.key,
        useAMapUI = _ref.useAMapUI,
        version = _ref.version,
        protocol = _ref.protocol,
        loading = _ref.loading;

    _classCallCheck(this, APILoader);

    this.config = _extends({}, DEFAULT_CONFIG, { useAMapUI: useAMapUI, protocol: protocol, loading: loading });
    if (typeof window !== 'undefined') {
      if (key) {
        this.config.key = key;
      } else if ('amapkey' in window) {
        this.config.key = window.amapkey;
      }
    }
    if (version) {
      this.config.v = version;
    }
    this.protocol = protocol || window.location.protocol;
    if (this.protocol.indexOf(':') === -1) {
      this.protocol += ':';
    }
  }

  _createClass(APILoader, [{
    key: 'getScriptSrc',
    value: function getScriptSrc(cfg) {
      return this.protocol + '//' + cfg.hostAndPath + '?v=' + cfg.v + '&key=' + cfg.key + '&callback=' + cfg.callback;
    }
  }, {
    key: 'buildScriptTag',
    value: function buildScriptTag(src) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = src;
      return script;
    }
  }, {
    key: 'getAmapuiPromise',
    value: function getAmapuiPromise() {
      var script = this.buildScriptTag(this.protocol + '//webapi.amap.com/ui/1.0/main-async.js');
      var p = new Promise(function (resolve) {
        script.onload = function () {
          resolve();
        };
      });
      document.body.appendChild(script);
      return p;
    }
  }, {
    key: 'getMainPromise',
    value: function getMainPromise() {
      var _this = this;

      var script = this.buildScriptTag(this.getScriptSrc(this.config));
      var p = new Promise(function (resolve) {
        window[_this.config.callback] = function () {
          resolve();
          delete window[_this.config.callback];
        };
      });
      document.body.appendChild(script);
      return p;
    }
  }, {
    key: 'load',
    value: function load() {
      if (typeof window === 'undefined') {
        return null;
      }
      var _config = this.config,
          useAMapUI = _config.useAMapUI,
          loading = _config.loading;

      mainPromise = mainPromise || this.getMainPromise();
      if (useAMapUI) {
        amapuiPromise = amapuiPromise || this.getAmapuiPromise();
      }
      return new Promise(function (resolve) {
        mainPromise.then(function () {
          setTimeout(function () {
            if (useAMapUI && amapuiPromise) {
              amapuiPromise.then(function () {
                if (window.initAMapUI && !amapuiInited) {
                  window.initAMapUI();
                  if (typeof useAMapUI === 'function') {
                    useAMapUI();
                  }
                  amapuiInited = true;
                }
                resolve();
              });
            } else {
              resolve();
            }
          }, loading.time || 0);
        });
      });
    }
  }]);

  return APILoader;
}();

exports.default = APILoader;
module.exports = exports['default'];