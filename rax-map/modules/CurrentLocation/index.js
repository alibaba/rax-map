/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/5/8
 * Time: 下午5:28
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
import {
  createElement,
  Component,
  Children,
  PureComponent,
  findDOMNode,
  cloneElement,
  unmountComponentAtNode
} from 'rax';
import View from 'rax-view';
import Picture from 'rax-picture';
import isFun from "../../components/utils/isFun";
//import styles from './index.css';

const styles = {
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
    alignItems: 'center',
  },
  icon: {
    width: 56 / 2,
    height: 56 / 2,
  }
}

/* global AMap */
const CurrentLocation = (props) => {
  const map = props.__map__;
  const element = props.__ele__;
  let geolocation = null;

  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }

  const triggerCreated = (props) => {
    const events = props.events || {};
    if (('created' in events) && (typeof events.created === 'function')) {
      events.created(geolocation);
    }
  }

  const requestGeolocation = (props) => {
    if (geolocation) {
      return new Promise((resolve) => {
        resolve(geolocation);
      });
    } else {
      return new Promise((resolve) => {
        map.plugin(['AMap.Geolocation'], () => {
          const newProps = {
            ...props,
            ...{showButton: false}
          }
          geolocation = new window.AMap.Geolocation(newProps);
          resolve(geolocation);
        });
      });
    }
  }

  const getCurrentGeo = () => {
    const {onGeoComplete, onGeoError} = props;
    geolocation.getCurrentPosition((status, result) => {
      if (status == 'complete') {
        if (onGeoComplete && isFun(onGeoComplete)) {
          onGeoComplete(result);
        }
      } else {
        if (onGeoError && isFun(onGeoError)) {
          onGeoError(result);
        }
      }
    })
  }

  if (typeof window !== 'undefined') {
    if (!props.__map__) {
      throw new Error('Geolocation has to be a child of Map component');
    } else {
      const {autoLoc} = props;
      requestGeolocation(props).then(() => {
        triggerCreated(props);
        map.addControl(geolocation);
        autoLoc && getCurrentGeo();
      });
    }
  }

  return (<View style={styles.circleContainer} onClick={
    () => {
      getCurrentGeo();
      AMap.event.trigger(map, 'customEvents', {type: 'CurrentLocation'});// 自定义的方法
    }
  }>
    <Picture source={{uri: '//gw.alicdn.com/tfs/TB1yPNpG25TBuNjSspmXXaDRVXa-135-138.png'}} style={styles.icon}
             resizeMode={'cover'}/>
  </View>);
};

export default CurrentLocation;