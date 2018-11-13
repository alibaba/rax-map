import {createElement, Component, render, Children, PureComponent, cloneElement, unmountComponentAtNode} from 'rax';
import View from 'rax-view';
import wrapperGenerator from '../utils/wrapperGenerator';
import log from '../utils/log';
import { toLnglat } from '../utils/common';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const configurableProps = [
  'center',
  'radius',
  'draggable',
  'extData',

  /* 非原生的接口，这是本组件的扩展 */
  'visible',
  'style'
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble'
]);

const CircleProps = {
  __map__: null,
  __ele__: null,
  center: null,
  onInstanceCreated: null,
  radius: 0,
  draggable: false,
  extData: {},
  visible: false,
  style: {},
  zIndex: 0,
  bubble: false,
  events: null,
  children: null,
};

class Circle extends PureComponent {
  static displayName = 'Circle';
  props;
  map;
  element;
  mapCircle;
  setterMap;
  converterMap;

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        const self = this;
        this.setterMap = {
          visible(val) {
            if (self.mapCircle) {
              if (val) {
                self.mapCircle.show();
              } else {
                self.mapCircle.hide();
              }
            }
          },
          style(val) {
            self.mapCircle && self.mapCircle.setOptions(val);
          }
        };
        this.converterMap = {
          center: toLnglat
        };
        this.state = {
          loaded: false
        };
        this.map = props.__map__;
        this.element = this.map.getContainer();
        this.createInstance(props).then(() => {
          this.setState({
            loaded: true
          });
          this.props.onInstanceCreated && this.props.onInstanceCreated();
        });
      }
    }
  }

  get instance() {
    return this.mapCircle;
  }

  createInstance(props) {
    const options = this.buildCreateOptions(props);
    options.map = this.map;
    this.mapCircle = new window.AMap.Circle(options);
    return Promise.resolve(this.mapCircle);
  }

  buildCreateOptions(props) {
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if (key === 'style' && (props.style !== undefined)) {
          const styleItem = Object.keys(props.style);
          styleItem.forEach((item) => {
            // $FlowFixMe
            options[item] = props.style[item];
          });
        } else {
          options[key] = this.getSetterValue(key, props);
        }
      }
    });
    return options;
  }

  getSetterValue(key, props) {
    if (key in this.converterMap) {
      return this.converterMap[key](props[key]);
    }
    return props[key];
  }

  renderEditor(children) {
    if (!children) {
      return null;
    }
    if (Children.count(children) !== 1) {
      return null;
    }
    return cloneElement(Children.only(children), {
      __circle__: this.mapCircle,
      __map__: this.map,
      __ele__: this.element
    });
  }

  render() {
    return this.state.loaded ? (this.renderEditor(this.props.children)) : null;
  }
}

export default wrapperGenerator(Circle);
