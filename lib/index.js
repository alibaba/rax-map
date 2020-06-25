'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/12/9
 * Time: 下午10:45
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
// https://www.w3.org/TR/html5/webappapis.html#dom-navigator-appcodename
var isWeb = (typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko');
var isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
var isWeex = typeof callNative === 'function' || (typeof WXEnvironment === 'undefined' ? 'undefined' : _typeof(WXEnvironment)) === 'object' && WXEnvironment.platform !== 'Web';
var isReactNative = typeof __fbBatchedBridgeConfig !== 'undefined';

function acquire() {
  if (!isWeex && !isNode && !isReactNative) {
    return require('./interface');
    //return require('./unInterface');
  } else {
    return require('./unInterface');
  }
}

module.exports = acquire();