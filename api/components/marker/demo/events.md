---
order: 3
title: 绑定事件
---

高德 Marker 中所有原生的事件都可以,在 Marker 组件实例创建成功时，让你获取原生的高德 Marker 实例，方便你直接调用高德的接口。

> [支持所有AMap的marker事件](https://lbs.amap.com/api/javascript-api/reference/overlay#marker)

![Alt text](https://img.alicdn.com/tfs/TB1FikGaMHqK1RjSZFkXXX.WFXa-800-595.png)


> [在线示例]演示内容:

> 1.这个例子里展示,通过设置`events`属性可以方便的给图标绑定事件。

> 2.如果你有更高级的需求，我们还定义了`created`事件。

```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Marker} from 'rax-map';
import View from 'rax-view';
import Text from 'rax-text';

class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      message:''
    }
    this.markerEvents = {
      created: (instance) => {
        this.changeText('Marker 实例创建成功；如果你需要对原生实例进行操作，可以从这里开始；');
        console.log(instance);
      },
      click: (e) => {
        this.changeText("你click了这个图标；调用参数为：");
        console.log(e);
      },
      touchend: (e) => { // 手机端才能看到效果
        this.changeText("你touchend了这个图标；调用参数为：");
        console.log(e);
      },
      dblclick: (e) => {
        this.changeText("你dblclick了这个图标；调用参数为：");
        console.log(e);
      },
      // ... 支持绑定所有原生的高德 Marker 事件
    }
  }

  changeText(txt){
      this.setState({
          message:txt
      })
  }
  
  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <Map 
        plugins={['ToolBar']} 
        center={{longitude: 120, latitude: 35}} 
      >
        <Marker
          position={{longitude: 120, latitude: 35 }} 
          clickable
          events={this.markerEvents}
        />
      </Map>
     <Text style={{fontSize:8}}>{this.state.message}</Text>
     </View>
  }
}

render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```