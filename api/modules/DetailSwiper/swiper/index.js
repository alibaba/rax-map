/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/9/29
 * Time: 下午11:12
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
// import React,{Component} from 'react'
import {createElement, PureComponent, render} from 'rax';
import View from 'rax-view';

import * as styles from './style';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Swiper extends PureComponent {
  static propTypes = {
    index: PropTypes.number, // 初始值
    duration: PropTypes.number, // 动画完成周期
    distance: PropTypes.number, // 触发的距离
    loop: PropTypes.bool, // 是否循环播放
    width: PropTypes.number, // 0~1,1表示100%
    autoPlay: PropTypes.bool, // 是否自动播放
    interval: PropTypes.number, // 轮播间隔秒数
    type: PropTypes.string, // 轮播类型 default 默认   card 卡片轮播
    pagination: PropTypes.bool// 是否显示分页
  };
  static defaultProps = {
    index: 0,
    duration: 0.5,
    distance: 100,
    loop: false,
    width: 1,
    autoPlay: false,
    interval: 1000,
    type: 'default',
    pagination: true,
  };

  startX = 0;
  timerOut = 0;
  distances = 0;
  timer = 0;
  scale = 0;
  slides = 0;
  clientWidth = this.props.previewWidth || document.body.clientWidth;


  constructor(props) {
    super(props);
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
    this.state = {index: 0};
    (this.props.getScope instanceof Function) && (this.props.getScope(this));
  }

  handleTouchStart = (e) => {
    const {children, autoPlay, loop, width} = this.props;
    const {index} = this.state;
    if (autoPlay) {
      clearInterval(this.timer);
    }
    if (loop && children instanceof Array) {
      if (index == this.slides - 1) {
        clearInterval(this.timerOut);
        this.setState({
          styles: {
            translateX: -(index + this.slides) * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4,
            duration: 0
          },
          index: index + this.slides
        });
        this.distances = -(index + this.slides) * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4;
      } else if (index == this.slides + this.slides) {
        clearInterval(this.timerOut);
        this.setState({
          styles: {
            translateX: -(index - this.slides) * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4,
            duration: 0
          },
          index: index - this.slides
        });
        this.distances = -(index - this.slides) * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4;
      } else {
        this.setState({
          styles: {
            duration: 0
          }
        });
        this.distances = this.state.styles.translateX;
      }
    } else {
      this.setState({
        styles: {
          duration: 0
        }
      });
      this.distances = this.state.styles.translateX;
    }
    this.startX = e.touches[0].pageX;


    e.preventDefault();

  };
  handleTouchMove = (e) => {
    let distance = e.touches[0].pageX - this.startX;
    const {children, autoPlay, loop, width} = this.props;
    this.scale = Math.abs(0.2 * distance / this.clientWidth * (width + (1 - width) / 4));
    if (!loop) {
      if (this.distances + distance > 0) {
        if (distance > 0) {
          distance = Math.sqrt(distance);
        } else {
          distance = -Math.sqrt(-distance);
        }
      } else if (this.distances + distance < -this.clientWidth * (width + (1 - width) / 4) * (this.slides - 1 - (1 - width) / 4)) {
        if (distance > 0) {
          distance = Math.sqrt(distance);
        } else {
          distance = -Math.sqrt(-distance);
        }
      }
    }
    this.setState({
      styles: {
        translateX: this.distances + distance
      }
    });
  };
  handleTouchEnd = (e) => {
    this.scale = 0;
    const {children, autoPlay, loop, width} = this.props;
    const {index} = this.state;
    if (autoPlay && children instanceof Array) {
      this.timer = setInterval(() => {
        this.next();
      }, this.props.interval);
    }
    let distance = e.changedTouches[0].pageX - this.startX;
    this.distances = this.distances + distance;
    if (distance > this.props.distance) {
      if (index <= 0 && !loop) {
        this.back();
      } else {
        this.pre();
      }

    } else if (distance < -this.props.distance) {
      if (index >= this.slides - 1 && !loop) {
        this.back();
      } else {
        this.next();
      }
    } else {
      this.back();
    }
  };

  setMyState = (index, notTween) => {
    let _index = index;
    let duration = notTween ? 0 : .5;
    const {children, autoPlay, loop, width} = this.props;
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
    this.setState({
      styles: {
        translateX: -_index * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4,
        duration: duration
      },
      index: _index
    });
  };

  pre = () => {
    const {children, animationEndHanler, loop, autoPlay, width} = this.props;
    const {index} = this.state;
    animationEndHanler && animationEndHanler(index);
    if (loop && children instanceof Array) {
      if (index == this.slides && autoPlay) {
        this.setMyState(index - 1);
        this.timerOut = setTimeout(() => {
          // animationEndHanler && animationEndHanler(index - 1);
          this.setState(({index}) => ({
            styles: {
              duration: 0,
              translateX: -(index + this.slides) * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4,
            },
            index: index + this.slides,
          }));
        }, this.props.duration * 1000);
      } else {
        this.setMyState(index - 1);
      }
    } else {
      if (index <= 0) {
        this.setMyState(this.slides - 1);
      } else {
        this.setMyState(index - 1);
      }
    }
  };
  next = () => {
    let $this = this;
    const {children, animationEndHanler, loop, autoPlay, width} = this.props;
    const {index} = this.state;
    animationEndHanler && animationEndHanler(index);
    if (loop && children instanceof Array) {
      if (index == this.slides * 2 && autoPlay) {
        this.setMyState(index + 1);
        this.timerOut = setTimeout(() => {
          // animationEndHanler && animationEndHanler(index + 1);
          $this.setState(({index}) => ({
            styles: {
              duration: 0,
              translateX: -(index - this.slides) * this.clientWidth * (width + (1 - width) / 4) + this.clientWidth * (1 - width) / 4,
            },
            index: index - this.slides
          }));
        }, this.props.duration * 1000);
      } else {
        this.setMyState(index + 1);
      }

    } else {
      if (index >= this.slides - 1) {
        this.setMyState(0);
      } else {
        this.setMyState(index + 1);
      }
    }
  };
  back = () => {
    const {index} = this.state || 0;
    this.setMyState(index);

  };

  componentWillReceiveProps(nextProps) {
    this.back(0);
    const {children, autoPlay} = nextProps;
    clearInterval(this.timer);
    if (autoPlay && children instanceof Array) {
      this.timer = setInterval(() => {
        this.next();
      }, this.props.interval);
    }
  }

  componentWillMount() {
    const {children} = this.props;
    if (children instanceof Array) {
      let length = children.length;
      this.slides = length;
    }
  }

  componentDidMount() {
    const {children, autoPlay} = this.props;
    if (autoPlay && children instanceof Array) {
      this.timer = setInterval(() => {
        this.next();
      }, this.props.interval);
    }
  }

  render() {
    const {children, autoPlay, loop, width} = this.props;
    const {index} = this.state;
    if (!children || (!children instanceof Array) || !(this.state.styles)) {
      return (null);
    }
    const slide_style = {
      width: this.clientWidth * width + 'px',
      marginLeft: this.clientWidth * (1 - width) / 4 + 'px',
      transform: this.props.type == 'card' ? 'scale(1,' + (width + this.scale) + ')' : '',
      transitionDuration: this.state.styles.duration + 's'
    };
    const slide_style_active = {
      width: this.clientWidth * width + 'px',
      marginLeft: this.clientWidth * (1 - width) / 4 + 'px',
      transform: this.props.type == 'card' ? 'scale(1,' + (1 - this.scale) + ')' : '',
      transitionDuration: this.state.styles.duration + 's'
    };
    const wrapper_style = {
      transitionDuration: this.state.styles.duration + 's',
      transform: 'translate3d(' + this.state.styles.translateX + 'px, 0px, 0px)'
    };
    Object.assign(wrapper_style, styles.swiper_wrapper);
    Object.assign(slide_style, styles.swiper_slide);
    Object.assign(slide_style_active, styles.swiper_slide);
    let sliderDom = [];
    let j = 1;
    if (loop) {
      j = 3;
    }
    for (var k = 0; k < j; k++) {
      children.map((item, i) => {
        if (item) {
          sliderDom.push(<div key={10 * i + k} className="swiper-slide"
            style={index % children.length == i && slide_style_active || slide_style}>
            {item}
          </div>);
        }
      });
    }

    return (
      <div className="swiper-container" style={styles.swiper_container} ref="swiper"
        onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
        <div className="swiper-wrapper" style={wrapper_style}>
          {sliderDom}
        </div>
        {this.props.pagination &&
          <div className="swiper-pagination" style={styles.swiper_pagination}>
            {(() => {
              let list = [];
              for (let i = 0; i < this.slides; i++) {
                list.push(<span key={i}
                  className={cn(i == index % this.slides && 'active', 'pagination-item')}
                  style={i == index % this.slides && styles.pagination_item_active || styles.pagination_item} />);
              }
              return list;
            })()}
          </div> || ''
        }

      </div>
    );

  }
}

export default Swiper;
