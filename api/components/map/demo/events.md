---
title: 事件绑定
order: 2
---

可以通过`events`属性给地图绑定事件;
> [支持所有amap的map事件](https://lbs.amap.com/api/javascript-api/reference/map)

![Alt text](https://img.alicdn.com/tfs/TB1T0lOvz7nBKNjSZLeXXbxCFXa-880-881.jpg)

> [在线示例]演示内容:

> 1.同过map的events属性,绑定多种事件


```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map} from 'rax-map';
import View from 'rax-view';
import Text from 'rax-text';


class App extends PureComponent{
  constructor(props) {
      super(props);
      this.state = {
          message:''
      }
   }
  changeText(txt){
    this.setState({
        message:txt
    })
  }
  render(){
    const events = {
      complete:() => {this.changeText('地图图块加载完成后触发事件!')},
      created: (map) => {this.changeText('获取到map')},
      click: () => {this.changeText('你点击了 Map')},
      mapmove: () => {this.changeText('你平移了 Map')},
      moveend: () => {this.changeText('你结束平移了 Map')}
    }
    return <View style={{width: '100%', height: '100%'}}>
        <View style={{width: '100%', height: '100%'}}>
            <Map events={events}/>
        </View>
        <Text style={{fontSize:8}}>{this.state.message}</Text>
    </View>
  }
}
render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```
