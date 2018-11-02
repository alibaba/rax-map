<img src="https://github.com/alibaba/rax-map/10b3751062650b8fb9f16b4214dd6726.png" width="150" height="150" />

# Rax-map


> Rax-map 是一个基于 Rax 封装的高德地图组件;
- 帮助你轻松的接入地图到 Rax 项目中;
- 目前提常用地图组件，能满足大部分简单的业务场景;
- 同时也提供了组件的扩展能力,自定义组件;
- 如果你有更复杂的需求，或者觉得默认提供的组件功能不够,可以参考高德api配置,提供更丰富的开发能力;

### 线上API地址(包含demo演示)
[地址](https://github.com/alibaba/rax-map/components/index)

### 项目实践(阿里拍卖-地图找房)
- 建议在chrome的移动端模拟模式下查看
[地址](https://market.m.taobao.com/app/pmMap/pages/index?wh_weex=false&spm=a2129.1122572.search.2)

### 背景
`Rax` 是什么?
- `Rax` 是一个全新的思路。它是一个通用的跨容器的渲染引擎， 如果你使用过 React ， 那么你就已经知道了该如何使用 Rax ， 因为它们的 API 是完全兼容的。`Rax` 的诞生，主要还是为阿里巴巴广泛的业务来服务的。现在，我们让它走向开源，服务更多的开发者。
- [Rax 项目地址](http://rax.alibaba-inc.com/)

`Rax-map` 的由来?
- 由于Rax 截止 `Rax-map` 开发之前,还没有规范的地图组件,大多是调用用`高德地图js 版本`,`高德地图js 版本`基于选择器的开发方式,并不能无缝接入 `React` 风格的MVVM的开发方式。

- `Rax-map` 的出现基于两个目的:

> 可以方便的在我们的 Rax 应用中接入高德地图;

> 用户无需关注地图 API 和地图插件的加载过程，在简单的使用场景下，用户甚至不需要接触高德实例;
---
## 如何在使用`Rax-map`

### 安装
```sh
npm install --save rax-map
```

### 基本用法

以下示例展示内容说明:
> 1.创建一个基本地图

> 2.通过控制右边按钮,来改变map的容器尺寸、改变map的中心点、改变map的级别

> 3.其中的 Touchable 是 rax 相关的组件,rax 相关用法参见 [rax 开发文档](http://rax.alibaba-inc.com/guide)

> 4.在下面的例子中需要给 Map 组件传入 `amapkey` 属性，你可以在[高德开放平台](http://lbs.amap.com/faq/account/key/67)申请你自己的Key。

```jsx
 import {Map} from 'rax-map';
 import View from 'rax-view';
 import {PureComponent, render} from 'rax';
 import Touchable from 'rax-touchable'; //  导入touch 容器

 const amapkey = '...';// 这个是高德地图给开发者分配的开发者 Key

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
           <Map amapkey={amapkey}
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

 render(<App />)

```

### 贡献指南

首先感谢你使用 Rax-map，Rax-map 是一个基于 Rax 封装的高德地图组件库。

Rax-map 的成长离不开大家的支持，希望大家通过 Issues 提出宝贵意见。


