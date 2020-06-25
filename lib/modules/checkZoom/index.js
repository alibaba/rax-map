'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/5/8
 * Time: 下午5:28
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
/* global AMap */
var styles = {
  checkZoom: {
    position: 'absolute',
    top: 10,
    left: 10,
    background: '#fff',
    padding: 5,
    border: '1px solid #bababa',
    borderRadius: 5
  },
  checkZoomSpan: {
    display: 'inline-block',
    height: 20,
    lineHeight: 20,
    width: 190,
    textAlign: 'left',
    margin: '0 5px',
    cursor: 'pointer',
    color: '#000000',
    fontSize: '12',
    whiteSpace: 'nowrap'
  }
};

var CheckZoom = function CheckZoom(props) {
  var map = props.__map__;
  var mapStore = props.mapStore.state || { center: null, zoom: null };
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  var currentZoom = map.getZoom();

  // AMap.event.addListener(map, 'zoomend', () => {
  //   console.log('原生amap 缩放级别>>>', map.getZoom())
  //   //currentZoom = map.getZoom();
  // });

  /* markers dom 对象个数 */
  var getChildrenNum = function getChildrenNum() {
    var $amap_markers = document.querySelectorAll('.amap-marker');
    return $amap_markers ? $amap_markers.length + 1 : 0;
  };

  return (0, _rax.createElement)(
    _raxView2.default,
    { style: styles.checkZoom, onClick: function onClick() {
        AMap.event.trigger(map, 'customEvents', { type: 'CheckZoom' }); // 自定义的方法
      } },
    (0, _rax.createElement)(
      'span',
      { style: styles.checkZoomSpan },
      '\u5F53\u524D\u7EA7\u522B ',
      mapStore.zoom
    ),
    (0, _rax.createElement)(
      'span',
      { style: styles.checkZoomSpan },
      '\u5F53\u524D\u4E2D\u5FC3\u70B9 ',
      mapStore.center
    ),
    (0, _rax.createElement)(
      'span',
      { style: styles.checkZoomSpan },
      'marker\u6570\u91CF ',
      props.mapStore.markers.length
    ),
    (0, _rax.createElement)(
      'span',
      { style: styles.checkZoomSpan },
      'marker\u6807\u7B7E ',
      getChildrenNum()
    )
  );
};

exports.default = CheckZoom;
module.exports = exports['default'];