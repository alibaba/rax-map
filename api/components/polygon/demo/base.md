---
title: 基本用法及事件绑定
order: 1
---


```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Markers,Polygon} from 'rax-map';
import View from 'rax-view';
import Touchable from 'rax-touchable'; //  导入touch 容器

const randomPath = () => ({
   longitude: 100 + Math.random() * 50,
   latitude: 10 + Math.random() * 40,
 })
class App extends PureComponent{
  constructor(){
    super();
    this.state = {
      visible: true,
      draggable: true,
      path: Array(4).fill(true).map(randomPath),
    }
    this.events = {
      click: () => {console.log('clicked')},
      created: (ins) => {console.log(ins)},
      mouseover: () => {console.log('mouseover')},
      dblclick: () => {console.log('dbl clicked')}
    };
    this.mapCenter = {longitude: 125, latitude: 20}
  }
  
  toggleDraggable(){
    this.setState({
      draggable: !this.state.draggable,
    });
  }
  
  toggleVisible(){
    this.setState({
      visible: !this.state.visible,
    });
  }
  
  randomPath(){
    this.setState({
      path: Array(4).fill(true).map(randomPath),
    });
  }
  
  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map zoom={3} center={this.mapCenter}>
          <Polygon
            events={this.events}
            path={this.state.path}
            draggable={this.state.draggable}
            visible={this.state.visible}
          />
        </Map>

        <View style={rowStyle}>
          <Touchable style={touchStyle} onPress={this.toggleVisible.bind(this)}>
               点我 : 隐藏显示
          </Touchable>
           <Touchable style={touchStyle} onPress={this.toggleDraggable.bind(this)}>
               点我 : 是否支持拖拽
           </Touchable>
           <Touchable style={touchStyle} onPress={this.randomPath.bind(this)}>
               点我 : 改变节点位置
           </Touchable>
        </View>

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
      width:50,
      height:30,
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
     right:-70
 }

render(
  <App/>, mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```
