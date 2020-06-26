---
title: 渲染样式
order: 4
---

可以 利用 Markers 的 props 属性 `render` 批量定义 marker 样式。

+ 默认或者 `render` 函数的执行结果为`false`，都是使用原生的坐标点的样式。
+ `props.render`是一个函数，返回一个 Rax 组件。
+ 和 `Marker`不同的是, `Marker` 代表每一个单独 marker挂载了一个 `render`方法，可以使用这个来方便的动态修改标记的外观，可以参看[Marker组件](/rax-map/components/marker/appearance-render)。
+ 而 `Markers` 的 `render` 方法,是所有 markers 数组的集合的 `render`,代表所有 marker 的统一样式处理。

> [在线示例]演示内容:

> 1.利用 `renderMarkerLayout` 方法,绑定 Markers 的 props `render` 属性。

> 2.切换 Markers 的 props `render` 属性,改变 marker 样式。


```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Markers} from 'rax-map';
import View from 'rax-view';

const alphabet = 'ABCDEFGHIJKLMNOP'.split('');
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    myLabel: alphabet[idx],
    myIndex: idx + 1,
  }))
);

const style = {
  padding: '8px',
  backgroundColor: '#000',
  color: '#fff',
  border: '1px solid #fff',
};

const mouseoverStyle = {
  padding: '8px',
  backgroundColor: '#fff',
  color: '#000',
  border: '1px solid #000',
}

class App extends PureComponent{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
    this.state = {
      useCluster: false,
    };
    this.markerEvents = {
      mouseover:(e, marker) => {
        marker.render(this.renderMouseoverLayout);
      },
      mouseout: (e, marker) => {
        marker.render(this.renderMarkerLayout);
      }
    }
  }

  renderMouseoverLayout(extData){
    if (extData.myIndex === 3){ // 使用原生marker样式
      return false;
    }
    return <View style={mouseoverStyle}>{extData.myLabel}</View>
  }

  renderMarkerLayout(extData){
    if (extData.myIndex === 3){ // 使用原生marker样式
      return false;
    }
    return <View style={style}>{extData.myLabel}</View>
  }

  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4}>
          <Markers
            events={this.markerEvents}
            markers={this.markers}
            render={this.renderMarkerLayout}
          />
        </Map>
      </View>
    </View>
  }
}

render(<App />,mountNode,{ driver: DriverUniversal }); //实际开发中, mountNode不用传，这里是为了放入示例dom中;
```