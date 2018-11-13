import {createElement, Component, render, Children, PureComponent, cloneElement, unmountComponentAtNode} from 'rax';
import View from 'rax-view';

import log from '../utils/log';
import wrapperGenerator from '../utils/wrapperGenerator';
import {
  MarkerAllProps,
  renderMarkerComponent
} from '../utils/markerUtils';
import {
  toLnglat,
  toPixel
} from '../utils/common';

class Marker extends PureComponent {
  static displayName = 'Marker';
  map;
  element;
  marker;
  contentWrapper;
  setterMap;
  converterMap;

  constructor(props) {
    super(props);
    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        log.warning('MAP_INSTANCE_REQUIRED');
      } else {
        this.setterMap = {
          visible: (val) => {
            if (val) {
              this.marker && this.marker.show();
            } else {
              this.marker && this.marker.hide();
            }
          },
          zIndex: (val) => {
            this.marker && this.marker.setzIndex(val);
          }
        };
        this.converterMap = {
          position: toLnglat,
          offset: toPixel
        };
        this.map = props.__map__;
        this.element = this.map.getContainer();
        setTimeout(() => {
          this.createMarker(props);
        }, 13);
      }
    }
  }

  get instance() {
    return this.marker;
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.map) {
      this.refreshMarkerLayout(nextProps);
    }
  }

  createMarker(props) {
    const options = this.buildMarkerOptions(props);
    this.marker = new window.AMap.Marker(options);

    this.marker.render = (function(marker) {
      return function(component) {
        renderMarkerComponent(component, marker);
      };
    })(this.marker);
    this.props.onInstanceCreated && this.props.onInstanceCreated();
    this.setMarkerLayout(props);
    this.setChildComponent(props);
  }

  // 在创建实例时根据传入配置，设置初始化选项
  buildMarkerOptions(props) {
    let opts = {};
    MarkerAllProps.forEach((key) => {
      if (key in props) {
        opts[key] = this.getSetterParam(key, props[key]);
      }
    });
    opts.map = this.map;
    return opts;
  }

  // 初始化标记的外观
  setMarkerLayout(props) {
    if (('render' in props) || ('children' in props && props.children)) {
      this.createContentWrapper();
      if ('className' in props && props.className) {
        // https://github.com/ElemeFE/react-amap/issues/40
        this.contentWrapper.className = props.className;
      }
    }
  }

  createContentWrapper() {
    this.contentWrapper = document.createElement('div');
    this.marker.setContent(this.contentWrapper);
  }

  setChildComponent(props) {
    if (this.contentWrapper) {
      if ('className' in props && props.className) {
        // https://github.com/ElemeFE/react-amap/issues/40
        this.contentWrapper.className = props.className;
      }
      if ('render' in props) {
        renderMarkerComponent(props.render, this.marker);
      } else if ('children' in props) {
        const child = props.children;
        const childType = typeof child;
        if (childType !== 'undefined' && this.contentWrapper) {
          render(<View>{child}</View>, this.contentWrapper);
        }
      }
    }
  }

  refreshMarkerLayout(nextProps) {
    this.setChildComponent(nextProps);
  }

  getSetterParam(key, val) {
    if (key in this.converterMap) {
      return this.converterMap[key](val);
    }
    return val;
  }

  render() {
    return null;
  }
}

export default wrapperGenerator(Marker);
