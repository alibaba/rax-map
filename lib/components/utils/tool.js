'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toCapitalString = exports.isFun = undefined;

var _common = require('./common');

/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/11/13
 * Time: 下午7:02
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
var isFun = exports.isFun = function isFun(arg) {
  return !!arg && typeof arg === 'function';
};

var toCapitalString = exports.toCapitalString = function toCapitalString(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
};

exports.default = {
  isFun: isFun,
  toCapitalString: toCapitalString
};