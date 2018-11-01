/**
 * Created with WebStorm.
 * User: 一晟
 * Date: 2018/5/10
 * Time: 下午10:56
 * email: zhu.yan@alibaba-inc.com
 * To change this template use File | Settings | File Templates.
 */
// import {toLnglat, toPixel} from './common';
// import {MarkerAllProps} from './markerUtils';
/* 获取屏幕四角坐标 */
/* global AMap */
export const getBounds = (map, type) => {
  const bounds = map.getBounds();
  const northeast = bounds.northeast;
  const southwest = bounds.southwest;

  // 缩小一些请求范围
  let lnglat1 = map.containerToLngLat(new AMap.Pixel(60, 60)); // 获得 LngLat 对象
  let lnglat2 = map.containerToLngLat(new AMap.Pixel(0, 0)); // 获得 LngLat 对象
  let lngSpc = Number(Math.abs(lnglat2.lng - lnglat1.lng).toFixed(6));
  let latSpc = Number(Math.abs(lnglat2.lat - lnglat1.lat).toFixed(6));

  // let lnglat = map.pixelToLngLat(new AMap.Pixel(50, 50), map.getZoom());
  // let lngSpc = lnglat.lng;
  // let latSpc = lnglat.lat;
  if (map.getZoom() < 15) {
    northeast.lng -= lngSpc;
    northeast.lat -= latSpc;
    southwest.lng += lngSpc;
    southwest.lat += latSpc;
  }

  switch (type) {
    case 'String':
      let val = [northeast.lng, northeast.lat, northeast.lng, southwest.lat, southwest.lng, southwest.lat, southwest.lng, northeast.lat];
      // return '[' + val.join(',') + ']';
      return JSON.stringify(val);
      break;
    case 'Array':
      return [northeast.lng, northeast.lat, northeast.lng, southwest.lat, southwest.lng, southwest.lat, southwest.lng, northeast.lat];
      break;
    case 'Array2':
      // return [[northeast.lng - 0.005, northeast.lat - 0.005], [northeast.lng - 0.005, southwest.lat + 0.005], [southwest.lng + 0.005, southwest.lat + 0.005], [southwest.lng + 0.005, northeast.lat - 0.005]];
      return [[northeast.lng, northeast.lat], [northeast.lng, southwest.lat], [southwest.lng, southwest.lat], [southwest.lng, northeast.lat]];
      break;
    case 'Object':
      return {leftTop: {x: northeast.lng, y: northeast.lat}, rightBottom: {x: southwest.lng, y: southwest.lat}};
      break;
    default:
      return bounds;
      break;
  }
};

/* 判断点是否在多个环组成区域内 */
export const isPointInPolygon = (map, coord, polygon) => {
  if (AMap) {
    const point = new AMap.LngLat(coord.longitude, coord.latitude);
    const ring = polygon instanceof Array ? polygon : getBounds(map, 'Array2');
    const rings = ring.map((item) => {
      return new AMap.LngLat(item[0], item[1]);
    });
    // console.log('ringsrings:',rings)
    return AMap.GeometryUtil.isPointInPolygon(point, rings);
    // return true;
  }
  return false;
};
