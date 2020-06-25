'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

var _wrapperGenerator = require('../utils/wrapperGenerator');

var _wrapperGenerator2 = _interopRequireDefault(_wrapperGenerator);

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _common = require('../utils/common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

var configurableProps = ['content', 'position', 'size',
/* 非原生 */
'visible',

/* 这个 setOffset  方法高德并没有明确在文档中列出来，不确定会不会撤销 */
'offset'];

var allProps = configurableProps.concat(['isCustom', 'autoMove', 'closeWhenClickMap', 'showShadow']);

var IWProps = {
  content: {},
  onInstanceCreated: null,
  position: null,
  size: null,
  visible: false,
  offset: null,
  isCustom: false,
  autoMove: false,
  closeWhenClickMap: false,
  showShadow: false,
  events: null,
  children: null,
  className: '',
  __map__: null,
  __ele__: null
};

var Tip = function (_PureComponent) {
  _inherits(Tip, _PureComponent);

  function Tip(props) {
    _classCallCheck(this, Tip);

    var _this = _possibleConstructorReturn(this, (Tip.__proto__ || Object.getPrototypeOf(Tip)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (val) {
              self.show();
              self.setClassName(self.props);
              self.setChild(self.props);
            } else {
              self.close();
            }
          }
        };
        _this.converterMap = {
          size: _common.toSize,
          offset: _common.toPixel,
          position: _common.toLnglat
        };
        _this.map = props.__map__;
        _this.isCustom = true;
        setTimeout(function () {
          _this.createTip(props);
        }, 13);
      }
    }
    return _this;
  }

  _createClass(Tip, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        this.refreshTipLayout(nextProps);
      }
    }
  }, {
    key: 'createTip',
    value: function createTip(props) {
      var options = this.buildCreateOptions(props);
      this.tip = new window.AMap.InfoWindow(options);
      this.props.onInstanceCreated && this.props.onInstanceCreated();
    }
  }, {
    key: 'refreshTipLayout',
    value: function refreshTipLayout(nextProps) {
      this.setChild(nextProps);
      this.setClassName(nextProps);
    }
  }, {
    key: 'checkPropChanged',
    value: function checkPropChanged(key, nextProps) {
      return this.props[key] !== nextProps[key];
    }
  }, {
    key: 'show',
    value: function show() {
      this.tip.open(this.map, this.tip.getPosition());
    }
  }, {
    key: 'close',
    value: function close() {
      this.tip.close();
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props) {
      var _this2 = this;

      var options = {};

      // 如果开发者没有设置 isCustom 属性，默认设置为 false
      if ('isCustom' in props) {
        options.isCustom = !!props.isCustom;
      } else {
        options.isCustom = false;
      }

      if ('content' in props) {
        options.content = props.content;
      } else {
        this.infoDOM = document.createElement('div');
        options.content = this.infoDOM;
      }

      allProps.forEach(function (key) {
        if (key in props) {
          if (['visible', 'isCustom', 'content'].indexOf(key) === -1) {
            options[key] = _this2.getSetterValue(key, props[key]);
          }
        }
      });
      return options;
    }
  }, {
    key: 'getSetterValue',
    value: function getSetterValue(key, value) {
      if (key in this.converterMap) {
        return this.converterMap[key](value);
      }
      return value;
    }
  }, {
    key: 'setChild',
    value: function setChild(props) {
      var child = props.children;
      if (this.infoDOM && child) {
        (0, _rax.render)((0, _rax.createElement)(
          'div',
          null,
          child
        ), this.infoDOM);
      } else {
        if (props.children) {
          console.warn('因为你设置 isCustom 为 true，Tip 的 Children 被忽略');
        }
      }
    }
  }, {
    key: 'setClassName',
    value: function setClassName(props) {
      if (this.infoDOM) {
        var baseClsValue = '';
        // 刷新 className
        if ('className' in props && props.className) {
          baseClsValue += props.className;
        } else if (props.isCustom === true) {
          baseClsValue += 'amap_markers_pop_window';
        }
        this.infoDOM.className = baseClsValue;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.tip;
    }
  }]);

  return Tip;
}(_rax.PureComponent);

exports.default = (0, _wrapperGenerator2.default)(Tip);
module.exports = exports['default'];