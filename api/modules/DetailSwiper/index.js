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
// import Picture from 'rax-picture';
import Swiper from './swiper';

const baseImgR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY4QUM4MzQ3RDVFQTExRTg5MUJFOEVFODRGRjBBQjQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY4QUM4MzQ4RDVFQTExRTg5MUJFOEVFODRGRjBBQjQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjhBQzgzNDVENUVBMTFFODkxQkU4RUU4NEZGMEFCNDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjhBQzgzNDZENUVBMTFFODkxQkU4RUU4NEZGMEFCNDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5uXplFAAAUt0lEQVR42uydC1SU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';
const baseImgL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY4QUM4MzRCRDVFQTExRTg5MUJFOEVFODRGRjBBQjQxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY4QUM4MzRDRDVFQTExRTg5MUJFOEVFODRGRjBBQjQxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjhBQzgzNDlENUVBMTFFODkxQkU4RUU4NEZGMEFCNDEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjhBQzgzNEFENUVBMTFFODkxQkU4RUU4NEZGMEFCNDEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz44WwhBAAAUxElEQVR42uydC1RU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';

const itemStyle = {
  backgroundColor: 'white',
  textAlign: 'center',
  width: '60%',
  border: '1px solid #ccc',
  borderRadius: 20,
  boxShadow: '1px 1px 10px 0 #ccc',
  fontSize: 6,
  paddingTop: 1,
  paddingBottom: 1,
};

const viewStyle = {
  overflow: 'hidden',
  position: 'absolute',
  width: '100%',
  bottom: 0,
  zIndex: 999,
  paddingTop: 2,
  paddingBottom: 2,
  justifyContent: 'center'
};

const arrowStyleL = {
  width: 10,
  height: 10,
  lineHeight: 10,
  zIndex: 999,
  textAlign: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: 10,
  backgroundColor: 'white',
  boxShadow: '1px 1px 10px 0 #ccc',
  marginLeft: 10
};

const arrowStyleR = {
  width: 10,
  height: 10,
  lineHeight: 10,
  zIndex: 999,
  textAlign: 'center',
  justifyContent: 'center',
  border: '1px solid #ccc',
  borderRadius: 10,
  backgroundColor: 'white',
  boxShadow: '1px 1px 10px 0 #ccc',
  marginRight: 10
};

const arrowStyle = {
  position: 'absolute',
  flexDirection: 'row',
  alignContent: 'center',
  width: '100%',
  justifyContent: 'space-between'
};

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
  };

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
      };
      map.on('moveend', window.changeSwiperLabel);
    }

    // if(window.AMap){
    //   window.AMap.event.removeListener("moveend");
    //   window.AMap.event.addListenerOnce(map, "moveend", changeSwiperLabel);
    // }
  }

  return (
    <View style={viewStyle}>
      <Swiper ref="swiper" autoPlay={autoPlay} loop={loop} width={1} previewWidth={298} getScope={getScope}
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
            );
          })
        }
      </Swiper>
      <View style={arrowStyle}>
        {
          arrowRender instanceof Function ? arrowRender('left') :
            <View style={{justifyContent: 'center'}} onClick={arrowHandler.bind(this, 'left')}>
              {/* <Picture source={{uri: baseImgL}} */}
              {/* style={arrowStyleL} */}
              {/* resizeMode={'cover'} /> */}
              <View style={arrowStyleL}> {'◀'} </View>
            </View>
        }
        {
          arrowRender instanceof Function ? arrowRender('right') :
            <View style={{justifyContent: 'center'}} onClick={arrowHandler.bind(this, 'left')}>
              {/* <Picture source={{uri: baseImgR}} */}
              {/* style={arrowStyleR} */}
              {/* resizeMode={'cover'} /> */}
              <View style={arrowStyleR}> {'▶'} </View>
            </View>
        }
      </View>
    </View>
  );
}
;

export default DetailSwiper;