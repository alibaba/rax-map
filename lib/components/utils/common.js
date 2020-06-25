'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasWindow = typeof window !== 'undefined';

/*
 * [lng, lat]
 * {lng, lat}
 * {longitude, latitude}
 */
var toLnglat = exports.toLnglat = function toLnglat(pos) {
  if (!pos) {
    return pos;
  }
  // 高德原生 AMap.LngLat 类
  if ('getLng' in pos && 'getLat' in pos) {
    return pos;
  }
  var lng = 0;
  var lat = 0;
  if ({}.toString.call(pos) === '[object Array]') {
    lng = pos[0];
    lat = pos[1];
  } else if ('lng' in pos && 'lat' in pos) {
    lng = pos.lng;
    lat = pos.lat;
  } else if ('longitude' in pos && 'latitude' in pos) {
    lng = pos.longitude;
    lat = pos.latitude;
  }
  return hasWindow ? new window.AMap.LngLat(lng, lat) : null;
};

var toPixel = exports.toPixel = function toPixel(ofst) {
  if (!ofst) {
    return ofst;
  }
  if ('getX' in ofst && 'getY' in ofst) {
    return ofst;
  }
  var x = 0;
  var y = 0;
  if ({}.toString.call(ofst) === '[object Array]') {
    x = ofst[0];
    y = ofst[1];
  }
  return hasWindow ? new window.AMap.Pixel(x, y) : null;
};

var toSize = exports.toSize = function toSize(size) {
  if (!size) {
    return size;
  }
  if ('getWidth' in size) {
    return size;
  }
  return hasWindow ? new window.AMap.Size(size.width, size.height) : null;
};

exports.default = {
  toLnglat: toLnglat,
  toPixel: toPixel,
  toSize: toSize
};