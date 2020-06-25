'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created with WebStorm.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * User: 一晟
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 2018/12/9
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 下午11:01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * email: zhu.yan@alibaba-inc.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * To change this template use File | Settings | File Templates.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var style = {
  container: {
    minHeight: 750,
    justifyContent: 'center'
    //alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: 'red',
    backgroundColor: 'yellow'
  }
};

var Hi = function (_Component) {
  _inherits(Hi, _Component);

  function Hi() {
    _classCallCheck(this, Hi);

    return _possibleConstructorReturn(this, (Hi.__proto__ || Object.getPrototypeOf(Hi)).apply(this, arguments));
  }

  _createClass(Hi, [{
    key: 'render',
    value: function render() {
      return (0, _rax.createElement)(
        _raxView2.default,
        { style: style.container },
        (0, _rax.createElement)(
          _raxView2.default,
          { style: style.text },
          '\uD83D\uDEA7 \u76EE\u524D \'RAX-MAP\' \u4E0D\u652F\u6301 \'Weex native \u6E32\u67D3\u65B9\u5F0F\';'
        ),
        (0, _rax.createElement)(
          _raxView2.default,
          { style: style.text },
          '\uD83D\uDD0C \u53EA\u652F\u6301 \'h5-webView\u65B9\u5F0F\'\uFF0C\u8BF7\u8C03\u6574 URL \u53C2\u6570\u4E3A \'wh_weex=false\' \u7684\u964D\u7EA7\u6A21\u5F0F\u3002'
        )
      );
    }
  }]);

  return Hi;
}(_rax.Component);

exports.default = {
  Map: Hi,
  Marker: Hi,
  Markers: Hi,
  Circle: Hi,
  // CircleEditor,
  Polyline: Hi,
  Polygon: Hi,
  Tip: Hi,
  // PolyEditor,
  // InfoWindow,
  // GroundImage,
  // MouseTool
  checkZoom: Hi,
  CurrentLocation: Hi,
  mapServices: Hi,
  DetailSwiper: Hi
};
module.exports = exports['default'];