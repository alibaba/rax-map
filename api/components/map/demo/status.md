---
title: 动态更改属性
order: 4
---

> 通过 status 属性可以统一配置其他几个布尔值属性

> 它们既可以通过 status 属性提供对象统一配置，也可以单独提供属性配置。

> 注意， status 会覆盖其他的，即，如果既配置了 `animateEnable` 属性，又配置了 status 为 `{ animateEnable }`，后者会覆盖前者的取值。

> 可以操作的属性包括以下:

| 属性 | 属性类型 | 值类型 | 默认取值 | 说明 |
|------|-----|-----|------|-----|
| animateEnable | 动态属性 | `Boolean` |`true`| 地图平移过程中是否使用动画 |
| doubleClickZoom | 动态属性 | `Boolean` |`true`| 地图是否可通过双击鼠标放大地图 |
| dragEnable | 动态属性 | `Boolean` |`true`| 地图是否可通过鼠标拖拽平移 |
| isHotspot | 动态属性 | `Boolean` |`false`| 是否开启地图热点 |
| jogEnable | 动态属性 | `Boolean` |`true`| 地图是否使用缓动效果 |
| keyboardEnable | 动态属性 | `Boolean` |`true`| 地图是否可通过键盘控制 |
| resizeEnable | 动态属性 | `Boolean` |`false`| 是否监控地图容器尺寸变化 |
| rotateEnable | 动态属性 | `Boolean` |`false`| 地图是否可旋转 |
| scrollWheel | 动态属性 | `Boolean` |`true`| 地图是否可通过鼠标滚轮缩放浏览 |
| touchZoom | 动态属性 | `Boolean` |`true`| 地图在移动终端上是否可通过多点触控缩放浏览地图 |
| zoomEnable | 动态属性 | `Boolean` |`true`| 地图是否可缩放 |

> [在线示例]演示内容:

> 1.通过控制右侧按钮,来改变map的动态属性。

```jsx
import {Map} from 'rax-map';
import View from 'rax-view';
import {PureComponent, render} from 'rax';
import Touchable from 'rax-touchable'; //  导入touch 容器

const dynamicPorps = ['animateEnable', 'doubleClickZoom', 'dragEnable', 'isHotspot', 'jogEnable', 'keyboardEnable', 'resizeEnable', 'rotateEnable', 'scrollWheel', 'touchZoom', 'zoomEnable']

let mapInstance = null; //  高德地图实力化的map对象



class App extends PureComponent{
constructor() {
 super();
 this.events = {
   created: (map) => {
     window.m = mapInstance = map;
     console.log('获取到map:',mapInstance.getStatus());
     this.setState({status:mapInstance.getStatus()}); // 初始化 this.state.status
   },
 }
 this.state = {
   status: {
     zoomEnable: false
   },
    //zoomEnable: false,  // 这个配置会被 status 中的 zoomEnable 覆盖，请不要这样同时配置两者
 };
}

// 改变 this.state.status 的某个属性
changeHandler(key){
    const prvValue = this.state.status[key];
    const nextEnable = !prvValue;
    const nextValue = Object.assign({},this.state.status);// 复制一份新的数据，以改变setState
    nextValue[key] = nextEnable;
    this.setState({ status:nextValue });
}

render(){
 return <View style={{width: '100%', height: '100%'}}>
   <View style={{width: '100%', height: '100%'}}>
     <Map
       events= {this.events}
       plugins={['ToolBar']}
       status={ this.state.status }
       //zoomEnable={this.state.zoomEnable}
     />
   </View>
   <View style={rowStyle}>
       {dynamicPorps.map((item,index)=>{
            return <Touchable key={index} style={touchStyle} onPress={this.changeHandler.bind(this,item)}>
                      {mapInstance?`${item}:${Boolean(this.state.status[item])}`:null}
                   </Touchable>
       })}
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

render(
<App/>,
mountNode
)



```