---
category: 地图
order: 1
title: Map 组件
---

## 介绍

在需要显示地图的地方使用；

- Map 组件是其他组件的基础，其他地图组件必须作为 Map 的子组件使用;
- 属性列表和其他其他静态属性 是基于高德地图的属性,加上自定义属性的集合;
- 注：此页面配置,并非完全透传高德map的所有属性,配置也有自定义封装,与官方的表现不一致，请参考[官方文档](http://lbs.amap.com/api/javascript-api/reference/map-control)进行配置。

## API

### 静态属性列表
> rax-amap独立定义的;

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| protocol | 静态属性 | `String` | `window.location.protocol` | 加载高德 API 的协议前缀 |
| version | 静态属性 | `String` | `1.4.0` | 指定加载高德 API 的版本 |
| useAMapUI | 静态属性 | `Boolean` | `false` | 是否加载[AMapUI 组件库](http://lbs.amap.com/api/javascript-api/guide/amap-ui/intro) |
| version | 静态属性 | `String` | `'1.4.0'` | 加载的高德 API 的版本 |
| amapkey | 静态属性 | `String` | / | 加载高德 API 使用的 Key |


> 沿用amap定义的,属性的作用与取值参考[高德官网](http://lbs.amap.com/api/javascript-api/reference/map);

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| view | 静态属性 | `View2D` | / | 地图视口，用于控制影响地图静态显示的属性，如：地图中心点“center”,推荐直接使用zoom、center属性为地图指定级别和中心点
| zooms | 静态属性 | `Number` | 8 |地图显示的缩放级别，若center与level未赋值，地图初始化默认显示用户所在城市范围 3D地图下，zoom值，可以设置为浮点数。（在V1.3.0版本level参数调整为zoom，3D地图修改自V1.4.0开始生效）
| crs | 静态属性 | `String` | / |地图显示的参考坐标系，取值： 'EPSG3857' 'EPSG3395' 'EPSG4326' 自V1.3.0移入view对象中
| showIndoorMap | 静态属性 | `Boolean` | false | 是否在有矢量底图的时候自动展示室内地图，PC端默认是true，移动端默认是false
| indoorMap | 静态属性 | `IndoorMap` | / | 在展示矢量图的时候自动展示室内地图图层，当地图complete之后可以获取到该对象
| expandZoomRange | 静态属性 | `Boolean` | true | 是否支持可以扩展最大缩放级别,和zooms属性配合使用 设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
| showBuildingBlock | 静态属性 | `Boolean` | false | 是否在有矢量底图的时候自动展示室内地图，PC端默认是true，移动端默认是false
| viewMode | 静态属性 | `String` | `2D` | 默认为‘2D’，可选’3D’，选择‘3D’会显示 3D 地图效果。（自V1.4.0开始支持）
| pitchEnable | 静态属性 | `Boolean` | false | 是否允许设置俯仰角度，3D视图下为true，2D视图下无效。（自V1.4.0开始支持） 自v1.4.8开始，当此属性为false时，地图以初始属性设置的pitch值为倾斜角度，同时setPitch和鼠标手势交互操作将不能改变倾斜角度
| skyColor | 静态属性 | `String` | / | 调整天空颜色，配合自定义地图，3D视图有效，如‘#ff0000’。（自V1.4.0开始支持）

### 动态属性列表

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| layers | 动态属性 | [TileLayer](http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)\[\]| / |地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。当叠加多个图层时，普通二维地图需通过实例化一个TileLayer类实现|
| zoom | 动态属性 | `Number` | / | 地图显示的缩放级别，若center与level未赋值，地图初始化默认显示用户所在城市范围|
| center | 动态属性 | `{ longitude, latitude }` 或者 `[ longitude, latitude ]` 或者 [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat) | / |地图中心点坐标值|
| labelzIndex | 动态属性 |`Number`|/|地图标注显示顺序，大于110即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。|
| lang | 动态属性 |`String`|`zh_cn`|地图语言类型,可选值：zh_cn: 中文简体，en: 英文，zh_en：中英文对照,注：由于图面内容限制，中文、英文 、中英文地图POI可能存在不一致的情况|
| mapStyle | 动态属性 | `String` |`normal` | 设置地图显示样式。目前支持normal（默认样式）、dark（深色样式）、light（浅色样式）、fresh(osm清新风格样式)、blue_night|
| features | 动态属性 |`String[]`|/|设置地图上显示的元素种类。支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）|
| cursor | 动态属性 |`String`|/|地图默认鼠标样式。参数cursor应符合CSS的cursor属性规范|
| defaultLayer | 动态属性 |[TileLayer](http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)|/|当前地图中默认显示的图层。默认图层可以是TileLayer.Satellite等切片地图，也可以是通过[TileLayer](http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer)自定义的切片图层|
| animateEnable | 动态属性 | `Boolean` |`true`| 地图平移过程中是否使用动画 |
| doubleClickZoom | 动态属性 | `Boolean` |`true`| 地图是否可通过双击鼠标放大地图 |
| dragEnable | 动态属性 | `Boolean` |`true`| 地图是否可通过鼠标拖拽平移 |
| isHotspot | 动态属性 | `Boolean` |`false`| 是否开启地图热点 |
| jogEnable | 动态属性 | `Boolean` |`true`| 地图是否使用缓动效果 |
| keyboardEnable | 动态属性 | `Boolean` |`true`| 地图是否可通过键盘控制 |
| resizeEnable | 动态属性 | `Boolean` |`false`| 是否监控地图容器尺寸变化 |
| rotateEnable | 动态属性 | `Boolean` |`false`| 地图是否可旋转 |
| scrollWheel | 动态属性 | `Boolean` |`true`| 地图是否可通过鼠标滚轮缩放浏览 |
| touchZoom | 动态属性 | `Boolean` |`true`| 地图在移动终端上是否可通过多点触控缩放浏览地图 |
| zoomEnable | 动态属性 | `Boolean` |`true`| 地图是否可缩放 |

### 扩展属性
> 对amap一些可以配置的属性,进行了封装和归集，方便使用;

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| events | 动态属性 | `Object` | / | 以键值对的形式提供绑定的事件对象，详见下文说明 |
| status | 动态属性 | `Object` | / | 以对象方式统一提供上述`animateEnable` 至 `zoomEnable` 等 11 个布尔值 |
| loading | 动态属性 | `Object` | {time:0,render:null} | 用于在地图加载成功前渲染,time=loading动画持续时间,render=loading 的DOM渲染 RaxNode |
| plugins | 动态属性 | `Array` | `[]` | 提供要加载的插件列表，见下文说明 |

#### 一、 events 配置

> 支持通过配置`events`属性给地图绑定事件；
> 除了[高德原生提供的事件](http://lbs.amap.com/api/javascript-api/reference/map)外，我们扩展了`created`事件。
> `events.created` 在地图实例创建成功后调用，传入参数就是地图实例。你可以在这里获得实例并进行操作。例如：

```jsx 
const events = {
  created: (map) => { console.log(map); //  这里的map就是高德 new Amap() 后的实例对象},
  click: () => { console.log('clicked') },
}

/* ... */
<Map events={events} />
```


#### 二、 plugins 配置

> 支持通过配置`plugins`属性给地图增加[控件功能](http://lbs.amap.com/api/javascript-api/reference/map-control)。

| 属性 | 是否插件 | 说明 |
|------|-----|-----|
| MapType | 是 | 地图类型切换插件，用来切换固定的几个常用图层
| OverView | 是 | 地图鹰眼插件，默认在地图右下角显示缩略图
| Scale | 是 | 地图比例尺插件
| ToolBar | 是 | 地图工具条插件，可以用来控制地图的缩放和平移
| ControlBar | 是 | 组合了旋转、倾斜、复位、缩放在内的地图控件，在3D地图模式下会显示（自V1.4.0版本新增）

> `plugins` 属性取值是一个数组，数组每一项就是每个控件的配置；如下:

```jsx
const plugins = ['Scale', 'ToolBar'];
/* ... */
<Map plugins={plugins}/>
```

> 如果想启用控件的默认配置，直接写出控件名字（字符串）即可，如果需要自定义控件的配置，以对象来定义。如：

```jsx
const plugins = ['Scale', {
  name: 'ToolBar',
  options: {
    visible: true, // 动态改变控件的可视状态，默认为 true
    onCreated(map){
      // 地图的每个控件都是插件的形式提供，这里可以获得插件的实例
    },
    // 以下就是官方提供的可配置属性
    offset,
    position,
    // ... 以及其他的属性
  }
}];
/* ... */
<Map plugins={plugins}/>
```