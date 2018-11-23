---
title: 地图销毁
order: 7
---
用 `render` 控制 jsx 的标签,来控制 `Map` 的渲染;

卸载 `Map` 组件时自动销毁实例，清空容器。

> [在线示例]演示内容:

> 1.通过绑定设置setState,来控制render不渲染map标签,销毁地图;

```jsx
 import {createElement, PureComponent, render} from 'rax';
 import {Map} from 'rax-map';
 import View from 'rax-view';
 import Touchable from 'rax-touchable'; //  导入touch 容器

class App extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      text: ''
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const nextDisplay = !this.state.display;
    this.setState({
      display: nextDisplay,
    });
  }

  render() {
    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        { this.state.display ? <Map/> : null }
      </View>
       <Touchable style={touchStyle} onPress={this.toggle.bind(this)}>
           {this.state.display?'销毁地图':'重建地图'}
       </Touchable>
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
      height:20,
      backgroundColor:'#FFF',
      justifyContent:'center',
      alignItems:'center',
      fontSize:5,
      textAlign: 'center',
      boxShadow: '5px 5px 5px #888888'
  }

render(
  <App/>,
  mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;


```
