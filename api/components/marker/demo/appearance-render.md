---
title: 渲染样式(方法二)
order: 5
---

marker的外观定义方法之一,使用 `render` 属性和 `render` 方法来定义 Marker 的外观。
+ render 属性：即定义为 Marker 组件的 render 属性。值是可以是一个 Rax 组件，也可以是一个方法。只在初始化的时候有效，而且会覆盖高德AMap默认的 `content`、`children` 等属性。
+ render 方法：我们在高德原生的 Marker 实例上挂载了一个 `render` 方法，可以使你随时调用从而来改变 Marker 外观。`render` 方法传入的参数跟上面 `render` 属性取值一样。


> [在线示例]演示内容:

> 1.这个例子里展示,为 Marker 提供 `render` 属性 绑定渲染样式。

> 2.例子里通过 `click` 触发样式的切换(Marker的 `render` 方法重新渲染)。

> 3.通过marker的 `render` 方法重新渲染,并不会触发主页面的 `render` ,保证最小化渲染。

> 4.`extData` 属性,绑定数据传入 `render` 的内容。

```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Marker} from 'rax-map';
import View from 'rax-view';


let flag=false; // 设置一个控制改变样式的变量

class App extends PureComponent {
  constructor(){
    super();
    this.mapCenter = {longitude: 121, latitude: 34};
    this.markerExtData = { myLabel: 'A'}
    this.markerEvents = {
      click:(e) => {
        const marker = e.target;
        flag?marker.render(this.renderMarker):marker.render(this.renderMarkerHover);
        flag = !flag;
      }
    }
  }
  
  renderMarker(extData){
    return <View style={styleA}>{extData.myLabel}</View>
  }
  
  renderMarkerHover(extData){
    return <View style={styleB}>{extData.myLabel}</View>
  }
  
  render(){
    console.log('只渲染一次');
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map 
          plugins={['ToolBar']} 
          center={this.mapCenter} 
          zoom={6}
        >
          <Marker 
            position={this.mapCenter} 
            render={this.renderMarker}
            events={this.markerEvents}
            extData={this.markerExtData}
          />
        </Map>
      </View>
    </View>
  }
}

const styleA = {
  border: '1px solid #000',
  color: '#fff',
  backgroundColor: '#000',
  padding: '6px',
}

const styleB = {
  border: '1px solid #fff',
  color: '#000',
  backgroundColor: '#fff',
  padding: '6px',
}

render(<App />,mountNode,{ driver: DriverUniversal }); 
```
