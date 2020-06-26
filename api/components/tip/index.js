import {createElement, Component, render, PureComponent, unmountComponentAtNode} from 'rax';
import cloneElement from 'rax-clone-element';
import Children from 'rax-children';
import View from 'rax-view';
import wrapperGenerator from '../utils/wrapperGenerator';
import log from '../utils/log';
import {
  toLnglat,
  toPixel,
  toSize
} from '../utils/common';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 * }
 */

const configurableProps = [
  'content',
  'position',
  'size',
  /* 非原生 */
  'visible',

  /* 这个 setOffset  方法高德并没有明确在文档中列出来，不确定会不会撤销 */
  'offset'
];

const allProps = configurableProps.concat([
  'isCustom',
  'autoMove',
  'closeWhenClickMap',
  'showShadow'
]);

const IWProps = {
  content: {},
  onInstanceCreated: null,
  position: null,
  size: null,
  visible: false,
  offset: null,
  isCustom: false,
  autoMove: false,
  closeWhenClickMap: false,
  showShadow: false,
  events: null,
  children: null,
  className: '',
  __map__: null,
  __ele__: null,
};

class Tip extends PureComponent {

  map;
  isCustom;
  tip;
  infoDOM;
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
            if (val) {
              self.show();
              self.setClassName(self.props);
              self.setChild(self.props);
            } else {
              self.close();
            }
          }
        };
        this.converterMap = {
          size: toSize,
          offset: toPixel,
          position: toLnglat
        };
        this.map = props.__map__;
        this.isCustom = true;
        setTimeout(() => {
          this.createTip(props);
        }, 13);
      }
    }
  }

  get instance() {
    return this.tip;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.map) {
      this.refreshTipLayout(nextProps);
    }
  }

  createTip(props) {
    const options = this.buildCreateOptions(props);
    this.tip = new window.AMap.InfoWindow(options);
    this.props.onInstanceCreated && this.props.onInstanceCreated();
  }

  refreshTipLayout(nextProps) {
    this.setChild(nextProps);
    this.setClassName(nextProps);
  }

  checkPropChanged(key, nextProps) {
    return this.props[key] !== nextProps[key];
  }

  show() {
    this.tip.open(this.map, this.tip.getPosition());
  }

  close() {
    this.tip.close();
  }

  buildCreateOptions(props) {
    const options = {};

    // 如果开发者没有设置 isCustom 属性，默认设置为 false
    if ('isCustom' in props) {
      options.isCustom = !!props.isCustom;
    } else {
      options.isCustom = false;
    }

    if ('content' in props) {
      options.content = props.content;
    } else {
      this.infoDOM = document.createElement('div');
      options.content = this.infoDOM;
    }

    allProps.forEach((key) => {
      if (key in props) {
        if (['visible', 'isCustom', 'content'].indexOf(key) === -1) {
          options[key] = this.getSetterValue(key, props[key]);
        }
      }
    });
    return options;
  }

  getSetterValue(key, value) {
    if (key in this.converterMap) {
      return this.converterMap[key](value);
    }
    return value;
  }

  setChild(props) {
    const child = props.children;
    if (this.infoDOM && child) {
      render(<div>{child}</div>, this.infoDOM);
    } else {
      if (props.children) {
        console.warn('因为你设置 isCustom 为 true，Tip 的 Children 被忽略');
      }
    }
  }

  setClassName(props) {
    if (this.infoDOM) {
      let baseClsValue = '';
      // 刷新 className
      if ('className' in props && props.className) {
        baseClsValue += props.className;
      } else if (props.isCustom === true) {
        baseClsValue += 'amap_markers_pop_window';
      }
      this.infoDOM.className = baseClsValue;
    }
  }

  render() {
    return (null);
  }
}

export default wrapperGenerator(Tip);
