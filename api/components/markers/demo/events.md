---
title: 事件绑定
order: 3
---

Markers 组件的事件绑定方式与 Marker 类似，都是定义 events 属性；但是调用的参数不一样；

首先是扩展的 created 事件，参数是创建的所有高德标记点的实例（即[高德的 Marker](http://lbs.amap.com/api/javascript-api/reference/overlay#Marker) 实例）数组；

> [在线示例]演示内容:

> 1.尝试点击例子中的坐标点，以及弹窗中的坐标点，在控制台查看输出。

```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Markers} from 'rax-map';
import View from 'rax-view';
import Text from 'rax-text';

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
  }))
);
class App extends PureComponent {
  constructor(){
    super();
     this.state = {
      message:''
     }
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
    this.markersEvents = {
      created:(allMarkers) => { 
        this.changeText('点击marker查看结果');
        console.log(allMarkers);
      },
      click: (MapsOption, marker) => {
        this.changeText('点击marker结果::'+marker.getId());
        console.log(MapsOption);
        console.log(marker);
      },
      dragend: (MapsOption, marker) => { /* ... */ }
    }
  }

  changeText(txt){
    this.setState({
        message:txt
    })
  }

  render(){   
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={4}>
          <Markers 
            markers={this.markers}
            events={this.markersEvents}
          />
        </Map>
      </View>
      <Text style={{fontSize:8}}>{this.state.message}</Text>
    </View>
  }
}

render(
  <App/>, mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```