---
title: 基本用法
order: 1
---

示例演示了如何创建信息窗体和窗体的事件绑定，以及动态改变各个动态属性。

```jsx
import {createElement, PureComponent, render} from 'rax';
import DriverUniversal from "driver-universal";
import {Map,Markers,Tip} from 'rax-map';
import View from 'rax-view';
const Touchable = View;

const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: {
      longitude: 120 + (Math.random() * 1)/2,
      latitude: 30 + (Math.random() * 1)/2,
    },
  }))
);

class App extends PureComponent{
  constructor() {
    super();
    this.markers = randomMarker(4);
    this.tipVisible = true;
    this.markerEvents = {
      click: (e) => {
        console.log('eeee:',e)
        // 显示tip弹窗
        this.showTip({
          visible: true,// 是否显示tip
          value: parseInt(Math.random()*100),//是否显示tip内容字段
          position: {// 显示tip定位
            longitude: e.target.getPosition().lng,
            latitude: e.target.getPosition().lat
          },
          offset: [0, -15],// 显示tip偏移量
          size: {// 显示tip外框尺寸
            width: 120 + Math.random() * 20,
            height: 30 + Math.random() * 20,
          }
        });
      }
    };

    this.state = {
      visible: true,// 是否显示tip
      value: 1,//是否显示tip内容字段
      position:this.markers[0].position,// 显示tip定位
      offset: [0, -15],// 显示tip偏移量
      size: {// 显示tip外框尺寸
        width: 200,
        height: 50,
      },
    }

    this.tipEvents = {
      created: (iw) => {console.log(iw)},
      open: () => {console.log('InfoWindow opened')},
      close: () => {
        this.hideTip();// 隐藏,必须触发state变化
        console.log('InfoWindow closed')
      },
      change: () => {console.log('InfoWindow prop changed')},
    }
  }

  showTip(obj) {
    this.setState(obj);
  }

  hideTip() {
    this.setState({
      visible: false
    })
  }

  render(){
    const html = `<div>tip的内容,${this.state.value}</p></div>`;
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map>
          <Markers events={this.markerEvents} markers={this.markers} />
          <Tip
            position={this.state.position}
            visible={this.state.visible}
            isCustom={false}
            content={html}
            size={this.state.size}
            offset={this.state.offset}
            events={this.tipEvents}
          />
        </Map>
      </View>
    </View>
  }
}

render(<App />,mountNode,{ driver: DriverUniversal }); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```