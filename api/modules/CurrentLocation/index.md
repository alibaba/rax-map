---
category: 辅助组件
order: 2
title: 定位当前位置组件
---


## 介绍
- 作用:定位组件是为了定位移动端当前位置,并在地图上显示定位。
- 有两种定位方式:
- 一种是启用高德的 `AMap.Geolocation` 插件,[参考地址](https://lbs.amap.com/api/javascript-api/reference/location#m_AMap.Geolocation)。
    + Geolocation 定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位sdk辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能。
    + 用户可以通过两种当时获得定位的成败和结果，一种是在 getCurrentPosition的时候传入回调函数来处理定位结果，一种是通过事件监听来取得定位结果。
    + 注：默认情况下，PC 端优先使用精确 IP 定位，解决多数浏览器无法完成定位的现状，IP定位失败后使用浏览器定位；手机端优先使用浏览器定位，失败后使用IP定位；

```* 由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。```

- 另一种是 `Rax-map` 自定义的定位组件。




## API



### 静态属性

> `AMap.Geolocation` 属性。

| 属性       | 默认取值 | 说明     |
|:-------------:|:-------------:|:-------------:|
|enableHighAccuracy|Boolean|是否使用高精度默认值：true|
|timeout|Number|超时毫秒数，若在指定时间内未定位成功，返回超时错误信息"TIMEOUT"默认值：无穷大|
|noIpLocate|Number|是否禁止使用IP定位，默认值为0，可选值0-30: 可以使用IP定位1: 手机设备禁止使用>3: 所有终端禁止使用IP定位|
|noGeoLocation|Number|是否禁止使用浏览器Geolocation定位，默认值为0，可选值0-30: 可以使用浏览器定位PC上禁止使用浏览器定位3: 所有终端禁止使用浏览器定位|
|GeoLocationFirst|Boolean|默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位|
|maximumAge|Number|缓存毫秒数。定位成功后，定位结果的保留时间默认值：0|
|convert|Boolean|是否使用坐标偏移，取值true:为高德地图坐标，取值false:为浏览器定位坐标默认值：true|
|showButton|Boolean|是否显示定位按钮默认值：true|
|buttonDom| String/DomElement |自定义定位按钮的内容。可支持HTML代码或Dom元素对象，不设置该属性则使用默认按钮样式|
|buttonPosition|String|定位按钮可停靠的位置"LT"：左上角"LB"：左下角"RT"：右上角"RT"|
|buttonOffset|[Pixel](https://lbs.amap.com/api/javascript-api/reference/core/#Pixel)|按钮距离停靠位置的偏移量默认值：Pixel(10,20)|
|showMarker|Boolean|定位成功时是否在定位位置显示一个Marker默认值：true|
|markerOptions|[MarkerOptions](/api/javascript-api/reference/overlay/#MarkerOptions)|定位点Marker的配置，不设置该属性则使用默认Marker样式|
|showCircle|Boolean|定位成功并且有精度信息时，是否用一个圆圈circle表示精度范围默认值：true|
|circleOptions|[CircleOptions](/api/javascript-api/reference/overlay#CircleOptions)|定位点Circle的配置，不设置该属性则使用默认Circle样式|
|panToLocation|Boolean|定位成功后，是否把定位得到的坐标设置为地图中心点坐标默认值：true|
|zoomToAccuracy|Boolean|定位成功且显示精度范围时，是否把地图视野调整到正好显示精度范围默认值：false|
|useNative|Boolean|是否使用安卓定位sdk用来进行定位，默认：false适用于同时在APP中使用安卓定位sdk并在APPsdk进行定位，失败后依次尝试浏览器定位和IP定位。注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，还需要调用高德定位sdk中，AMapLocationClient类的startAssistantLocation可参考定位SDK的[参考手册](https://lbs.amap.com/api/android-location-sdk/reference/)|
|extensions|String|JSAPI在定位成功的时候会将得到的经纬度进行逆地理编码后获取地址信息，以方便开发者的进一步使用选值'base'、'all'。默认为'base',只返回地址信息；设定为'all'的时候将返回周边POI、道路交叉口等信息。|

> GeolocationResult 对象

| 属性       | 默认取值 | 说明     |
|:-------------:|:-------------:|:-------------:|
| position | LngLat | 定位结果
| accuracy | Number | 精度范围，单位：米
| location_type | String | 定位结果的来源，可能的值有:'html5'、'ip'、'sdk'
| message | String | 形成当前定位结果的一些信息
| isConverted | Boolean | 是否经过坐标纠偏
| info | String | 状态信息 "SUCCESS"
| addressComponent | AddressComponent | 地址信息，详情参考Geocoder
| formattedAddress | String | 地址
| pois | Array | 定位点附近的POI信息，extensions等于'base'的时候为空
| roads | Array | 定位点附近的道路信息，extensions等于'base'的时候为空
| crosses | Array | 定位点附近的道路交叉口信息，extensions等于'base'的时候为空