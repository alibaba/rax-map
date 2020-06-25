'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created with WebStorm.
                    * User: 一晟
                    * Date: 2018/5/7
                    * Time: 上午10:25
                    * email: zhu.yan@alibaba-inc.com
                    * To change this template use File | Settings | File Templates.
                    */


var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

var _objectHash = require('object-hash');

var _objectHash2 = _interopRequireDefault(_objectHash);

var _tool = require('../utils/tool');

var _log = require('../utils/log');

var _log2 = _interopRequireDefault(_log);

var _markerUtils = require('../utils/markerUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (typeof window !== 'undefined') {
  var styleText = '.amap_markers_pop_window{\n    padding: 10px;\n    border: 1px solid #ddd;\n    border-radius: 8px;\n    background: #fff;\n    position: relative;\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: flex-start;\n}\n.amap_markers_pop_window::before{\n    content: \' \';\n    display: block;\n    position: absolute;\n    bottom: -12px;\n    left: 50%;\n    margin-left: -7px;\n    width: 0;\n    height: 0;\n    border-top: 12px solid #ddd;\n    border-left: 7px solid transparent;\n    border-right: 7px solid transparent;\n}\n.amap_markers_pop_window::after{\n    content: \' \';\n    display: block;\n    position: absolute;\n    bottom: -11px;\n    left: 50%;\n    margin-left: -6px;\n    width: 0;\n    height: 0;\n    border-top: 11px solid #fff;\n    border-left: 6px solid transparent;\n    border-right: 6px solid transparent;\n}\n.amap_markers_pop_window_item{\n    cursor:pointer;\n    width: 40px;\n    height: 50px;\n    display: flex;\n    align-items: flex-end;\n    justify-content: center;\n}\n.amap_markers_pop_window_item span{\n    pointer-events: none;\n}\n.amap_markers_window_overflow_warning{\n    text-align: center;\n    width: 100%;\n    margin: 5px 0;\n    color: #666;\n}';
  var headEl = document.head || document.getElementsByTagName('head')[0];
  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.textContent = styleText;
  headEl.appendChild(styleEl);
}

var SCALE = 0.8;
var SIZE_WIDTH = 32 * SCALE;
var SIZE_HEIGHT = 46 * SCALE - 2;
var SIZE_HOVER_WIDTH = 46 * SCALE;
var SIZE_HOVER_HEIGHT = 66 * SCALE - 2;
var MAX_INFO_MARKERS = 42;

var defaultOpts = {
  useCluster: false,
  markersCache: [],
  markerIDCache: []
};

var ClusterProps = ['gridSize', 'minClusterSize', 'maxZoom', 'averageCenter', 'styles', 'zoomOnClick', 'renderCluserMarker'];

var IdKey = '__rax_amap__';

// const MarkerDOM = HTMLDivElement & { markerRef: Object };
/*
 * props
 * {
 *  useCluster(boolean)是否使用聚合点
 *  markers(array<>)坐标列表
 *  __map__ 父级组件传过来的地图实例
 *  __ele__ 父级组件传过来的地图容器
 * }
 */

