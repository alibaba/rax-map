'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

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

var configurableProps = ['center', 'radius', 'draggable', 'extData',

/* 非原生的接口，这是本组件的扩展 */
'visible', 'style'];

var allProps = configurableProps.concat(['zIndex', 'bubble']);

var CircleProps = {
  __map__: null,
  __ele__: null,
  center: null,
  onInstanceCreated: null,
  radius: 0,
  draggable: false,
  extData: {},
  visible: false,
  style: {},
  zIndex: 0,
  bubble: false,
  events: null,
  children: null
};

var Circle = (_temp = _class = function (_PureComponent) {
  _inherits(Circle, _PureComponent);

  function Circle(props) {
    _classCallCheck(this, Circle);

    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (self.mapCircle) {
              if (val) {
                self.mapCircle.show();
              } else {
                self.mapCircle.hide();
              }
            }
          },
          style: function style(val) {
            self.mapCircle && self.mapCircle.setOptions(val);
          }
        };
        _this.converterMap = {
          center: _common.toLnglat
        };
        _this.state = {
          loaded: false
        };
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        _this.createInstance(props).then(function () {
          _this.setState({
            loaded: true
          });
          _this.props.onInstanceCreated && _this.props.onInstanceCreated();
        });
      }
    }
    return _this;
  }

  _createClass(Circle, [{
    key: 'createInstance',
    value: function createInstance(props) {
      var options = this.buildCreateOptions(props);
      options.map = this.map;
      this.mapCircle = new window.AMap.Circle(options);
      return Promise.resolve(this.mapCircle);
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props) {
      var _this2 = this;

      var options = {};
      allProps.forEach(function (key) {
        if (key in props) {
          if (key === 'style' && props.style !== undefined) {
            var styleItem = Object.keys(props.style);
            styleItem.forEach(function (item) {
              // $FlowFixMe
              options[item] = props.style[item];
            });
          } else {
            options[key] = _this2.getSetterValue(key, props);
          }
        }
      });
      return options;
    }
  }, {
    key: 'getSetterValue',
    value: function getSetterValue(key, props) {
      if (key in this.converterMap) {
        return this.converterMap[key](props[key]);
      }
      return props[key];
    }
  }, {
    key: 'renderEditor',
    value: function renderEditor(children) {
      if (!children) {
        return null;
      }
      if (_rax.Children.count(children) !== 1) {
        return null;
      }
      return (0, _rax.cloneElement)(_rax.Children.only(children), {
        __circle__: this.mapCircle,
        __map__: this.map,
        __ele__: this.element
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.loaded ? this.renderEditor(this.props.children) : null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.mapCircle;
    }
  }]);

  return Circle;
}(_rax.PureComponent), _class.displayName = 'Circle', _temp);
exports.default = (0, _wrapperGenerator2.default)(Circle);
module.exports = exports['default'];