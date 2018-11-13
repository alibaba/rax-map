import {createElement, Component, render, Children, PureComponent, cloneElement, unmountComponentAtNode} from 'rax';
import View from 'rax-view';
import wrapperGenerator from '../utils/wrapperGenerator';
import log from '../utils/log';
import { toLnglat } from '../utils/common';
/*
 * props
 * {
 *  __map__ 父级组件传过来的地图实例
 *
 * }
 */

const configurableProps = [
  'path',
  'draggable',
  'extData',

  /* 本插件扩展的属性 */
  'style',
  'visible'
];

const allProps = configurableProps.concat([
  'zIndex',
  'bubble'
]);

const PolyProps = {
  path: null,
  draggable: false,
  extData: {},
  style: {},
  visible: false,
  zIndex: 0,
  bubble: false,
  events: {},
  children: null,
  onInstanceCreated: null,
  __map__: null,
  __ele__: null,
};

class Polygon extends PureComponent {
  static displayName = 'Polygon';
  map;
  element;
  polygon;
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
              self.polygon && self.polygon.show();
            } else {
              self.polygon && self.polygon.hide();
            }
          },
          style(val) {
            self.polygon.setOptions(val);
          }
        };
        this.converterMap = {
          path(val) {
            return self.buildPathValue(val);
          }
        };
        this.state = {
          loaded: false
        };
        this.map = props.__map__;
        this.element = this.map.getContainer();
        setTimeout(() => {
          this.initMapPolygon(props);
        }, 13);
      }
    }
  }

  get instance() {
    return this.polygon;
  }

  initMapPolygon(props) {
    const options = this.buildCreateOptions(props);
    options.map = this.map;
    this.polygon = new window.AMap.Polygon(options);
    this.setState({
      loaded: true
    });
    this.props.onInstanceCreated && this.props.onInstanceCreated();
  }

  buildCreateOptions(props) {
    const options = {};
    allProps.forEach((key) => {
      if (key in props) {
        if ((key === 'style') && props.style) {
          const styleItem = Object.keys(props.style);
          styleItem.forEach((item) => {
            // $FlowFixMe
            options[item] = props.style[item];
          });
          // visible 做特殊处理
        } else if (key !== 'visible') {
          options[key] = this.getSetterValue(key, props[key]);
        }
      }
    });
    return options;
  }

  detectPropChanged(key, nextProps) {
    return this.props[key] !== nextProps[key];
  }

  getSetterValue(key, value) {
    if (key in this.converterMap) {
      return this.converterMap[key](value);
    }
    return value;
  }

  buildPathValue(path) {
    if (path.length) {
      const firstNode = path[0];
      if (typeof firstNode[0] === 'number') {
        return path.map((p) => (toLnglat(p)));
      }
      if ('getLng' in firstNode) {
        return path;
      }
      if ('longitude' in firstNode || 'lng' in firstNode) {
        return path.map((p) => (toLnglat(p)));
      }
      if ('length' in firstNode && firstNode.length) {
        // $FlowFixMe
        return path.map(ring => this.buildPathValue(ring));
      }
    }
    return [];
  }

  renderEditor(children) {
    if (!children) {
      return null;
    }
    if (Children.count(children) !== 1) {
      return null;
    }
    // const child = React.Children.only(children)
    // if (child.type === PolyEditor) {
    //   return React.cloneElement(child, {
    //     __poly__: this.polygon,
    //     __map__: this.map
    //   })
    // }
    return null;
  }

  render() {
    return this.state.loaded ? (this.renderEditor(this.props.children)) : null;
  }
}

export default wrapperGenerator(Polygon);
