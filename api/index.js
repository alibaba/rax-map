/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/12/9
 * Time: 下午10:45
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
// https://www.w3.org/TR/html5/webappapis.html#dom-navigator-appcodename
const isWeb = typeof navigator === 'object' && (navigator.appCodeName === 'Mozilla' || navigator.product === 'Gecko');
const isNode = typeof process !== 'undefined' && !!(process.versions && process.versions.node);
const isWeex = typeof callNative === 'function' || typeof WXEnvironment === 'object' && WXEnvironment.platform !== 'Web';
const isReactNative = typeof __fbBatchedBridgeConfig !== 'undefined';

function acquire() {
  if (!isWeex && !isNode && !isReactNative) {
    return require('./interface');
    // return require('./unInterface');
  } else {
    return require('./unInterface');
  }
}

module.exports = acquire();