---
title: 基本使用
order: 1
---

本及介绍创建大量标记的基本用法

> [在线示例]演示内容:

> 1.随机创建多个简单 Marker, 只需要经纬度数组。

```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Markers} from 'rax-map';
import View from 'rax-view';
const Touchable = View;

const randomPosition = () => ({
  longitude: 100 + Math.random() * 20,
  latitude: 30 + Math.random() * 20
})
const randomMarker = (len) => (
  Array(len).fill(true).map((e, idx) => ({
    position: randomPosition()
  }))
);
class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      markers: randomMarker(100),
      center: randomPosition()
    }
    this.randomMarkers = this.randomMarkers.bind(this)
  }

  randomMarkers() {
    this.setState({
      markers: randomMarker(100)
    })
  }

  render(){   
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.state.center} zoom={6}>
          <Markers 
            markers={this.state.markers}
          />
        </Map>
      </View>
      <View style={rowStyle}>
          <Touchable style={touchStyle} onClick={this.randomMarkers.bind(this)}>
                点击:刷新多个 Markers
          </Touchable>
      </View>
    </View>
  }
}

// touch容器样式
 const touchStyle = {
      borderStyle: 'solid',
      borderColor: '#dddddd',
      borderWidth: 1,
      padding:2,
      margin:5,
      width:60,
      height:20,
      backgroundColor:'#FFF',
      justifyContent:'center',
      alignItems:'center',
      fontSize:5,
      textAlign: 'center',
      boxShadow: '5px 5px 5px #888888'
  }

  const rowStyle = {
    position:'absolute',
    flexDirection:'column',
    justifyContent:'space-between',
    right:-80,
    top:-20
  }

render(<App/>, mountNode); //实际开发中, mountNode不用传，这里是为了放入示例dom中
```
