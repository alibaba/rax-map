'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

var _APILoader = require('../utils/APILoader');

var _APILoader2 = _interopRequireDefault(_APILoader);

var _tool = require('../utils/tool');

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _common = require('../utils/common');

var _wrapperGenerator = require('../utils/wrapperGenerator');

var _wrapperGenerator2 = _interopRequireDefault(_wrapperGenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var containerStyle = {
  width: '100%',
  height: '100%'
};
var wrapperStyle = {
  width: '100%',
  height: '100%',
  position: 'relative'
};

// Native supported dynamic props by Amap
var NativeDynamicProps = ['layers', 'zoom', 'center', 'labelzIndex',

//
'mapStyle', 'features', 'cursor', 'pitch'];

/*
 * setStatus 可以动态修改
 */
var DynamicProps = ['animateEnable', 'doubleClickZoom', 'dragEnable', 'isHotspot', 'jogEnable', 'keyboardEnable', 'resizeEnable', 'rotateEnable', 'scrollWheel', 'touchZoom', 'zoomEnable'];

var StaticProps = ['view', 'zooms', 'showIndoorMap', 'indoorMap', 'expandZoomRange', 'showBuildingBlock', 'viewMode', 'pitchEnable', 'buildingAnimation', 'skyColor'];

var CreateProps = NativeDynamicProps.concat(DynamicProps, StaticProps);

var defaultOpts = {
  MapType: {
    showRoad: false,
    showTraffic: false,
    defaultType: 0
  },
  ToolBar: {
    position: 'RB', // 控件停靠位置 LT:左上角;RT:右上角;LB:左下角;RB:右下角;默认位置：LT
    noIpLocate: true, // 定位失败后，是否开启IP定位，默认为false
    locate: true, // 是否显示定位按钮，默认为false
    liteStyle: true, // 是否使用精简模式，默认为false
    autoPosition: false, // 是否自动定位，即地图初始化加载完成后,是否自动定位的用户所在地,仅在支持HTML5的浏览器中有效，默认为false
    direction: true // 方向键盘是否可见，默认为true
  },
  OverView: {},
  ControlBar: {
    position: 'LT',
    showZoomBar: true, // 是否显示缩放按钮。移动端默认为false，PC端为默认为true
    showControlButton: true // 是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true
  },
  Geolocation: { // 地理定位
    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
    timeout: 10000, // 超过10秒后停止定位，默认：无穷大
    maximumAge: 0, // 定位结果缓存0毫秒，默认：0
    convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
    showButton: true, // 显示定位按钮，默认：true
    buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
    // buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
    showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
    panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
    zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
  }
};

// class BaseMap
var BaseMap = (_temp = _class = function (_PureComponent) {
  _inherits(BaseMap, _PureComponent);

  function BaseMap(props) {
    _classCallCheck(this, BaseMap);

    var _this = _possibleConstructorReturn(this, (BaseMap.__proto__ || Object.getPrototypeOf(BaseMap)).call(this, props));

    _this.state = {
      mapLoaded: false
    };
    var self = _this;
    _this.setterMap = {
      zoom: function zoom(val) {
        self.map.setZoom(val);
      },
      cursor: function cursor(val) {
        self.map.setDefaultCursor(val);
      },
      labelzIndex: function labelzIndex(val) {
        self.map.setlabelzIndex(val);
      }
    };
    _this.converterMap = {
      center: _common.toLnglat
    };
    if (typeof window !== 'undefined') {
      _this.pluginMap = {};
      new _APILoader2.default({
        key: props.amapkey,
        useAMapUI: props.useAMapUI,
        version: props.version,
        protocol: props.protocol,
        loading: props.loading
      }).load().then(function () {
        _this.createInstance();
        if (!_this.state.mapLoaded) {
          _this.setState({
            mapLoaded: true
          });
        }
      });
    }
    return _this;
  }

  // 只暴露了自定义部分,其他prop沿用AMap的api


  _createClass(BaseMap, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.state.mapLoaded) {
        this.updateMapProps(this.props, nextProps);
      }
    }
  }, {
    key: 'renderChildren',
    value: function renderChildren() {
      var _this2 = this;

      return _rax.Children.map(this.props.children, function (child) {
        if (child) {
          var cType = child.type;
          /* 针对下面两种组件不注入地图相关属性
           * 1. 明确声明不需要注入的
           * 2. DOM 元素
           */
          if (cType.preventAmap || typeof cType === 'string') {
            return child;
          }
          return (0, _rax.cloneElement)(child, {
            __map__: _this2.map,
            __raxMap__: _this2
          });
        }
        return child;
      });
    }
  }, {
    key: 'createInstance',
    value: function createInstance() {
      if (!this.map) {
        var options = this.buildMapOptions();
        this.map = new window.AMap.Map(this.mapWrapper, options);
        // install map plugins
        this.setPlugins(this.props);
        this.props.onInstanceCreated && this.props.onInstanceCreated();
      }
    }
  }, {
    key: 'buildMapOptions',
    value: function buildMapOptions() {
      var _this3 = this;

      var props = this.props;
      var options = {};
      CreateProps.forEach(function (key) {
        if (key in props) {
          options[key] = _this3.getSetterValue(key, props);
        }
      });
      return options;
    }
  }, {
    key: 'updateMapProps',
    value: function updateMapProps(prevProps, nextProps) {
      var _this4 = this;

      var nextMapStatus = {};
      var statusChangeFlag = false;
      var statusPropExist = false;
      DynamicProps.forEach(function (key) {
        if (key in nextProps) {
          statusPropExist = true;
          if (_this4.findPropChanged(key, prevProps, nextProps)) {
            statusChangeFlag = true;
            nextMapStatus[key] = nextProps[key];
          }
        }
      });
      statusChangeFlag && this.map.setStatus(nextMapStatus);
      if (statusPropExist && 'status' in nextProps) {
        _log2.default.warning('\u5355\u72EC\u63D0\u4F9B\u8FDB\u884C\u914D\u7F6E\u548C\u2018status\u2019\u5C5E\u6027\u914D\u7F6E\uFF0C\u4E0D\u652F\u6301\u540C\u65F6\u4F7F\u7528\u3002\n\uFF08' + DynamicProps.join(', ') + '\uFF09');
      }
      StaticProps.forEach(function (key) {
        if (key in nextProps) {
          if (_this4.findPropChanged(key, prevProps, nextProps)) {
            _log2.default.warning('\'' + key + '\' \u662F\u4E00\u4E2A\u9759\u6001\u5C5E\u6027\uFF0C\u5730\u56FE\u5B9E\u4F8B\u521B\u5EFA\u6210\u529F\u540E\u65E0\u6CD5\u4FEE\u6539');
          }
        }
      });
      this.setPlugins(nextProps);
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
    key: 'findPropChanged',
    value: function findPropChanged(key, prevProps, nextProps) {
      return prevProps[key] !== nextProps[key];
    }
  }, {
    key: 'installPlugin',
    value: function installPlugin(name, opts) {
      opts = opts || {};
      switch (name) {
        case 'Scale':
        case 'ToolBar':
        case 'OverView':
        case 'MapType':
          this.setMapPlugin(name, opts);
          break;
        case 'ControlBar':
          this.setControlBar(opts);
          break;
        case 'Geolocation':
          this.setGeolocationPlugin(name, opts);
          break;
        default:
        // do nothing
      }
    }
  }, {
    key: 'uninstallPlugins',
    value: function uninstallPlugins(plugins) {
      var _this5 = this;

      if (plugins && plugins.length) {
        plugins.forEach(function (p) {
          if (p in _this5.pluginMap) {
            // ControlBar has no 'hide' method
            if (p === 'ControlBar') {
              _this5.map.removeControl(_this5.pluginMap[p]);
              delete _this5.pluginMap[p];
            } else {
              _this5.pluginMap[p].hide();
            }
          }
        });
      }
    }
  }, {
    key: 'setPlugins',
    value: function setPlugins(props) {
      var _this6 = this;

      var pluginList = ['Scale', 'ToolBar', 'MapType', 'OverView', 'ControlBar', 'Geolocation'];
      if ('plugins' in props) {
        var plugins = props.plugins;
        if (plugins && plugins.length) {
          plugins.forEach(function (p) {
            var name = void 0,
                config = void 0,
                visible = void 0;
            if (typeof p === 'string') {
              name = p;
              config = null;
              visible = true;
            } else {
              name = p.name;
              config = p.options || {};
              visible = 'visible' in config && typeof config.visible === 'boolean' ? config.visible : true;
              delete config.visible;
            }
            var idx = pluginList.indexOf(name);
            if (idx === -1) {
              _log2.default.warning('\u6CA1\u6709 \u2018' + name + '\u2019 \u8FD9\u4E2A\u63D2\u4EF6\uFF0C\u8BF7\u68C0\u67E5\u914D\u7F6E');
            } else {
              if (visible) {
                pluginList.splice(idx, 1);
                _this6.installPlugin(name, config);
              }
            }
          });
        }
      }
      this.uninstallPlugins(pluginList);
    }

    /*
    * 设置Geolocation的plugin配置
    * */

  }, {
    key: 'setGeolocationPlugin',
    value: function setGeolocationPlugin(name, opts, cb) {
      var _this7 = this;

      if (this.pluginMap.Geolocation) {
        cb && cb(this.pluginMap.Geolocation);
      } else {
        var onCreated = opts.onCreated,
            onGeoComplete = opts.onGeoComplete,
            onGeoError = opts.onGeoError,
            restOpts = _objectWithoutProperties(opts, ['onCreated', 'onGeoComplete', 'onGeoError']);

        var initOpts = _extends({}, defaultOpts.Geolocation, restOpts);
        this.map.plugin(['AMap.Geolocation'], function () {
          var buttonOffset = initOpts.buttonOffset;

          if (buttonOffset && buttonOffset.x && buttonOffset.y) {
            initOpts.buttonOffset = new window.AMap.Pixel(buttonOffset.x, buttonOffset.y);
          }
          console.log('GeolocationPlugin设置:', buttonOffset, name, initOpts);
          _this7.pluginMap.Geolocation = new window.AMap.Geolocation(initOpts);
          _this7.map.addControl(_this7.pluginMap.Geolocation);
          if ((0, _tool.isFun)(onCreated)) {
            onCreated(_this7.pluginMap.Geolocation);
            cb && cb(_this7.pluginMap.Geolocation);
          }
          // 添加成功与否验证
          _this7.pluginMap.Geolocation.getCurrentPosition(function (status, result) {
            if (status == 'complete') {
              if ((0, _tool.isFun)(onGeoComplete)) {
                onGeoComplete(result);
              }
            } else {
              if ((0, _tool.isFun)(onGeoError)) {
                onGeoError(result);
              }
            }
          });
        });
      }
    }

    /*
    * 设置Geolocation和ControlBar之外的plugin配置
    * */

  }, {
    key: 'setMapPlugin',
    value: function setMapPlugin(name, opts, cb) {
      var _this8 = this;

      if (this.pluginMap[name]) {
        this.pluginMap[name].show();
        cb && cb(this.pluginMap[name]);
      } else {
        var onCreated = opts.onCreated,
            restOpts = _objectWithoutProperties(opts, ['onCreated']);

        var initOpts = _extends({}, defaultOpts[name], restOpts);
        console.log('plugin设置:', name, initOpts);
        this.map.plugin(['AMap.' + name], function () {
          _this8.pluginMap[name] = new window.AMap[name](initOpts);
          _this8.map.addControl(_this8.pluginMap[name]);
          _this8.pluginMap[name].show();
          if ((0, _tool.isFun)(onCreated)) {
            onCreated(_this8.pluginMap[name]);
            cb && cb(_this8.pluginMap[name]);
          }
        });
      }
    }

    /*
    * 设置ControlBar的plugin配置
    * */

  }, {
    key: 'setControlBar',
    value: function setControlBar(opts, cb) {
      var _this9 = this;

      if (this.pluginMap.ControlBar) {
        cb && cb(this.pluginMap.ControlBar);
      } else {
        var onCreated = opts.onCreated,
            restOpts = _objectWithoutProperties(opts, ['onCreated']);

        var initOpts = _extends({}, defaultOpts.ControlBar, restOpts);
        this.map.plugin(['AMap.ControlBar'], function () {
          _this9.pluginMap.ControlBar = new window.AMap.ControlBar(initOpts);
          _this9.map.addControl(_this9.pluginMap.ControlBar);
          if ((0, _tool.isFun)(onCreated)) {
            onCreated(_this9.pluginMap.ControlBar);
            cb && cb(_this9.pluginMap.ControlBar);
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this10 = this;

      var loading = this.props.loading;

      var loadingRender = loading.render instanceof Function ? loading.render : function () {
        return null;
      };
      return (0, _rax.createElement)(
        _raxView2.default,
        { ref: 'mapContainer', style: wrapperStyle },
        (0, _rax.createElement)(
          'div',
          { ref: function ref(div) {
              _this10.mapWrapper = div;
            }, style: containerStyle },
          this.state.mapLoaded ? null : loadingRender() || null
        ),
        (0, _rax.createElement)(
          'div',
          { ref: 'otherContainer' },
          this.state.mapLoaded ? this.renderChildren() : null
        )
      );
    }
  }, {
    key: 'instance',
    get: function get() {
      return this.map;
    }
  }]);

  return BaseMap;
}(_rax.PureComponent), _class.displayName = 'BaseMap', _class.defaultProps = {
  key: '',
  useAMapUI: '',
  version: '',
  protocol: '',
  plugins: [],
  events: {},
  loading: {
    time: 0,
    render: function render() {
      return null;
    }
  },
  status: {}
}, _temp);
exports.default = (0, _wrapperGenerator2.default)(BaseMap);
module.exports = exports['default'];