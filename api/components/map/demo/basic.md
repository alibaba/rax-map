---
title: 基本用法
order: 1
---

Map 的父组件必须具有宽度和高度；

Map 可以通过setState 改变所有动态属性；

> [在线示例]演示内容:

> 1.创建一个基本地图

> 2.通过控制右边按钮,来改变map的容器尺寸、改变map的中心点、改变map的级别



```jsx
 import {Map} from 'rax-map';
 import View from 'rax-view';
 import {PureComponent, render} from 'rax';
 import Touchable from 'rax-touchable'; //  导入touch 容器

 class App extends PureComponent{

   // 初始化参数
   constructor(){
       super();
       this.state = {
         mapWidth:'100%',
         mapHeight:'100%',
         center:{longitude: 115,latitude: 30},
         zoom:8
       };
     }

   // 改变map的容器尺寸
   changeMapSize(){
        this.setState({
         mapWidth:150-(Math.random()*50),
         mapHeight:250-(Math.random()*50),
       })
   }

   // 改变map的中心点
   changeCenter(){
       this.setState({
         center: {
           longitude: 115 + Math.random() * 10,
           latitude: 30 + Math.random() * 10,
         }
       });
     }

   // 改变map的级别
      changeZoom(){
          this.setState({
            zoom: (new Array(20).fill(true).map((i,index)=>index))[parseInt(Math.random()*20)]
          });
        }

   render(){
     const { mapWidth, mapHeight, center,zoom} = this.state;
     return (
     <View style={{width: '100%', height: '100%'}}>
         <View style={{width: mapWidth, height: mapHeight}}>
           <Map amapkey={'788e08def03f95c670944fe2c78fa76f'}
           center = {center}
           zoom = {zoom}
           resizeEnable = {true}
           />
         </View>
         <View style={rowStyle}>
            <Touchable style={touchStyle} onPress={this.changeMapSize.bind(this)}>
                 点我 : 改变map的容器尺寸
            </Touchable>
             <Touchable style={touchStyle} onPress={this.changeCenter.bind(this)}>
                 点我 : 改变map的中心点
             </Touchable>
             <Touchable style={touchStyle} onPress={this.changeZoom.bind(this)}>
                 点我 : 改变map的级别
             </Touchable>
         </View>
     </View>
     )
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

 render(<App />,mountNode)


```