var Markers = (_temp = _class = function (_PureComponent) {
  _inherits(Markers, _PureComponent);

  function Markers(props) {
    _classCallCheck(this, Markers);

    var _this = _possibleConstructorReturn(this, (Markers.__proto__ || Object.getPrototypeOf(Markers)).call(this, props));

    _this.renderCluserMarker1 = function (context, scope) {
      var masterContext = context.markers[context.count - 1];
      var childContext = masterContext.getContent().children[0]; // 获取marker的样式
      var count = 1;
      var div = document.createElement('div');
      if (childContext && childContext.children[0]) {
        var mStyle = childContext.children[0].style.cssText;
        mStyle += 'padding:0 10px;text-align:center;white-space:nowrap;';
        div.style.cssText = mStyle;
        div.innerHTML = '\u672C\u533A\u57DF\u5171\u8BA1\u6709(' + context.count + ')\u4E2A';
        context.marker.setContent(div);
      }
    };

    _this.renderCluserMarker = function (context, scope) {
      var marker = _this.props.renderCluser(context);
      var dom = document.createElement('div');
      context.marker.setContent(dom);
      (0, _rax.render)((0, _rax.createElement)(
        _raxView2.default,
        null,
        marker
      ), dom);
    };

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        _log2.default.warning('MAP_INSTANCE_REQUIRED');
      } else {
        _this.map = props.__map__;
        _this.element = _this.map.getContainer();
        _this.markersCache = defaultOpts.markersCache;
        /// this.useCluster = null;
        _this.markerIDCache = defaultOpts.markerIDCache;
        _this.resetOffset = new window.AMap.Pixel(-SIZE_WIDTH / 2, -SIZE_HEIGHT);
        _this.hoverOffset = new window.AMap.Pixel(-SIZE_HOVER_WIDTH / 2, -SIZE_HOVER_HEIGHT);
        // this.keepLive = props.keepLive || false;
        _this.createMarkers(props);
      }
    }
    return _this;
  }

  _createClass(Markers, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }

    /* 创建amap类型的markers
    * props:rax 对象的props
    * */

  }, {
    key: 'createMarkers',
    value: function createMarkers(props) {
      var _this2 = this;

      var markers = props.markers || [];
      var mapMarkers = [];
      var markerReactChildDOM = {};
      markers.length && markers.forEach(function (raw, idx) {
        var options = _this2.buildMarkersOptions(props, raw, idx);
        options.map = _this2.map;
        var markerContent = null;
        if ((0, _tool.isFun)(props.render)) {
          // $FlowFixMe
          var markerChild = props.render(raw);
          if (markerChild !== false) {
            var div = document.createElement('div');
            div.setAttribute(IdKey, '1');
            markerContent = div;
            markerReactChildDOM[idx] = markerChild;
          }
        }

        if (!markerContent) {
          markerContent = document.createElement('div');
          var img = document.createElement('img');
          img.src = '//webapi.amap.com/theme/v1.3/markers/n/mark_bs.png';
          markerContent.appendChild(img);
        }
        options.content = markerContent;
        var marker = new window.AMap.Marker(options);
        marker.on('click', function (e) {
          _this2.onMarkerClick(e);
        });
        marker.on('mouseover', function (e) {
          _this2.onMarkerHover(e);
        });
        marker.on('mouseout', function (e) {
          _this2.onMarkerHoverOut(e);
        });
        marker.on('touchstart', function (e) {
          _this2.onMarkerTouchstart(e);
        });
        marker.on('touchend', function (e) {
          _this2.onMarkerTouchend(e);
        });
        marker.on('touchmove', function (e) {
          _this2.onMarkerTouchmove(e);
        });

        marker.render = function (marker) {
          return function (component) {
            return (0, _markerUtils.renderMarkerComponent)(component, marker);
          };
        }(marker);

        _this2.bindMarkerEvents(marker);
        mapMarkers.push(marker);
        // 做每个marker的唯一性标记,用于比较marker的交并关系,isArea是为了处理是否是区域聚合
        raw.createdHash = (0, _objectHash2.default)({
          longitude: options.position.lng,
          latitude: options.position.lat,
          isArea: options.extData.isArea
        });
        raw.hashPosition = { longitude: options.position.lng, latitude: options.position.lat };
        raw.feature = marker;
        raw.cacheIndex = mapMarkers.indexOf(marker);
      });
      this.markersCache = mapMarkers;
      /// this.markersCache = this.markersCache.concat(mapMarkers);
      this.markerReactChildDOM = markerReactChildDOM;
      this.exposeMarkerInstance();
      this.checkClusterSettings(props);
    }
  }, {
    key: 'checkClusterSettings',
    value: function checkClusterSettings(props) {
      var _this3 = this;

      if (props.useCluster) {

        // if(props.renderCluser) {
        //   props.useCluster = {};
        //   props.useCluster.renderCluserMarker = this.renderCluserMarker;
        // }
        //
        // console.log('props.useCluster==>',props.useCluster);

        this.loadClusterPlugin(props.useCluster).then(function (cluster) {
          cluster.setMarkers(_this3.markersCache);
        });
      } else {
        if (this.mapCluster) {
          var markers = this.mapCluster.getMarkers();
          this.mapCluster.clearMarkers();
          markers.forEach(function (marker) {
            marker.setMap(_this3.map);
          });
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.map) {
        this.setMarkerChild();
      }
    }

    /*
    * 创建rax类型的markers(渲染所有数据)
    * 根据markerReactChildDOM,来渲染所有的markersCache
    * 相当于redraw
    * */

  }, {
    key: 'setMarkerChild',
    value: function setMarkerChild() {
      var _this4 = this;

      Object.keys(this.markerReactChildDOM).forEach(function (idx) {
        var dom = _this4.markersCache[idx].getContent();
        var child = _this4.markerReactChildDOM[idx];
        _this4.renderMarkerChild(dom, child);
      });
    }

    /*
    * 创建rax类型的markers(只渲染新数据)
    * 根据filterCache(差集),来渲染最新加载的marker
    * 相当于draw
    * */

  }, {
    key: 'refreshMarkerChild',
    value: function refreshMarkerChild(filterCache) {
      var _this5 = this;

      var allChild = filterCache;
      allChild.forEach(function (item) {
        var idx = item.cacheIndex;
        var dom = _this5.markersCache[idx].getContent();
        var child = _this5.markerReactChildDOM[idx];
        _this5.renderMarkerChild(dom, child);
      });
    }

    /* 创建rax类型的markers */

  }, {
    key: 'renderMarkerChild',
    value: function renderMarkerChild(dom, child) {
      (0, _rax.render)((0, _rax.createElement)(
        _raxView2.default,
        null,
        child
      ), dom);
    }

    /*
    * 格式化markers数据
    * props: markers props对象
    * raw: amap里的marker 对象的 部分options
    * idx: 索引值
    * MarkerAllProps:amap里的marker 对象的 全部options
    * */

  }, {
    key: 'buildMarkersOptions',
    value: function buildMarkersOptions(props, raw, idx) {
      var result = {};
      // 强制用户通过 render 函数来定义外观
      // const disabledKeys = ['label', 'icon', 'content'];
      // 还是不强制好，通过覆盖的方式来(如果有 render，覆盖 content/icon);
      var disabledKeys = ['extData'];
      _markerUtils.MarkerAllProps.forEach(function (key) {
        if (key in raw && disabledKeys.indexOf(key) === -1) {
          result[key] = (0, _markerUtils.getPropValue)(key, raw[key]);
        } else if (key in props) {
          if ((0, _tool.isFun)(props[key])) {
            var tmpValue = props[key].call(null, raw, idx);
            result[key] = (0, _markerUtils.getPropValue)(key, tmpValue);
          } else {
            result[key] = (0, _markerUtils.getPropValue)(key, props[key]);
          }
        }
      });
      result.extData = raw;
      // result.offset={x:-100,y:-34-8}
      return result;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.map) {
        this.refreshMarkersLayout(nextProps);
      }
    }

    /* 过滤markersCache(所有markers的临时缓存),把不需要重绘的(已经加载的点),排除
    * newCache:新传入的marker对象的options;
    * oldCache:cache中保存的marker对象;
    * filterFun:预留加判断权重
    * */

  }, {
    key: 'pruneCache',
    value: function pruneCache(newCache, oldCache, filterFun) {
      var same = [];
      var diff = [];
      diff = newCache.filter(function (key) {
        var hasHash = oldCache.find(function (marker) {
          // let extData = marker.getExtData();
          // if (extData && extData.createdHash === key.createdHash) {//是否已经在cache中
          var extData = marker.createdHash;
          if (extData && extData === key.createdHash) {
            // 是否已经在cache中
            same.push(key);
            return filterFun ? filterFun() : true; // 如果有,调用过滤函数
          }
          return false;
        });
        return !hasHash;
      });
      if (!oldCache.length) {
        same = newCache;
      }

      return { diff: diff, same: same };
    }
  }, {
    key: 'refreshMarkersLayout',
    value: function refreshMarkersLayout(nextProps) {
      var markerChanged = nextProps.markers !== this.props.markers;
      var clusterChanged = !!this.props.useCluster !== !!nextProps.useCluster;
      if (markerChanged) {
        var relationship = this.pruneCache(nextProps.markers, this.props.markers);
        var keepCache = relationship.same;
        var filterCache = relationship.diff;
        // console.log('╔═════════════════════════════refresh═════════════════════════════╗');
        // console.log('数据发生变化:', markerChanged);
        // console.log('差集:', filterCache, '数量:', filterCache.length);
        // console.log('交集:', keepCache, '数量:', keepCache.length);
        // console.log('新数据:', nextProps.markers, '数量:', nextProps.markers.length);
        // console.log('旧数据:', this.props.markers, '数量:', this.props.markers.length);
        // console.log('旧cache:', this.markersCache, '数量:', this.markersCache.length);
        // console.log('╚══════════════════════════════════════════════════════════════════╝');

        // keepLive=false,清空所有marker
        // keepCache=[ ] 表示新旧数据对比,没有任何的重复,说明数据彻底做了刷新
        this.props.useCluster && (this.props.keepLive = false); // 目前 keeLive 与 useCluster 是互斥关系,不能同时使用;

        /// 如果keepLive=true,只在改变级别时或者远距离改变中心点时,全清数据。
        /// 如果keepLive=false,每次改变 markers 数组就触发。
        /// 优化策略 keepLive = true,只记录增量。keepLive=false,全量刷新,如果此时markers巨大,同时又没有做 useCluster,内存会瞬间陡增。
        if (!this.props.keepLive || !keepCache.length) {
          var clearList = this.props.useCluster || !this.props.useCluster && !this.props.keepLive ? this.markersCache : this.props.markers;
          window.clearList = clearList;
          clearList.length && clearList.forEach(function (item) {
            var marker = !(item.setMap instanceof Function) ? item.feature : item;
            if (marker) {
              setTimeout(function (mk) {
                // 延迟使删除之前 marker 在队列结尾执行
                mk.setMap(null);
                mk = null;
              }, 0, marker);
            }
          });
        }
        this.markersCache = defaultOpts.markersCache; // markersCache 归零
        // draw和redraw
        if (markerChanged && (!this.props.keepLive || !keepCache.length)) {
          this.createMarkers(nextProps);
          /// setTimeout(()=>{ // 打开这里注释,可以看到全屏刷新和局部刷新的差别。
          this.setMarkerChild();
          /// },0)
        } else {
          var realProps = {};
          Object.keys(nextProps).forEach(function (idx) {
            // 浅复制,生成新的marker,需要加载的marker数据
            realProps[idx] = nextProps[idx];
          });
          realProps.markers = filterCache;
          this.createMarkers(realProps);
          this.refreshMarkerChild(filterCache);
        }
      }
      if (markerChanged || clusterChanged) {
        if (this.markersWindow) {
          this.markersWindow.close();
        }
      }
      if (clusterChanged) {
        this.checkClusterSettings(nextProps);
      }
    }
  }, {
    key: 'loadClusterPlugin',
    value: function loadClusterPlugin(clusterConfig) {
      var _this6 = this;

      if (this.mapCluster) {
        return Promise.resolve(this.mapCluster);
      }
      var config = typeof clusterConfig === 'boolean' ? {} : clusterConfig;
      return new Promise(function (resolve) {
        _this6.map.plugin(['AMap.MarkerClusterer'], function () {
          resolve(_this6.createClusterPlugin(config));
        });
      });
    }

    /*
    * 聚合的默认样式,追踪marker(最后一个)的style样式(目前只支持默认样式)。
    */

  }, {
    key: 'createClusterPlugin',
    value: function createClusterPlugin(config) {
      var options = {};
      // const style = {
      //   url: clusterIcon,
      //   size: new window.AMap.Size(56, 56),
      //   offset: new window.AMap.Pixel(-28, -28)
      // };
      var defalutOptions = {
        scope: this,
        minClusterSize: 2,
        zoomOnClick: true,
        maxZoom: 14,
        gridSize: 50,
        // styles: [style, style, style],
        averageCenter: false // 聚合点的图标位置是否是所有聚合内点的中心点。默认为否，即聚合点的图标位置位于聚合内的第一个点处
      };
      // 如果有 Markers 的 renderCluser 属性就渲染 CluserMarker,静态方法,只初始化渲染
      this.props.useCluster && (0, _tool.isFun)(this.props.renderCluser) && (defalutOptions.renderCluserMarker = this.renderCluserMarker);

      ClusterProps.forEach(function (key) {
        if (key in config) {
          options[key] = config[key];
        } else {
          options[key] = defalutOptions[key];
        }
      });

      this.mapCluster = new window.AMap.MarkerClusterer(this.map, [], options);
      var events = {};
      if ('events' in config) {
        events = config.events;
        if ('created' in events) {
          events.created(this.mapCluster);
        }
      }
      /// this.initClusterMarkerWindow();// ryan+,关闭cluser默认展开的事件自定义
      /// this.bindClusterEvent(events); // ryan+,关闭cluser默认展开的事件自定义
      return this.mapCluster;
    }
  }, {
    key: 'onMarkerClick',
    value: function onMarkerClick(e) {
      var marker = e.target;
      this.triggerMarkerClick(e, marker);
    }
  }, {
    key: 'onMarkerTouchend',
    value: function onMarkerTouchend(e) {
      var marker = e.target;
      this.triggerMarkerTouchend(e, marker);
    }
  }, {
    key: 'onMarkerTouchmove',
    value: function onMarkerTouchmove(e) {
      var marker = e.target;
      this.triggerMarkerTouchmove(e, marker);
    }
  }, {
    key: 'onMarkerTouchstart',
    value: function onMarkerTouchstart(e) {
      var marker = e.target;
      this.triggerMarkerTouchstart(e, marker);
    }
  }, {
    key: 'onMarkerHover',
    value: function onMarkerHover(e) {
      e.target.setTop(true);
      this.setMarkerHovered(e, e.target);
    }
  }, {
    key: 'onMarkerHoverOut',
    value: function onMarkerHoverOut(e) {
      e.target.setTop(false);
      this.setMarkerHoverOut(e, e.target);
    }
  }, {
    key: 'onWindowMarkerClick',
    value: function onWindowMarkerClick(element) {
      var marker = element.markerRef;
      this.triggerMarkerClick(null, marker);
    }
  }, {
    key: 'onWindowMarkerHover',
    value: function onWindowMarkerHover(element) {
      var marker = element.markerRef;
      this.setMarkerHovered(null, marker);
    }
  }, {
    key: 'onWindowMarkerHoverOut',
    value: function onWindowMarkerHoverOut(element) {
      var marker = element.markerRef;
      this.setMarkerHoverOut(null, marker);
    }
  }, {
    key: 'setMarkerHovered',
    value: function setMarkerHovered(e, marker) {
      this.triggerMarkerHover(e, marker);
    }
  }, {
    key: 'setMarkerHoverOut',
    value: function setMarkerHoverOut(e, marker) {
      this.triggerMarkerHoverOut(e, marker);
    }
  }, {
    key: 'triggerMarkerClick',
    value: function triggerMarkerClick(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _tool.isFun)(events.click)) {
        events.click(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerTouchend',
    value: function triggerMarkerTouchend(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _tool.isFun)(events.touchend)) {
        events.touchend(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerTouchmove',
    value: function triggerMarkerTouchmove(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _tool.isFun)(events.touchmove)) {
        events.touchmove(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerTouchstart',
    value: function triggerMarkerTouchstart(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _tool.isFun)(events.touchstart)) {
        events.touchstart(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerHover',
    value: function triggerMarkerHover(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _tool.isFun)(events.mouseover)) {
        events.mouseover(e, marker);
      }
    }
  }, {
    key: 'triggerMarkerHoverOut',
    value: function triggerMarkerHoverOut(e, marker) {
      // const raw = marker.getExtData();
      var events = this.props.events || {};
      if ((0, _tool.isFun)(events.mouseout)) {
        events.mouseout(e, marker);
      }
    }
  }, {
    key: 'initClusterMarkerWindow',
    value: function initClusterMarkerWindow() {
      this.markersWindow = new window.AMap.InfoWindow({
        isCustom: true,
        autoMove: true,
        closeWhenClickMap: true,
        content: '<span>loading...</span>',
        showShadow: false,
        offset: new window.AMap.Pixel(0, -20)
      });
      this.markersDOM = document.createElement('div');
      this.markersDOM.className = 'amap_markers_pop_window';
      this.markersWindow.setContent(this.markersDOM);
    }
  }, {
    key: 'bindClusterEvent',
    value: function bindClusterEvent(events) {
      var _this7 = this;

      this.mapCluster.on('click', function (e) {
        if (_this7.props.useCluster && _this7.props.useCluster.zoomOnClick) {
          //
        } else {
          var returnValue = true;
          if ((0, _tool.isFun)(events.click)) {
            returnValue = events.click(e);
          }
          if (returnValue !== false) {
            _this7.showMarkersInfoWindow(e);
          }
        }
      });
    }
  }, {
    key: 'showMarkersInfoWindow',
    value: function showMarkersInfoWindow(e) {
      var _this8 = this;

      var pos = e.lnglat;
      var markers = e.markers;
      this.markersDOM.innerHTML = '';
      if (markers && markers.length) {
        var length = markers.length;
        if (length > MAX_INFO_MARKERS) {
          markers = markers.slice(0, MAX_INFO_MARKERS);
        }
        markers.forEach(function (m) {
          var contentDOM = m.getContent();
          var itemDOM = document.createElement('div');
          itemDOM.className = 'window_marker_item';
          itemDOM.appendChild(contentDOM);
          itemDOM.markerRef = m;
          itemDOM.addEventListener('click', _this8.onWindowMarkerClick.bind(_this8, itemDOM), true);
          itemDOM.addEventListener('mouseover', _this8.onWindowMarkerHover.bind(_this8, itemDOM), true);
          itemDOM.addEventListener('mouseout', _this8.onWindowMarkerHoverOut.bind(_this8, itemDOM), true);

          _this8.markersDOM.appendChild(itemDOM);
        });
        if (length > MAX_INFO_MARKERS) {
          var warning = document.createElement('div');
          warning.className = 'amap_markers_window_overflow_warning';
          warning.innerText = '更多坐标请放大地图查看';
          this.markersDOM.appendChild(warning);
        }
      }
      this.markersWindow.open(this.map, pos);
    }
  }, {
    key: 'exposeMarkerInstance',
    value: function exposeMarkerInstance() {
      if ('events' in this.props) {
        var events = this.props.events || {};
        if ((0, _tool.isFun)(events.created)) {
          events.created(this.markersCache);
        }
      }
    }
  }, {
    key: 'bindMarkerEvents',
    value: function bindMarkerEvents(marker) {
      var events = this.props.events || {};
      var list = Object.keys(events);
      var preserveEv = ['click', 'mouseover', 'mouseout', 'created'];
      list.length && list.forEach(function (evName) {
        if (preserveEv.indexOf(evName) === -1) {
          marker.on(evName, events[evName]);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Markers;
}(_rax.PureComponent), _class.displayName = 'Markers', _temp);
exports.default = Markers;
module.exports = exports['default'];