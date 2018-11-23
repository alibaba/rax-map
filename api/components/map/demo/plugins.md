---
title: Map插件
order: 3
---

AMap中有一些[地图插件](https://lbs.amap.com/api/javascript-api/guide/abc/plugins)以插件的形式加载;

> 注意：由于是以移动应用为主,所以ToolBar插件默认开启了amap官方的liteStyle(精简模式),为true;

> 如果要继续沿用AMap关于ToolBar的配置,请关闭精简模式。

```
const plugins = [
  {
  	name: 'ToolBar',
    options: {
        liteStyle: false,
        position: 'LT'
    }
  }
]
```
> plugins 插件有以下5种,了解具体属性,请移步到高德amap [地图控件](http://lbs.amap.com/api/javascript-api/reference/map-control)

| 属性 | 是否插件 | 说明 |
|------|-----|-----|
| MapType | 是 | 地图类型切换插件，用来切换固定的几个常用图层 |
| OverView | 是 | 地图鹰眼插件，默认在地图右下角显示缩略图 |
| Scale | 是 | 地图比例尺插件 |
| ToolBar | 是 | 地图工具条插件，可以用来控制地图的缩放和平移 |
| ControlBar | 是 | 组合了旋转、倾斜、复位、缩放在内的地图控件，在3D地图模式下会显示（自V1.4.0版本新增） |
| Geolocation | 是 | 定位当前位置,包括定位图标,当前经纬度位置 |

> [在线示例]演示内容:

> 1.创建一个添加以上地图属性plugins来绑定地图插件集合。

```jsx
 import {createElement, PureComponent, render} from 'rax';
 import {Map} from 'rax-map';
 import View from 'rax-view';

class App extends PureComponent{
  render(){
    const plugins = [
      'MapType',
      'Scale',
      'OverView',
      'Geolocation',
      //{
        //name:'ControlBar', // 必须和3Dmap配合使用
        //options:{
            //position:{top:'10px',right:'200px'}
        //}
     // },
      {
        name: 'ToolBar',
        options: {
          visible: true,  // 不设置该属性默认就是 true
          onCreated(ins){
            console.log(ins);
          },
        },
      }
    ]
    return <div style={{width: '100%', height: '100%'}}>
      <Map
        // viewMode="3D" // 必须和ControlBar配合使用
        plugins={plugins}
      />
    </div>
  }
}
render(
  <App/>,
  mountNode
); // 实际开发中, mountNode不用传，这里是为了放入示例dom中;
```
