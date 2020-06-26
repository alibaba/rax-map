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
  createElement
} from 'rax';

import View from 'rax-view';

const styles = {
  checkZoom: {
    position: 'absolute',
    top: 10,
    left: 10,
    background: '#fff',
    padding: 5,
    border: '1px solid #bababa',
    borderRadius: 5
  },
  checkZoomSpan: {
    display: 'inline-block',
    height: 20,
    lineHeight: 20,
    width: 190,
    textAlign: 'left',
    margin: '0 5px',
    cursor: 'pointer',
    color: '#000000',
    fontSize: '12',
    whiteSpace: 'nowrap'
  }
};

const CheckZoom = (props) => {
  const map = props.__map__;
  const mapStore = props.mapStore.state || {center: null, zoom: null};
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const currentZoom = map.getZoom();

  // AMap.event.addListener(map, 'zoomend', () => {
  //   console.log('原生amap 缩放级别>>>', map.getZoom())
  //   //currentZoom = map.getZoom();
  // });

  /* markers dom 对象个数 */
  const getChildrenNum = () => {
    let $amap_markers = document.querySelectorAll('.amap-marker');
    return $amap_markers ? $amap_markers.length + 1 : 0;
  };

  return (<View style={styles.checkZoom} onClick={
    () => {
      AMap.event.trigger(map, 'customEvents', {type: 'CheckZoom'});// 自定义的方法
    }
  }>
    <span style={styles.checkZoomSpan}>当前级别 {mapStore.zoom}</span>
    <span style={styles.checkZoomSpan}>当前中心点 {mapStore.center}</span>
    <span style={styles.checkZoomSpan}>marker数量 {props.mapStore.markers.length}</span>
    <span style={styles.checkZoomSpan}>marker标签 {getChildrenNum()}</span>
  </View>);
};

export default CheckZoom;