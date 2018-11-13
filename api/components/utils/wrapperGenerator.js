import {createElement, Component, PureComponent} from 'rax';
import {toCapitalString} from './tool';
/**
 * 通过高阶组件创建实例
 * @param MapComponent
 * @returns {{new(*=): {detectPropChange(*, *, *): *, onInstanceCreated(): void, reactivePropChange(*=, *=): boolean, componentWillUnmount(): undefined, render(): *, componentWillReceiveProps(*=): void, createEventsProxy(*): void}, prototype: {detectPropChange(*, *, *): *, onInstanceCreated(): void, reactivePropChange(*=, *=): boolean, componentWillUnmount(): undefined, render(): *, componentWillReceiveProps(*=): void, createEventsProxy(*): void}}}
 */
function wrapperGenerator(MapComponent) {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.instanceCreated = false;
      this.myMapComponent = null;
      this.registeredEvents = [];
      this.onInstanceCreated = this.onInstanceCreated.bind(this);
    }

    /**
     * 事件的单例方法
     */
    onInstanceCreated() {
      this.instanceCreated = true;
      if ('events' in this.props) {
        const { instance } = this.myMapComponent;
        if (this.props.events.created) {
          this.props.events.created(instance);
        }
      }
      this.reactivePropChange(this.props, false);
    }

    /**
     * 事件注册与绑定
     */
    createEventsProxy(props) {
      const self = this;
      const { instance } = this.myMapComponent;
      const evs = Object.keys(props.events || {});
      evs.length && evs.forEach(ev => {
        if (self.registeredEvents.indexOf(ev) === -1) {
          self.registeredEvents.push(ev);
          instance.on(ev, (function(ev) {
            return function(...args) {
              if (self.props.events && ev in self.props.events) {
                self.props.events[ev].apply(null, args);
              }
            };
          })(ev));
        }
      });
    }

    /**
     * 组件属性发生变化地图更新
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
      this.reactivePropChange(nextProps, true);
    }

    /**
     * 地图的更新
     * setterMap = map组件方法集合, converterMap = 原生map转换, instance = 原生map
     * @param nextProps
     * @param shouldDetectChange 是否强制检查组件属性发生变化
     * @returns {boolean}
     */
    reactivePropChange(nextProps, shouldDetectChange = true) {
      if (!this.instanceCreated) {
        return false;
      }
      const { setterMap = {}, converterMap = {}, instance = {} } = this.myMapComponent;
      // console.log('this.myMapComponent:',this.myMapComponent)
      const list = Object.keys(nextProps);
      list.length && list.forEach(key => {
        if (key === 'events') {
          return this.createEventsProxy(nextProps);
        }

        let willReactive = true;
        // 检查组件属性发生变化
        if (shouldDetectChange) {
          willReactive = this.detectPropChange(key, nextProps, this.props);
        }
        if (!willReactive) {
          return false;
        }
        let setterParam = nextProps[key];
        if (key in converterMap) {
          setterParam = converterMap[key](nextProps[key]);
        }
        if (key in setterMap) {
          setterMap[key](setterParam);
        } else {
          const trySetterName = `set${toCapitalString(key)}`;
          if (trySetterName in instance) {
            instance[trySetterName](setterParam);
          }
        }
      });
    }

    detectPropChange(key, nextProps, oldProps) {
      return nextProps[key] !== oldProps[key];
    }

    render() {
      return (<MapComponent
        onInstanceCreated={this.onInstanceCreated}
        ref={comp => {
          this.myMapComponent = comp; 
        }}
        {...this.props}
      />);
    }

    /**
     * map组件的销毁
     */
    componentWillUnmount() {
      const { instance } = this.myMapComponent;
      if (!instance) return;
      if ('destroy' in instance) {
        setTimeout(() => {
          instance.destroy();
        }, 10);
      }
      if ('hide' in instance) {
        instance.hide();
      }
      if ('__map__' in this.props && 'setMap' in instance) {
        instance.setMap(null);
      }
    }
  };
};

export default wrapperGenerator;
