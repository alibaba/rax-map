---
title: AMapUI 组件库
order: 6
---

现在 Rax-map 的 Map 组件中，你可以指定 `useAMapUI` 属性为 true,这样可以加载 [AMapUI 组件库](http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro)。

使用参考[示例](https://lbs.amap.com/api/amap-ui/demos/amap-ui-simplemarker/custom-icon)。

目前，利用原生AMap可以实现地图的大部分功能,而UI组件库是高德地图的高级功能,官方是解释是这样:

> 为了满足UI的个性化需求，UI组件库支持开发者`通过“代码”层面的手段来实现功能的改变，而不必局限在组件自身的接口上`。

- 一方面，各个组件的实现细节是公开的（比如SimpleMarker），开发者可以参照；

- 另一方面，UI组件库支持通过继承和“模块”替换等方式对组件进行定制修改，从而实现个性化的效果。


> 以下是对目前所有官方AMapUI组件库的整理(官方未集中整理):

| 名称 | 模块名 | 模块引用路径 | 介绍 |
|------|-----|-----|-----|
| 简单标注 | SimpleMarker | ui/overlay/SimpleMarker | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/overlay/simplemarker) |
| 矢量标注 | SvgMarker | ui/overlay/SvgMarker | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/overlay/svgmarker) |
| 字体图标标注 | AwesomeMarker | ui/overlay/AwesomeMarker | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/overlay/awesomemarker) |
| 简单信息窗体 | SimpleInfoWindow | ui/overlay/SimpleInfoWindow | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/infowindow/simpleinfowindow) |
| 基础控件 | BasicControl | ui/control/BasicControl | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/control/basiccontrol) |
| 海量点展示 | PointSimplifier | ui/misc/PointSimplifier | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier) |
| 轨迹展示 | PathSimplifier | ui/misc/PathSimplifier | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pathsimplifier) |
| 行政区划浏览 | DistrictExplorer | ui/geo/DistrictExplorer | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-explorer) |
| 行政区划聚合 | DistrictCluster | ui/geo/DistrictCluster | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-cluster) |
| 标注列表 | MarkerList | ui/misc/MarkerList | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/other/markerlist) |
| 城市选择器 | MobiCityPicker | ui/misc/MobiCityPicker | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/other/mobicitypicker) |
| POI选点 | PoiPicker | ui/misc/PoiPicker | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/other/poipicker) |
| 拖拽选址 | PositionPicker | ui/misc/PositionPicker | [官方示例](https://lbs.amap.com/api/javascript-api/reference-amap-ui/other/positionpicker) |


> 对于 SimpleMarker 的用法,建议使用 `Rax-map` 使用样式的方案,充分利用了jsx的标签特性,有两种方法:

- 方法1.
``` <Marker><img src="..."/></Marker>```
- 方法2.
``` <Markers render={this.renderMarkerLayout} /> ```

> [在线示例]演示内容:

> 1.设置map的useAMapUI属性为true,启用map的AMapUI功能;

> 2.以下是 高德官方的 `SimpleMarker` 和 `PoiPicker` 的例子:





```jsx
import {Map} from 'rax-map';
import View from 'rax-view';
import {PureComponent, render} from 'rax';
import $ from 'jquery';

const pickerBox={
    position: 'absolute',
    zIndex: 9999,
    top: '10px',
    left: '10px',
    width: '300px'
}

const pickerInput={
    width: '200px',
    padding: '5px 5px'
}

const poiInfo={
    backgroundColor: '#fff'
}

class UIMarker extends PureComponent {
  constructor() {
    super();
    // poiPicker 依赖jquery
    window.AMapUI.setDomLibrary($);

    window.AMapUI.loadUI(['overlay/SimpleMarker','misc/PoiPicker'], (SimpleMarker,PoiPicker) => {
      console.log('arguments=',arguments);
      this.initPage(SimpleMarker,PoiPicker);
    })
  }

  // poiPicker 官方示例
   poiPickerReady(map,poiPicker) {
      window.poiPicker = poiPicker;
      const marker = new AMap.Marker();
      const infoWindow = new AMap.InfoWindow({
          offset: new AMap.Pixel(0, -20)
      });
      //选取了某个POI
      poiPicker.on('poiPicked', function(poiResult) {
          const source = poiResult.source,
              poi = poiResult.item,
              info = {
                  source: source,
                  id: poi.id,
                  name: poi.name,
                  location: poi.location.toString(),
                  address: poi.address
              };
          marker.setMap(map);
          infoWindow.setMap(map);

          marker.setPosition(poi.location);
          infoWindow.setPosition(poi.location);

          infoWindow.setContent('POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>');
          infoWindow.open(map, marker.getPosition());
          //map.setCenter(marker.getPosition());
      });

      poiPicker.onCityReady(function() {
          poiPicker.suggest('美食');
      });
   }

  initPage(SimpleMarker,PoiPicker) {
    const map = this.props.__map__;
    // 这个例子来自官方文档 http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro

    new SimpleMarker({
        //前景文字
        iconLabel: 'A',
        //图标主题
        iconTheme: 'default',
        //背景图标样式
        iconStyle: 'red',
        //...其他Marker选项...，不包括content
        map: map,
        position: [116.418, 39.89]
    });

    //创建SimpleMarker实例
    new SimpleMarker({
        //前景文字
        iconLabel: {
            innerHTML: '<i>B</i>', //设置文字内容
            style: {
                color: '#fff' //设置文字颜色
            }
        },
        //图标主题
        iconTheme: 'fresh',
        //背景图标样式
        iconStyle: 'black',
        //...其他Marker选项...，不包括content
        map: map,
        position: [116.417, 39.88]
    });

    //初始化poiPicker
    this.poiPickerReady(
        map,
        new PoiPicker({
          //city:'北京',
          input: 'pickerInput'
        })
    );
  }

  render() {
    return (null);
  }
}

const MyApp = (<View style={{width: '100%', height: '100%'}}>
      <Map zoom={12} center={[116.417, 39.88]} useAMapUI={true} >
        <UIMarker/>
      </Map>
      <View id="pickerBox" style={pickerBox}>
         <input id="pickerInput" style={pickerInput} placeholder="输入关键字选取地点" />
         <View id="poiInfo" style={poiInfo}></View>
      </View>
      </View>);

render(
  MyApp,
  mountNode
)

```
