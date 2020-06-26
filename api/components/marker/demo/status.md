---
order: 2
title: 动态更改属性
---

> [在线示例]演示内容:

> 1.这个例子里展示用 state 管理图标的状态,更改动态属性。

> 2.分别是 Marker 几种状态:是否显示,随机显示位置,是否可点击,是否可拖拽。


```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Marker} from 'rax-map';
import View from 'rax-view';
const Touchable = View;

class App extends PureComponent {
  constructor(){
    super();
    this.state = {
      visible: true,
      position: {longitude: 120, latitude: 35 },
      clickable: true,
      draggable: true,
    };
    this.mapPlugins = ['ToolBar'];
    this.markerEvents = {
      click: () => {
        alert('marker clicked!')
      }
    }
  }
  
  toggleVisible() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  
  randomPosition(){
    this.setState({
      position: { 
        longitude: 120 + Math.random() * 10 , 
        latitude: 35 + Math.random() * 10 
      }
    });
  }
  
  toggleClickable() {
    this.setState({
      clickable: !this.state.clickable,
    });
  }
  
  toggleDraggable() {
    this.setState({
      draggable: !this.state.draggable,
    });
  }
  
  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={this.mapPlugins} center={this.state.position} zoom={6}>
          <Marker
            events={this.markerEvents}
            position={this.state.position} 
            visible={this.state.visible}
            clickable={this.state.clickable}
            draggable={this.state.draggable}
          />
        </Map>
      </View>
      <View style={rowStyle}>
          <Touchable style={touchStyle} onClick={this.toggleVisible.bind(this)}>
             {`visible(显示):${this.state.visible}`}
          </Touchable>
          <Touchable style={touchStyle} onClick={this.randomPosition.bind(this)}>
             {`randomPosition(随机位置):${JSON.stringify(this.state.position)}`}
          </Touchable>
          <Touchable style={touchStyle} onClick={this.toggleClickable.bind(this)}>
             {`clickable(是否可点):${this.state.clickable}`}
          </Touchable>
          <Touchable style={touchStyle} onClick={this.toggleDraggable.bind(this)}>
            {`draggable(是否可拖拽):${this.state.draggable}`}
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

render(<App />,mountNode,{ driver: DriverUniversal }); 
```