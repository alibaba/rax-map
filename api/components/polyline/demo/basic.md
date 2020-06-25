---
title: 基本用法
order: 1
---

本例演示了如何创建一个折线以及动态改变折线的属性

```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Markers,Polyline} from 'rax-map';
import View from 'rax-view';
const Touchable = View;

const randomPath = () => {
 const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
 return({
        longitude: 115 + Math.random() * 1 * plusOrMinus,
        latitude: 40 + Math.random() * 1 * plusOrMinus,
    }
 )
}
 
class App extends PureComponent{
  constructor(){
    super();
    this.mapCenter = {longitude: 115, latitude: 40};
    this.state = {
      visible: true,
      draggable: true,
      path: Array(5).fill(true).map(randomPath),
    };
    this.lineEvents = {
      created: (ins) => {console.log(ins)},
      show: () => {console.log('line show')},
      hide: () => {console.log('line hide')},
      click: () => {console.log('line clicked')},
    }
  }
  
  toggleVisible(){
    this.setState({
      visible: !this.state.visible,
    });
  }
  
  toggleDraggable(){
    this.setState({
      draggable: !this.state.draggable,
    })
  }
  
  changePath(){
    this.setState({
      path: Array(5).fill(true).map(randomPath),
    });
  }
  
  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.mapCenter} zoom={7}>
          <Polyline 
            path={ this.state.path }
            events={ this.lineEvents }
            visible={ this.state.visible }
            draggable={ this.state.draggable }
          />
        </Map>
      </View>
      <View style={rowStyle}>
          <Touchable style={touchStyle} onClick={this.toggleVisible.bind(this)}>
               点我 : 隐藏显示
          </Touchable>
           <Touchable style={touchStyle} onClick={this.toggleDraggable.bind(this)}>
               点我 : 是否支持拖拽
           </Touchable>
           <Touchable style={touchStyle} onClick={this.changePath.bind(this)}>
               点我 : 改变节点位置
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