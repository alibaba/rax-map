---
title: 基本介绍
order: 0
---

### 组件列表

RAX-MAP 目前已经包含的组件如下：

| 名称 | 说明 |
|------|------|
| [Map](/rax-map/components/map) | 显示地图；下面的其他组件,必须作为 `Map` 的子组件使用|
| [Marker](/rax-map/components/marker) | 在地图上显示单个坐标点 |
| [Markers](/rax-map/components/markers) | 在地图上显示多个坐标点 |
| [Polygon](/rax-map/components/polygon) | 在地图上显示多边形 |
| [Polyline](/rax-map/components/polyline) |在地图上显示折线 |
| [Circle](/rax-map/components/circle) | 在地图上显示圆形 |
| [Tip](/rax-map/components/tip) | 在地图上显示信息窗体 |

### 术语说明——**动态属性**和**静态属性**的说明


#### 静态属性
> 只在创建实例时能定义的属性,后面不可改变的,比如下面的例子,在jsx标签语法声明时定义各个属性。

```jsx
<Map amapkey={'788e08def03f95c670944fe2c78fa76f'}>
      <Markers
        markers={this.state.markers} // 动态属性
        zooms={[8, 19]}// 静态属性
        useCluster={this.state.useCluster}// 静态属性
        render={this.projMarkers.render}// 动态属性
        events={this.projMarkers.events}// 动态属性
        keepLive={true} />// 动态属性
</Map>
```

#### 动态属性
> 创建实例以及实例创建成功后仍然可以操作改变的属性（比如通过 setState）。

> 其中 markers 是可以动态改变的 。

> 另外,render 属性也能是响应式,改变渲染内容和样式 。

```jsx
this.setState({
   markers: [{marker1},{marker2},{marker3}]
})
render = (extData) => {
    if (this.isArea) {
      return this.renderArea(extData);
    } else {
      return this.renderPoi(extData);
    }
  }
```
