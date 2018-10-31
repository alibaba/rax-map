/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/5/8
 * Time: 下午5:28
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
/* global AMap */
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
import styles from './index.css';
import Swiper from './swiper';
// import Swiper from 'react-mobile-swiper';

const baseImg1 = 'data:image/png;base64,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';
const baseImg = 'data:image/png;base64,\n' +
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAAkCAYAAABIdFAMAAAAGXR\n' +
    'FWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHhJRE\n' +
    'FUeNo8zjsOxCAMBFB/KEAUFFR0Cbng3nQPw68ArZdAlOZppPFIB\n' +
    'hH5EAB8b+Tlt9MYQ6i1BuqFaq1CKSVcxZ2Acs6406KUgpt5/　\n' +
    'LCKuVgz5BDCSb13ZO99ZOdcZGvt4mJjzMVKqcha68iIePB86G\n' +
    'AiOv8CDADlIUQBs7MD3wAAAABJRU5ErkJggg%3D%3D';

const itemStyle = {
  backgroundColor: 'white',
  textAlign: 'center',
  width: '60%',
  border: '1px solid #ccc',
  borderRadius: 20,
  boxShadow: '1px 1px 10px 0 #ccc',
  fontSize:6,
  paddingTop:1,
  paddingBottom:1,
};

const viewStyle = {
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  bottom: 0,
  zIndex: 999,
  paddingTop:2,
  paddingBottom:2,
  justifyContent: 'center'
};

const arrowStyleL = {
  width: 15,
  height: 15,
  //position: 'absolute',
  zIndex: 999,
  //left: 0,
  textAlign: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: 15,
  backgroundColor: 'white',
  boxShadow: '1px 1px 10px 0 #ccc',
  marginLeft: 5
  //backgroundImage:'url('+baseImg+') no-repeat fixed center '
};

const arrowStyleR = {
  width: 15,
  height: 15,
  //position: 'absolute',
  zIndex: 999,
  //right: 0,
  textAlign: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: 15,
  backgroundColor: 'white',
  boxShadow: '1px 1px 10px 0 #ccc',
  marginRight: 5
  //backgroundImage:'url('+baseImg+') no-repeat fixed center '
};

const arrowStyle = {
  position: 'absolute',
  flexDirection: 'row',
  alignContent: 'center',
  width: '100%',
  justifyContent: 'space-between'
}

let scope = null;

const DetailSwiper = (props) => {

      const map = props.__map__;
      const mapStore = props.__ele__;

      const render = props.render; // 底部 card 的渲染样式
      const loop = props.loop || true; // card 是否支持轮播
      const autoPlay = props.autoPlay || false; // 是否支持自动播放
      const arrowRender = props.arrowRender;// 箭头的渲染样式
      const animationEndHanler = props.animationEndHanler; // 底部 `card` 每次滑动效果结束触发的事件

      const currentZoom = map.getZoom();

      /* markers dom 对象个数 */
      const getChildrenNum = () => {
        let $amap_markers = document.querySelectorAll('.amap-marker');
        return $amap_markers ? $amap_markers.length + 1 : 0;
      };

      const getChildren = () => {
        let list = [];
        if (map) {
          return map.getAllOverlays('marker');
        }
      };

      const getScope = (arg) => {
        scope = arg;
      };

      const markerGoCenter = () => {
        setTimeout(() => {
          const children = getChildren();
          const index = scope.state.index;
          const marker = children[index];
          if (children && marker) {
            const positon = marker.getPosition();
            map.setCenter(positon);
          }
        }, 0);
      };

      const arrowHandler = (dir) => {
        if (dir === 'left') {
          scope.pre();
          markerGoCenter();
        } else {
          scope.next();
          markerGoCenter();
        }
      }

      if (!map) {
        console.log('组件必须作为 Map 的子组件使用');
        return;
      } else {
        if (!window.changeSwiperLabel) {
          window.changeSwiperLabel = () => {
            setTimeout(() => {
              const mapCenter = map.getCenter();
              const children = getChildren();
              const index = children.findIndex((item) => {
                const pos = item.getPosition();
                return String(pos.lng) === String(mapCenter.lng) && String(pos.lat) === String(mapCenter.lat);
              });
              if (scope && index >= 0) {
                scope.setMyState(index, true);
              }
            }, 0);
          }
          map.on('moveend', window.changeSwiperLabel);
        }

        // if(window.AMap){
        //   window.AMap.event.removeListener("moveend");
        //   window.AMap.event.addListenerOnce(map, "moveend", changeSwiperLabel);
        // }
      }

      return (
          <View style={viewStyle}>
            <Swiper ref='swiper' autoPlay={autoPlay} loop={loop} width={1} previewWidth={298} getScope={getScope}
                    animationEndHanler={animationEndHanler}>
              {
                getChildren().map((item) => {
                  console.log('ok=>', item.getExtData());
                  return (
                      render instanceof Function ?
                          render() :
                          <View style={itemStyle}>
                            {item.getExtData().cacheIndex}:
                            {item.getExtData().myLabel}
                          </View>
                  )
                })
              }
            </Swiper>
            <View style={arrowStyle}>
              {
                arrowRender instanceof Function ? arrowRender('left') :
                    <View style={arrowStyleL} class='iconfont' onClick={arrowHandler.bind(this, 'left')}>&#xe732;</View>
              }
              {
                arrowRender instanceof Function ? arrowRender('right') :
                    <View style={arrowStyleR} class='iconfont' onClick={arrowHandler.bind(this, 'right')}>&#xe731;</View>
              }
            </View>
          </View>
      );
    }
;

export default DetailSwiper;