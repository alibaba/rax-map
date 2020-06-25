'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var errorMap = {
  'MARKER_ID_CONFLICT': 'Marker 的 id 属性重复',
  'MARKER_ID_REQUIRED': '每一个 Marker 必需有一个 id 属性',
  'MAP_INSTANCE_REQUIRED': '没有地图实例；组件必须作为 Map 的子组件使用',
  'CIRCLE_INSTANCE_REQUIRED': '',
  'CIRCLE_CENTER_REQUIRED': 'Circle 组件必需设置 center 属性',
  'CIRCLE_RADIUS_REQUIRED': 'Circle 组件必需设置 radius 属性',
  'SRC_REQUIRED': 'GroundImage 组件必需设置 src 属性',
  'INVALID_AMAP_PLUGIN': 'plugins 属性不正确；目前支持的插件有\'Scale\', \'ToolBar\', \'MapType\', \'OverView\', \'Geolocation\''
};

var getMessage = function getMessage(key) {
  return key in errorMap ? errorMap[key] : key;
};

var log = {
  error: function error(key) {
    throw new Error(getMessage(key));
  },

  warning: function warning(key) {
    console.warn(getMessage(key));
  },
  optimize: function optimize(key) {
    console.log('%c' + getMessage(key), 'color:#d4d483;border-left: 2px solid #d4d483;paddingLeft: 4px;');
  }
};

exports.default = log;
module.exports = exports['default'];