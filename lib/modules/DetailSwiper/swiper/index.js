'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp; /**
                    * Created with WebStorm.
                    * User: 一晟
                    * Date: 2018/9/29
                    * Time: 下午11:12
                    * email: zhu.yan@alibaba-inc.com
                    * To change this template use File | Settings | File Templates.
                    */
// import React,{Component} from 'react'


var _rax = require('rax');

var _raxView = require('rax-view');

var _raxView2 = _interopRequireDefault(_raxView);

var _style = require('./style');

var styles = _interopRequireWildcard(_style);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swiper = (_temp = _class = function (_PureComponent) {
  _inherits(Swiper, _PureComponent);

  function Swiper(props) {
    _classCallCheck(this, Swiper);

    // if(this.props.children instanceof Array){
    //   this.state = {
    //     styles:{
    //       translateX:loop&&-(this.props.index+this.props.children.length)*this.clientWidth*(width+(1-width)/4)+this.clientWidth*(1-width)/4||-this.props.index*this.clientWidth*(width+(1-width)/4)+this.clientWidth*(1-width)/4,
    //       duration:this.props.duration,
    //
    //     },
    //     index:loop&&this.props.index+this.props.children.length||this.props.index
    //   }
    // }else{
    //   this.state = {index:0};
    // }
    var _this = _possibleConstructorReturn(this, (Swiper.__proto__ || Object.getPrototypeOf(Swiper)).call(this, props));

    _this.startX = 0;
    _this.timerOut = 0;
    _this.distances = 0;
    _this.timer = 0;
    _this.scale = 0;
    _this.slides = 0;
    _this.clientWidth = _this.props.previewWidth || document.body.clientWidth;

    _this.handleTouchStart = function (e) {
      var _this$props = _this.props,
          children = _this$props.children,
          autoPlay = _this$props.autoPlay,
          loop = _this$props.loop,
          width = _this$props.width;
      var index = _this.state.index;

      if (autoPlay) {
        clearInterval(_this.timer);
      }
      if (loop && children instanceof Array) {
        if (index == _this.slides - 1) {
          clearInterval(_this.timerOut);
          _this.setState({
            styles: {
              translateX: -(index + _this.slides) * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4,
              duration: 0
            },
            index: index + _this.slides
          });
          _this.distances = -(index + _this.slides) * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4;
        } else if (index == _this.slides + _this.slides) {
          clearInterval(_this.timerOut);
          _this.setState({
            styles: {
              translateX: -(index - _this.slides) * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4,
              duration: 0
            },
            index: index - _this.slides
          });
          _this.distances = -(index - _this.slides) * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4;
        } else {
          _this.setState({
            styles: {
              duration: 0
            }
          });
          _this.distances = _this.state.styles.translateX;
        }
      } else {
        _this.setState({
          styles: {
            duration: 0
          }
        });
        _this.distances = _this.state.styles.translateX;
      }
      _this.startX = e.touches[0].pageX;

      e.preventDefault();
    };

    _this.handleTouchMove = function (e) {
      var distance = e.touches[0].pageX - _this.startX;
      var _this$props2 = _this.props,
          children = _this$props2.children,
          autoPlay = _this$props2.autoPlay,
          loop = _this$props2.loop,
          width = _this$props2.width;

      _this.scale = Math.abs(0.2 * distance / _this.clientWidth * (width + (1 - width) / 4));
      if (!loop) {
        if (_this.distances + distance > 0) {
          if (distance > 0) {
            distance = Math.sqrt(distance);
          } else {
            distance = -Math.sqrt(-distance);
          }
        } else if (_this.distances + distance < -_this.clientWidth * (width + (1 - width) / 4) * (_this.slides - 1 - (1 - width) / 4)) {
          if (distance > 0) {
            distance = Math.sqrt(distance);
          } else {
            distance = -Math.sqrt(-distance);
          }
        }
      }
      _this.setState({
        styles: {
          translateX: _this.distances + distance
        }
      });
    };

    _this.handleTouchEnd = function (e) {
      _this.scale = 0;
      var _this$props3 = _this.props,
          children = _this$props3.children,
          autoPlay = _this$props3.autoPlay,
          loop = _this$props3.loop,
          width = _this$props3.width;
      var index = _this.state.index;

      if (autoPlay && children instanceof Array) {
        _this.timer = setInterval(function () {
          _this.next();
        }, _this.props.interval);
      }
      var distance = e.changedTouches[0].pageX - _this.startX;
      _this.distances = _this.distances + distance;
      if (distance > _this.props.distance) {
        if (index <= 0 && !loop) {
          _this.back();
        } else {
          _this.pre();
        }
      } else if (distance < -_this.props.distance) {
        if (index >= _this.slides - 1 && !loop) {
          _this.back();
        } else {
          _this.next();
        }
      } else {
        _this.back();
      }
    };

    _this.setMyState = function (index, notTween) {
      var _index = index;
      var duration = notTween ? 0 : .5;
      var _this$props4 = _this.props,
          children = _this$props4.children,
          autoPlay = _this$props4.autoPlay,
          loop = _this$props4.loop,
          width = _this$props4.width;

      if (children instanceof Array) {
        if (loop) {
          if (_index < 0) {
            _index = children.length - 1;
            // duration = 0;
          } else if (_index >= children.length) {
            _index = 0;
            // duration = 0;
          }
        } else {
          _index = Math.max(Math.min(0, index), children.length);
        }
      }
      _this.setState({
        styles: {
          translateX: -_index * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4,
          duration: duration
        },
        index: _index
      });
    };

    _this.pre = function () {
      var _this$props5 = _this.props,
          children = _this$props5.children,
          animationEndHanler = _this$props5.animationEndHanler,
          loop = _this$props5.loop,
          autoPlay = _this$props5.autoPlay,
          width = _this$props5.width;
      var index = _this.state.index;

      animationEndHanler && animationEndHanler(index);
      if (loop && children instanceof Array) {
        if (index == _this.slides && autoPlay) {
          _this.setMyState(index - 1);
          _this.timerOut = setTimeout(function () {
            // animationEndHanler && animationEndHanler(index - 1);
            _this.setState(function (_ref) {
              var index = _ref.index;
              return {
                styles: {
                  duration: 0,
                  translateX: -(index + _this.slides) * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4
                },
                index: index + _this.slides
              };
            });
          }, _this.props.duration * 1000);
        } else {
          _this.setMyState(index - 1);
        }
      } else {
        if (index <= 0) {
          _this.setMyState(_this.slides - 1);
        } else {
          _this.setMyState(index - 1);
        }
      }
    };

    _this.next = function () {
      var $this = _this;
      var _this$props6 = _this.props,
          children = _this$props6.children,
          animationEndHanler = _this$props6.animationEndHanler,
          loop = _this$props6.loop,
          autoPlay = _this$props6.autoPlay,
          width = _this$props6.width;
      var index = _this.state.index;

      animationEndHanler && animationEndHanler(index);
      if (loop && children instanceof Array) {
        if (index == _this.slides * 2 && autoPlay) {
          _this.setMyState(index + 1);
          _this.timerOut = setTimeout(function () {
            // animationEndHanler && animationEndHanler(index + 1);
            $this.setState(function (_ref2) {
              var index = _ref2.index;
              return {
                styles: {
                  duration: 0,
                  translateX: -(index - _this.slides) * _this.clientWidth * (width + (1 - width) / 4) + _this.clientWidth * (1 - width) / 4
                },
                index: index - _this.slides
              };
            });
          }, _this.props.duration * 1000);
        } else {
          _this.setMyState(index + 1);
        }
      } else {
        if (index >= _this.slides - 1) {
          _this.setMyState(0);
        } else {
          _this.setMyState(index + 1);
        }
      }
    };

    _this.back = function () {
      var _ref3 = _this.state || 0,
          index = _ref3.index;

      _this.setMyState(index);
    };

    _this.state = { index: 0 };
    _this.props.getScope instanceof Function && _this.props.getScope(_this);
    return _this;
  }

  _createClass(Swiper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.back(0);
      var children = nextProps.children,
          autoPlay = nextProps.autoPlay;

      clearInterval(this.timer);
      if (autoPlay && children instanceof Array) {
        this.timer = setInterval(function () {
          _this2.next();
        }, this.props.interval);
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var children = this.props.children;

      if (children instanceof Array) {
        var length = children.length;
        this.slides = length;
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var _props = this.props,
          children = _props.children,
          autoPlay = _props.autoPlay;

      if (autoPlay && children instanceof Array) {
        this.timer = setInterval(function () {
          _this3.next();
        }, this.props.interval);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          children = _props2.children,
          autoPlay = _props2.autoPlay,
          loop = _props2.loop,
          width = _props2.width;
      var index = this.state.index;

      if (!children || !children instanceof Array || !this.state.styles) {
        return null;
      }
      var slide_style = {
        width: this.clientWidth * width + 'px',
        marginLeft: this.clientWidth * (1 - width) / 4 + 'px',
        transform: this.props.type == 'card' ? 'scale(1,' + (width + this.scale) + ')' : '',
        transitionDuration: this.state.styles.duration + 's'
      };
      var slide_style_active = {
        width: this.clientWidth * width + 'px',
        marginLeft: this.clientWidth * (1 - width) / 4 + 'px',
        transform: this.props.type == 'card' ? 'scale(1,' + (1 - this.scale) + ')' : '',
        transitionDuration: this.state.styles.duration + 's'
      };
      var wrapper_style = {
        transitionDuration: this.state.styles.duration + 's',
        transform: 'translate3d(' + this.state.styles.translateX + 'px, 0px, 0px)'
      };
      Object.assign(wrapper_style, styles.swiper_wrapper);
      Object.assign(slide_style, styles.swiper_slide);
      Object.assign(slide_style_active, styles.swiper_slide);
      var sliderDom = [];
      var j = 1;
      if (loop) {
        j = 3;
      }
      for (var k = 0; k < j; k++) {
        children.map(function (item, i) {
          if (item) {
            sliderDom.push((0, _rax.createElement)(
              'div',
              { key: 10 * i + k, className: 'swiper-slide',
                style: index % children.length == i && slide_style_active || slide_style },
              item
            ));
          }
        });
      }

      return (0, _rax.createElement)(
        'div',
        { className: 'swiper-container', style: styles.swiper_container, ref: 'swiper',
          onTouchStart: this.handleTouchStart, onTouchMove: this.handleTouchMove, onTouchEnd: this.handleTouchEnd },
        (0, _rax.createElement)(
          'div',
          { className: 'swiper-wrapper', style: wrapper_style },
          sliderDom
        ),
        this.props.pagination && (0, _rax.createElement)(
          'div',
          { className: 'swiper-pagination', style: styles.swiper_pagination },
          function () {
            var list = [];
            for (var i = 0; i < _this4.slides; i++) {
              list.push((0, _rax.createElement)('span', { key: i,
                className: (0, _classnames2.default)(i == index % _this4.slides && 'active', 'pagination-item'),
                style: i == index % _this4.slides && styles.pagination_item_active || styles.pagination_item }));
            }
            return list;
          }()
        ) || ''
      );
    }
  }]);

  return Swiper;
}(_rax.PureComponent), _class.propTypes = {
  index: _propTypes2.default.number, // 初始值
  duration: _propTypes2.default.number, // 动画完成周期
  distance: _propTypes2.default.number, // 触发的距离
  loop: _propTypes2.default.bool, // 是否循环播放
  width: _propTypes2.default.number, // 0~1,1表示100%
  autoPlay: _propTypes2.default.bool, // 是否自动播放
  interval: _propTypes2.default.number, // 轮播间隔秒数
  type: _propTypes2.default.string, // 轮播类型 default 默认   card 卡片轮播
  pagination: _propTypes2.default.bool // 是否显示分页
}, _class.defaultProps = {
  index: 0,
  duration: 0.5,
  distance: 100,
  loop: false,
  width: 1,
  autoPlay: false,
  interval: 1000,
  type: 'default',
  pagination: true
}, _temp);
exports.default = Swiper;
module.exports = exports['default'];