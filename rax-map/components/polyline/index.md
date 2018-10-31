---
category: 覆盖物
order: 4
title: Polyline 组件
---


## 何时使用

需要在地图上一个折线段的时候；

## API



### 动态属性

| 属性 | 类型 | 默认取值 | 说明 |
|------|-----|------|-----|
| path | [LngLat](http://lbs.amap.com/api/javascript-api/reference/core#LngLat)\[\] <br/> `{longitude, latitude}`\[\]  | [] | 折线的节点坐标数组 |
| draggable | `Boolean` | false | 实例线段图形是否可拖拽 |
| extData | 任意 | / | 用户自定义属性，支持JavaScript API任意数据类型，如Polyline的id等 |

### 静态属性

| 属性       |  类型 | 默认取值 | 说明     |
|-----------|-----------|-------|-----|
| zIndex  | `Number`  | 10    | 多边形覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示 |
| bubble  | `Boolean` | false | 是否将覆盖物的鼠标或touch等事件冒泡到地图上 |
| showDir | `Boolean` | false | 是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用|

### 扩展属性

| 属性     | 类型 | 默认取值 | 说明     |
|----------|-----------|-------|-----|
| style   | `{ geodesic, isOutline, outlineColor, strokeColor, strokeOpacity, strokeWeight, strokeStyle, strokeDasharray }` | / | 绘制折线的外观，各个字段取值类型参考[PolylineOptions](http://lbs.amap.com/api/javascript-api/reference/overlay#Polyline) |
| visible | `Boolean` | true | 多边形的显示/隐藏状态 |

#### PolylineOptions属性

| PolylineOptions |     类型      |     说明      |
|:-------------:|:-------------:|:-------------:|
| map | Map | 要显示该polyline的地图对象 |
| zIndex | Number | 折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示 默认zIndex：50 |
| bubble | Boolean |是否将覆盖物的鼠标或touch等事件冒泡到地图上（自v1.3 新增）默认值：false |
| cursor | String | 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor |
| geodesic | Boolean |是否绘制成大地线，默认false[相关示例](https://lbs.amap.com/api/javascript-api/example/overlayers/draw-ground-line) |
| isOutline | Boolean | 线条是否带描边，默认false |
| borderWeight | Number | 描边的宽度，默认为1 |
| outlineColor | String | 线条描边颜色，此项仅在isOutline为true时有效，默认：`#000000` |
| path | Array | 折线的节点坐标数组 |
| strokeColor | String | 线条颜色，使用16进制颜色代码赋值。默认值为#006600 |
| strokeOpacity | Number | 线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9 |
| strokeWeight | Number | 线条宽度，单位：像素 |
| strokeStyle | String | 线样式，实线:solid，虚线:dashed |
| strokeDasharray | Array | 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值：  实线：[0,0,0]  虚线：[10, 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线 |
| lineJoin | String | 折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角 |
| lineCap | String | 折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头 |
| draggable | Boolean | 设置折线是否可拖拽移动，默认为false |
| extData | Any | 用户自定义属性，支持JavaScript API任意数据类型，如Polyline的id等 |
| showDir | Boolean | 是否延路径显示白色方向箭头,默认false。Canvas绘制时有效，建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头（自V1.4.0版本参数效果变更） |

