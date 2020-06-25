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
 *
 * }
 */

var configurableProps = ['path', 'draggable', 'extData',

/* 本插件扩展的属性 */
'style', 'visible'];

var allProps = configurableProps.concat(['zIndex', 'bubble']);

var PolyProps = {
  path: null,
  draggable: false,
  extData: {},
  style: {},
  visible: false,
  zIndex: 0,
  bubble: false,
  events: {},
  children: null,
  onInstanceCreated: null,
  __map__: null,
  __ele__: null
};

var Polygon = (_temp = _class = function (_PureComponent) {
  _inherits(Polygon, _PureComponent);

  function Polygon(props) {
    _classCallCheck(this, Polygon);

    var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        var self = _this;
        _this.setterMap = {
          visible: function visible(val) {
            if (val) {
              self.polygon && self.polygon.show();
            } else {
              self.polygon && self.polygon.hide();
            }
          },
          style: function style(val) {
            self.polygon.setOptions(val);
          }
        };
        _this.converterMap = {
          path: function path(val) {
            return self.buildPathValue(val);
          }
        };
        _this.state = {
          loaded: false
        };
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        setTimeout(function () {
          _this.initMapPolygon(props);
        }, 13);
      }
    }
    return _this;
  }

  _createClass(Polygon, [{
    key: 'initMapPolygon',
    value: function initMapPolygon(props) {
      var options = this.buildCreateOptions(props);
      options.map = this.map;
      this.polygon = new window.AMap.Polygon(options);
      this.setState({
        loaded: true
      });
      this.props.onInstanceCreated && this.props.onInstanceCreated();
    }
  }, {
    key: 'buildCreateOptions',
    value: function buildCreateOptions(props) {
      var _this2 = this;

      var options = {};
      allProps.forEach(function (key) {
        if (key in props) {
          if (key === 'style' && props.style) {
            var styleItem = Object.keys(props.style);
            styleItem.forEach(function (item) {
              // $FlowFixMe
              options[item] = props.style[item];
            });
            // visible 做特殊处理
          } else if (key !== 'visible') {
            options[key] = _this2.getSetterValue(key, props[key]);
          }
        }
      });
      return options;
    }
  }, {
    key: 'detectPropChanged',
    value: function detectPropChanged(key, nextProps) {
      return this.props[key] !== nextProps[key];
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
    key: 'buildPathValue',
    value: function buildPathValue(path) {
      var _this3 = this;

      if (path.length) {
        var firstNode = path[0];
        if (typeof firstNode[0] === 'number') {
          return path.map(function (p) {
            return (0, _common.toLnglat)(p);
          });
        }
        if ('getLng' in firstNode) {
          return path;
        }
        if ('longitude' in firstNode || 'lng' in firstNode) {
          return path.map(function (p) {
            return (0, _common.toLnglat)(p);
          });
        }
        if ('length' in firstNode && firstNode.length) {
          // $FlowFixMe
          return path.map(function (ring) {
            return _this3.buildPathValue(ring);
          });
        }
      }
      return [];
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
      // const child = React.Children.only(children)
      // if (child.type === PolyEditor) {
      //   return React.cloneElement(child, {
      //     __poly__: this.polygon,
      //     __map__: this.map
      //   })
      // }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.state.loaded ? this.renderEditor(this.props.children) : null;
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.polygon;
    }
  }]);

  return Polygon;
}(_rax.PureComponent), _class.displayName = 'Polygon', _temp);
exports.default = (0, _wrapperGenerator2.default)(Polygon);
module.exports = exports['default'];