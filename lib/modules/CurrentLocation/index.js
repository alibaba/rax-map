'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created with WebStorm.
                                                                                                                                                                                                                                                                   * User: 一晟
                                                                                                                                                                                                                                                                   * Date: 2018/5/8
                                                                                                                                                                                                                                                                   * Time: 下午5:28
                                                                                                                                                                                                                                                                   * email: zhu.yan@alibaba-inc.com
                                                                                                                                                                                                                                                                   * To change this template use File | Settings | File Templates.
                                                                                                                                                                                                                                                                   */


var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

var _raxPicture = require('rax-picture');

var _raxPicture2 = _interopRequireDefault(_raxPicture);

var _tool = require('../../components/utils/tool');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  circleContainer: {
    position: 'absolute',
    bottom: 40 / 3,
    left: 20 / 3,
    backgroundColor: '#FFFFFF',
    height: 41 / 2,
    width: 41 / 2,
    borderRadius: 41 / 2,
    boxShadow: 'rgba(106,106,106,10) 0px 1px 2px',
    lineHeight: 41 / 3,
    color: '#000000',
    fontSize: 13 / 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 56 / 2,
    height: 56 / 2
  }
};

/* global AMap */
var CurrentLocation = function CurrentLocation(props) {
  var map = props.__map__;
  var element = props.__ele__;
  var geolocation = null;

  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }

  var triggerCreated = function triggerCreated(props) {
    var events = props.events || {};
    if ('created' in events && typeof events.created === 'function') {
      events.created(geolocation);
    }
  };

  var requestGeolocation = function requestGeolocation(props) {
    if (geolocation) {
      return new Promise(function (resolve) {
        resolve(geolocation);
      });
    } else {
      return new Promise(function (resolve) {
        map.plugin(['AMap.Geolocation'], function () {
          var newProps = _extends({}, props, { showButton: false });
          geolocation = new window.AMap.Geolocation(newProps);
          resolve(geolocation);
        });
      });
    }
  };

  var getCurrentGeo = function getCurrentGeo() {
    var onGeoComplete = props.onGeoComplete,
        onGeoError = props.onGeoError;

    geolocation.getCurrentPosition(function (status, result) {
      if (status == 'complete') {
        if (onGeoComplete && (0, _tool.isFun)(onGeoComplete)) {
          onGeoComplete(result);
        }
      } else {
        if (onGeoError && (0, _tool.isFun)(onGeoError)) {
          onGeoError(result);
        }
      }
    });
  };

  if (typeof window !== 'undefined') {
    if (!props.__map__) {
      throw new Error('Geolocation has to be a child of Map component');
    } else {
      var autoLoc = props.autoLoc;

      requestGeolocation(props).then(function () {
        triggerCreated(props);
        map.addControl(geolocation);
        autoLoc && getCurrentGeo();
      });
    }
  }

  return (0, _rax.createElement)(
    _raxView2.default,
    { style: styles.circleContainer, onClick: function onClick() {
        getCurrentGeo();
        AMap.event.trigger(map, 'customEvents', { type: 'CurrentLocation' }); // 自定义的方法
      } },
    (0, _rax.createElement)(_raxPicture2.default, { source: { uri: '//gw.alicdn.com/tfs/TB1yPNpG25TBuNjSspmXXaDRVXa-135-138.png' }, style: styles.icon,
      resizeMode: 'cover' })
  );
};

exports.default = CurrentLocation;
module.exports = exports['default'];