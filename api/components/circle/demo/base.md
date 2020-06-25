---
title: 基本用法
order: 1
---

这个例子演示如何创建一个圆形，并且动态改变属性；

```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Circle} from 'rax-map';
import View from 'rax-view';

const Touchable = View;

const randomIndex = (len) => (Math.floor(Math.random() * len));
const randomColor = () => {
  const chars = '0123456789abcdef'.split('');
  const len = chars.length;
  return `#${chars[randomIndex(len)]}${chars[randomIndex(len)]}` 
  + `${chars[randomIndex(len)]}${chars[randomIndex(len)]}` 
  + `${chars[randomIndex(len)]}${chars[randomIndex(len)]}`;
};

class App extends PureComponent{
  constructor(props){
    super(props);
    this.state = {
      center: {longitude: 120, latitude: 20},
      radius: 15000,
      visible: true,
      style: {strokeColor: '#f00'},
      draggable: true,
    };
    this.circleEvents = {
      created: (ins) => {console.log(window.circle = ins)},
      click: () => {console.log('clicked')},
      mouseover: () => {console.log('mouseover')},
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
  
  changeCenter(){
    this.setState({
      center: {
        longitude: 120 + Math.random() * 20,
        latitude: 20 + Math.random() * 10,
      }
    })
  }
  
  changeStyle(){
    this.setState({
      style: {strokeColor: randomColor() }
    });
  }
  
  changeRadius(){
    this.setState({
      radius: 15000 + Math.random() * 15000
    });
  }
  
  render(){
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={this.state.center}>
          <Circle 
            center={ this.state.center } 
            radius={ this.state.radius }
            events={ this.circleEvents }
            visible={ this.state.visible }
            style={ this.state.style }
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
         <Touchable style={touchStyle} onClick={this.changeCenter.bind(this)}>
             点我 : 改变中心位置
         </Touchable>
         <Touchable style={touchStyle} onClick={this.changeRadius.bind(this)}>
             点我 : 改变半径
         </Touchable>
         <Touchable style={touchStyle} onClick={this.changeStyle.bind(this)}>
             点我 : 改变样式
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
  <App/>,
  mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```