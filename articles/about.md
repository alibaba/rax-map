---
      category: Article
      title: Rax-map 简介
      order: 1
    ---
<img src="https://img.alicdn.com/tfs/TB1hKleuiQnBKNjSZFmXXcApVXa-700-700.png" width="120" height="120" />

# Rax-map


> Rax-map 基于 rax 与高德地图，快速开发无线地图类业务需求
- 帮助你轻松的接入地图到 Rax 项目中;
- 目前提常用地图组件，能满足大部分简单的业务场景;
- 同时也提供了组件的扩展能力,自定义组件;
- 如果你有更复杂的需求，或者觉得默认提供的组件功能不够,可以参考[高德](https://lbs.amap.com/api/javascript-api/summary)api配置,提供更丰富的开发能力;

> ☆ 目前的 `Rax-map` 是基于移动端 webView 的h5方式。在发布 `rax` 项目后, 项目默认 `wh_weex=false`;

### 线上API地址(包含demo演示)

- [地址](https://alibaba.github.io/rax-map/api/components/index)

### 项目实践(阿里拍卖-地图找房)

> 建议在chrome的移动端模拟模式下查看

- [地址](https://market.m.taobao.com/app/pmMap/pages/index?wh_weex=false&spm=a2129.1122572.search.2)

### 背景
`Rax` 是什么?
- `Rax` 是一个全新的思路。它是一个通用的跨容器的渲染引擎， 如果你使用过 `React` ， 那么你就已经知道了该如何使用 `Rax` ， 因为它们的 API 是完全兼容的。`Rax` 的诞生，主要还是为阿里巴巴广泛的业务来服务的。现在，我们让它走向开源，服务更多的开发者。
- [Rax 项目地址](http://rax.alibaba-inc.com/)

`Rax-map` 的由来?
- 由于 `Rax` 截止 `Rax-map` 开发之前,还没有规范的地图组件,大多是调用用`高德地图js 版本`,`高德地图js 版本`基于选择器的开发方式,并不能无缝接入 `React` MVVM+jsx风格的开发方式。

- `Rax-map` 的出现基于两个目的:

 + 可以方便的在我们的 `Rax` 应用中接入高德地图,用;
 + 用户无需关注地图 API 和地图插件的加载过程，在简单的使用场景下，用户甚至不需要接触高德实例;
 
---

## 如何使用`Rax-map`

### 使用
下面是代码，如何创建一个基础 `map` 和一个可管理得 `marker` 集合，是不是很 `Rax`。

```js
<Map plugins={['ToolBar', 'Scale']}
  style={style}
  events={this.mapEvents}
  center={this.mapDefaultProps.center}
  zooms={[8, 19]}// 地图显示的缩放级别范围,在移动设备上，默认为[3,19],取值范围[3-19]
  <Markers
         markers={this.state.markers}
         useCluster={this.state.useCluster}
         render={this.projMarkers.render}
         events={this.projMarkers.events}
         keepLive={true} />
 </Map>
```

如果要创建一个普通的map应用，开发者不用查询高德的api,也不用关心包括map的管理，marker的管理，事件的管理等等繁琐的事情。
比如：如果要增，删，改, 查marker集合，只需要如下操作，只用给this.state.markers赋值一个新的数组.

```js
this.setState({markers: [...newMarkers]}, cb);
```


### 安装
```sh
npm install --save rax-map
```

### 基本用法

以下示例展示内容说明:
+ 1.创建一个基本地图[演示地址](https://alibaba.github.io/rax-map/api/components/map/basic);
+ 2.通过控制右边按钮,来改变map的容器尺寸、改变map的中心点、改变map的级别;
+ 3.其中的 Touchable 是 rax 相关的组件,rax 相关用法参见 [rax 开发文档](http://rax.alibaba-inc.com/guide);
+ 4.在下面的例子中需要给 Map 组件传入 `amapkey` 属性，你可以在[高德开放平台](http://lbs.amap.com/faq/account/key/67)申请你自己的Key;

```jsx
 import {createElement,PureComponent, render} from 'rax';
 import {Map} from 'rax-map';
 import View from 'rax-view';
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

### 组件

| 名称 | 说明 |
|------|------|
| [Map](/api/components/map) | 显示地图；下面的其他组件,必须作为 `Map` 的子组件使用|
| [Marker](/api/components/marker) | 在地图上显示单个坐标点 |
| [Markers](/api/components/markers) | 在地图上显示多个坐标点 |
| [Polygon](/api/components/polygon) | 在地图上显示多边形 |
| [Polyline](/api/components/polyline) |在地图上显示折线 |
| [Circle](/api/components/circle) | 在地图上显示圆形 |
| [Tip](/api/components/tip) | 在地图上显示信息窗体 |
| [DetailSwiper](/api/modules/DetailSwiper) | 在地图上显示marker滑动选择组件 |
| [CurrentLoction](/api/modules/CurrentLocation) | 在地图上显示定位当前位置组件 |

### 功能
> 更多功能组件,请[参考](https://alibaba.github.io/rax-map/api/components/index)

### 贡献指南

> 首先感谢你使用 Rax-map，Rax-map 是一个基于 Rax 封装的高德地图组件库;

> Rax-map 的成长离不开大家的支持，希望大家通过 Issues 提出宝贵意见;

### 团队
power by [阿里拍卖前端团队](http://paiui.dockerlab.alipay.net)

### 更新日志
+ 2018.12.10（版本0.0.9)
  - 去除 rax-map/api/modules/DetailSwiper 里对 rax-pictrue 的依赖，改为 View 显示字符箭头
  - 增加对rax native 渲染的提示，
 🚧 目前 'RAX-MAP' 不支持 'Weex native 渲染方式'
 🔌 只支持 'h5-webView方式'，请调整 URL 参数为 'wh_weex=false' 的降级模式。
 
 + 2018.12.19（版本0.0.11)
   - 修复一个swiper组件会提示缺少`createElemet`的bug,
### 鸣谢

> 本插件参考和借鉴库和插件，感谢以下优秀的开源资源提供灵感来源,排列不分先后。

> [【高德地图】](https://lbs.amap.com/)[【Rax】](http://rax.alibaba-inc.com/)[【ant】](https://ant.design/index-cn)[【PAIUI】](http://paiui.dockerlab.alipay.net/)[【vue-amap】](https://github.com/ElemeFE/vue-amap)[【react-map】](https://github.com/ElemeFE/react-amap)[【bisheng】](https://github.com/benjycui/bisheng)

