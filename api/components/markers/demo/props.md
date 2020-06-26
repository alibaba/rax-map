---
title: 属性配置
order: 2
---

Markers 组件在创建高德坐标点时，属性的设定非常灵活。
+ 直接在 markers 属性中提供原始数据时提供；如下例子中的 `position` 和 `draggable`；
+
+ 定义在 Markers 的 props 属性，值是一个函数；

> [在线示例]演示内容:

> 1.在创建标记时，会将函数的执行结果作为属性值；

> 2.Markers 的 props 属性，值可以是一个属性值；如下例子中的`bubble`。

> 3.Markers 的 props 属性，值也可以是一个函数；如下例子中的`angle`，函数传入的参数为 `markers` 属性提供的原始数据项及该项的索引。


```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Markers} from 'rax-map';
import View from 'rax-view';

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 100 + Math.random() * 30,
      latitude: 30 + Math.random() * 20,
    },
    draggable: true,
    someProperty: parseInt(Math.random() * 100),
  }))
);

class App extends PureComponent{
  constructor(){
    super();
    this.markers = randomMarker(10);
    this.mapCenter = {longitude: 115, latitude: 40};
  }

  
  randomAngle(extData, index){
    if (extData.someProperty % 3 === 0){
      return 45;
    }
    return 0;
  }
  
  render(){   
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={5}>
          <Markers 
            markers={this.markers}
            bubble={false}
            angle={(extData, index) => { return this.randomAngle(extData, index)}}
          />
        </Map>
      </View>
    </View>
  }
}

render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```