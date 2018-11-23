---
title: 渲染样式(方法一)
order: 4
---

marker的外观定义方法之一
+ 高德地图的图标 `content` 可以设置成一个 `View`，利用这个特性我们可以用 JSX 语法非常方便的定义图标的外观；
+ 用 JSX 语法非常方便的定义图标的外观,既对子节点的 `style` 的属性的设置。
+ 推荐使用 `render` 属性和 `render 方法来定义 Marker 外观，参考下一个示例。

> [在线示例]演示内容:

> 1.在 Marker 组件里不写子组件，默认就会用高德原生的图标外观。

> 2.你自己配置 `content` 属性，定制图标的外观。

> 3.点击右上角按钮或者makerB,切换外观,每次会会触发主页面的 `render`。


```jsx
import {createElement, PureComponent, render} from 'rax';
import {Map,Marker} from 'rax-map';
import View from 'rax-view';
import Touchable from 'rax-touchable'; //  导入touch 容器

class App extends PureComponent{
  constructor() {
    super()
    this.state = {
      value: 1
    }
    this.markerEvents = {
      click:(e) => {
        this.toggle();
      }
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      value: this.state.value + 1
    })
  }

  render(){

    const bg = this.state.value%2?styleA:styleB; // 切换样式

    console.log('主render执行'+this.state.value+'次',',样式:',bg);

    return <View style={{width: '100%', height: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        <Map plugins={['ToolBar']} center={{longitude: 121, latitude: 34}} zoom={6} >

          <Marker position={{longitude: 120, latitude: 35 }} />
          <Marker position={{longitude: 122, latitude: 35 }} events={this.markerEvents} >
            <View style={bg}>B{this.state.value}</View>
          </Marker>

        </Map>
      </View>
      <View style={rowStyle}>
          <Touchable style={touchStyle} onPress={this.toggle.bind(this)}>
               点我 : 改变markerB的样式和内容
          </Touchable>
      </View>
    </View>
  }
}

    const styleA = {
          backgroundColor: '#cc0000',
          color: '#fff',
          padding: '5px'
    }

    const styleB = {
      backgroundColor: '#000',
      color: '#fff',
      padding: '5px'
    }
    const styleC = {
      background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px'
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

render(
  <App/>, mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```
