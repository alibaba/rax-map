'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/6/5
 * Time: 下午2:16
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */

/* global AMap */
var cityToLocation = exports.cityToLocation = function cityToLocation(prov, city) {
  return new Promise(function (resolve, reject) {
    AMap.plugin('AMap.Geocoder', function () {
      console.log('AMap.Geocoder:', prov, city);
      var geocoder = new AMap.Geocoder({
        city: prov // 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        // radius:1000范围，默认：500
      });
      geocoder.getLocation(city, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
          resolve({ status: status, result: result });
        } else {
          reject({ status: status, result: result });
        }
      });
    });
  });
};