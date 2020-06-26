---
title: 基本用法
order: 1
---



| 属性 | 是否插件 | 说明 |
|------|-----|-----|
| Geolocation | 是 | 定位当前位置,包括定位图标,当前经纬度位置 |

> 事件绑定

| 事件       | 参数 | 说明     |
|:-------------:|:-------------:|:-------------:|
| onGeolocationComplete | GeolocationResult | rax-map 事件 定位成功时触发此事件|
| onGeolocationError | GeolocationError | rax-map 事件 定位失败时触发此事件|

> [在线示例]演示内容:

> 本例演示了 启用高德的 `AMap.Geolocation` 插件,定位当前位置。

```jsx
 import {createElement, PureComponent, render} from 'rax';
 import DriverUniversal from "driver-universal";
 import {Map,CurrentLocation} from 'rax-map';
 import View from 'rax-view';

class App extends PureComponent{
  render(){
    const plugins = [
      // 'Geolocation', // 也可以直接字符串配置
      {
        name:'Geolocation',
        options:{ // 地理定位
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: {x:10, y:60},//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            onGeoComplete:(result) => {alert('定位成功:'+JSON.stringify(result))},
            onGeoError: (result) => {alert('定位失败:'+JSON.stringify(result))},
          }
      },
      'ToolBar'
    ]
    return <div style={{width: '100%', height: '100%'}}>
      <Map
        plugins={plugins}
      >
      <CurrentLocation></CurrentLocation>
      </Map>
    </div>
  }
}
render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```